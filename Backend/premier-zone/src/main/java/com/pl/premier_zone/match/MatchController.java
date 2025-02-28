package com.pl.premier_zone.match;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/v4/matches")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchController {
    private final Logger logger = LoggerFactory.getLogger(MatchController.class);
    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping
    public ResponseEntity<Map<String, List<Match>>> getMatches() {
        try {
            Map<String, List<Match>> matches = matchService.getAllMatches();
            return ResponseEntity.ok(matches);
        } catch (Exception e) {
            logger.error("Error fetching matches: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/date")
    public ResponseEntity<List<Match>> getMatchesByDate(@RequestParam("date") String dateString) {
        try {
            LocalDate specificDate = LocalDate.parse(dateString);
            List<Match> matches = matchService.getMatchesByDate(specificDate);
            return ResponseEntity.ok(matches);
        } catch (Exception e) {
            logger.error("Error fetching matches for date: {}", dateString, e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<Map<String, Object>> getMatchDetails(@PathVariable Long id) {
        try {
            Optional<Match> match = matchService.findById(id);
            if (match.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            Map<String, Object> details = new HashMap<>();
            details.put("match", match.get());
            details.put("streaming", getStreamingInfo(match.get()));
            return ResponseEntity.ok(details);
        } catch (Exception e) {
            logger.error("Error fetching match details for id: {}", id, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    private Map<String, String> getStreamingInfo(Match match) {
        Map<String, String> streamingInfo = new HashMap<>();
        streamingInfo.put("global", "https://www.premierleague.com/broadcast-schedules");
        streamingInfo.put("india", "https://www.hotstar.com/in/sports/football/tournaments/premier-league/" + match.getHomeTeam() + match.getAwayTeam());
        streamingInfo.put("matchUrl", "https://www.hotstar.com/sports/football/match/" + match.getHomeTeam() + match.getAwayTeam());
        return streamingInfo;
    }
    @GetMapping("/current-matchday")
    public ResponseEntity<Integer> getCurrentMatchday() {
        try {
            Integer matchday = matchService.getCurrentMatchday();
            return ResponseEntity.ok(matchday);
        } catch (Exception e) {
            logger.error("Error fetching current matchday", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/today")
    public ResponseEntity<List<Match>> getTodayMatches() {
        try {
            Map<String, List<Match>> matches = matchService.getAllMatches();
            return ResponseEntity.ok(matches.get("today"));
        } catch (Exception e) {
            logger.error("Error fetching today's matches: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping("/upcoming")
    public ResponseEntity<List<Match>> getUpcomingMatches() {
        try {
            Map<String, List<Match>> matches = matchService.getAllMatches();
            return ResponseEntity.ok(matches.get("upcoming"));
        } catch (Exception e) {
            logger.error("Error fetching upcoming matches: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping("/yesterday")
    public ResponseEntity<List<Match>> getYesterdayMatches() {
        try {
            Map<String, List<Match>> matches = matchService.getAllMatches();
            return ResponseEntity.ok(matches.get("yesterday"));
        } catch (Exception e) {
            logger.error("Error fetching yesterday's matches: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}