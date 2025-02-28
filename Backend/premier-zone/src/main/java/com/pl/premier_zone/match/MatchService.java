package com.pl.premier_zone.match;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MatchService {
    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String baseUrl = "http://api.football-data.org/v4";
    private SeasonInfo currentSeason;
    private final MatchRepository matchRepository;

    public MatchService(
            RestTemplate restTemplate,
            MatchRepository matchRepository,
            @Value("${football-data.api-key}") String apiKey) {
        this.restTemplate = restTemplate;
        this.matchRepository = matchRepository;
        this.apiKey = apiKey;
    }

    public Integer getCurrentMatchday() {
        return currentSeason != null ? currentSeason.getCurrentMatchday() : null;
    }

    @Cacheable(value = "matches", key = "'all'")
    public Map<String, List<Match>> getAllMatches() {
        List<Match> allMatches = fetchMatchesFromApi();

        System.out.println("Current Server Date: " + LocalDate.now());
        System.out.println("Total Matches: " + allMatches.size());

        Map<String, List<Match>> categorizedMatches = new HashMap<>();
        categorizedMatches.put("today", new ArrayList<>());
        categorizedMatches.put("yesterday", new ArrayList<>());
        categorizedMatches.put("upcoming", new ArrayList<>());

        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        for (Match match : allMatches) {
            if (match.getMatchDate() == null) continue;

            LocalDate matchDate = match.getMatchDate().toLocalDate();

            // Expanded categorization logic
            if (matchDate.isBefore(today) || matchDate.isEqual(yesterday)) {
                categorizedMatches.get("yesterday").add(match);
            } else if (matchDate.isEqual(today)) {
                categorizedMatches.get("today").add(match);
            } else {
                categorizedMatches.get("upcoming").add(match);
            }
        }

        // Sorting remains the same
        categorizedMatches.get("yesterday").sort((m1, m2) ->
                m2.getMatchDate().compareTo(m1.getMatchDate()));
        categorizedMatches.get("today").sort(Comparator.comparing(Match::getMatchDate));
        categorizedMatches.get("upcoming").sort(Comparator.comparing(Match::getMatchDate));

        // Debug print
        System.out.println("Matches - Today: " + categorizedMatches.get("today").size() +
                ", Yesterday: " + categorizedMatches.get("yesterday").size() +
                ", Upcoming: " + categorizedMatches.get("upcoming").size());

        return categorizedMatches;
    }

    private List<Match> fetchMatchesFromApi() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Auth-Token", apiKey);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        String url = baseUrl + "/competitions/PL/matches?season=2024";
        String seasonUrl = baseUrl + "/competitions/PL";

        try {
            // Fetch season information
            ResponseEntity<Map> seasonResponse = restTemplate.exchange(
                    seasonUrl,
                    HttpMethod.GET,
                    entity,
                    Map.class
            );
            if (seasonResponse.getBody() != null) {
                Map<String, Object> seasonData = seasonResponse.getBody();
                currentSeason = new SeasonInfo();
                currentSeason.setId((Integer) seasonData.get("id"));
                currentSeason.setCurrentMatchday((Integer) seasonData.get("currentMatchday"));
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
          // Declare outside try block
        try {
            ResponseEntity<FootballDataResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    FootballDataResponse.class
            );

            if (response.getBody() != null && response.getBody().getMatches() != null) {
                return convertToMatchEntities(response.getBody().getMatches());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    public List<Match> getMatchesByDate(LocalDate specificDate) {
        return fetchMatchesFromApi().stream()
                .filter(match -> match.getMatchDate() != null &&
                        match.getMatchDate().toLocalDate().equals(specificDate))
                .sorted(Comparator.comparing(Match::getMatchDate))
                .collect(Collectors.toList());
    }

    public Optional<Match> findById(Long id) {
        return fetchMatchesFromApi().stream()
                .filter(match -> match.getId().equals(id))
                .findFirst();
    }

    private static class SeasonInfo {
        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        private Integer id;
        private LocalDate startDate;
        private LocalDate endDate;
        private Integer currentMatchday;

        public LocalDate getStartDate() {
            return startDate;
        }

        public void setStartDate(LocalDate startDate) {
            this.startDate = startDate;
        }

        public Integer getCurrentMatchday() {
            return currentMatchday;
        }

        public void setCurrentMatchday(Integer currentMatchday) {
            this.currentMatchday = currentMatchday;
        }


        public LocalDate getEndDate() {
            return endDate;
        }

        public void setEndDate(LocalDate endDate) {
            this.endDate = endDate;
        }

    }

    private List<Match> convertToMatchEntities(List<FootballDataMatch> apiMatches) {
        return apiMatches.stream().map(apiMatch -> {
            Match match = new Match();
            match.setId(apiMatch.getId());
            match.setHomeTeam(apiMatch.getHomeTeam().getName());
            match.setAwayTeam(apiMatch.getAwayTeam().getName());

            Match.Score score = new Match.Score();
            FootballDataMatch.Score apiScore = apiMatch.getScore();

            if (apiScore.getFullTime() != null) {
                score.setHomeFullTime(apiScore.getFullTime().getHome());
                score.setAwayFullTime(apiScore.getFullTime().getAway());
            }

            if (apiScore.getHalfTime() != null) {
                score.setHomeHalfTime(apiScore.getHalfTime().getHome());
                score.setAwayHalfTime(apiScore.getHalfTime().getAway());
            }

            score.setWinner(apiScore.getWinner());
            match.setScore(score);

            if (apiMatch.getReferees() != null) {
                match.setReferees(apiMatch.getReferees().stream()
                        .map(ref -> {
                            Match.MatchReferee referee = new Match.MatchReferee();
                            referee.setName(ref.getName());
                            return referee;
                        })
                        .collect(Collectors.toList()));
            }

            FootballDataMatch.Score.FullTime fullTime = apiMatch.getScore().getFullTime();
            match.setHomeScore(fullTime != null ? fullTime.getHome() : null);
            match.setAwayScore(fullTime != null ? fullTime.getAway() : null);

            match.setHomeCrest(apiMatch.getHomeTeam().getCrest());
            match.setAwayCrest(apiMatch.getAwayTeam().getCrest());

            // Convert UTC to IST
            ZonedDateTime utcDateTime = apiMatch.getUtcDate();
            LocalDateTime istTime = utcDateTime.withZoneSameInstant(ZoneId.of("Asia/Kolkata")).toLocalDateTime();

            match.setMatchDate(istTime);
            match.setStatus(apiMatch.getStatus());
            match.setMatchday(apiMatch.getMatchday());
            return match;
        }).collect(Collectors.toList());
    }
}