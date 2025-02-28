package com.pl.premier_zone.comparison;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.cache.annotation.Cacheable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@RestController
@RequestMapping("/api/v4")
@CrossOrigin(origins = "http://localhost:3000") // Add this if your React app runs on port 3000
public class HeadToHeadController {
    private static final Logger logger = LoggerFactory.getLogger(HeadToHeadController.class);

    @Value("${football-data.api-key}")
    private String apiKey;

    private final String PREMIER_LEAGUE_ID = "PL";
    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/teams")
    @Cacheable("teams")
    public ResponseEntity<?> getTeams() {
        String url = "http://api.football-data.org/v4/competitions/" + PREMIER_LEAGUE_ID + "/teams";
        logger.info("Fetching teams from: {}", url);

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Auth-Token", apiKey);

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    org.springframework.http.HttpMethod.GET,
                    entity,
                    Object.class
            );

            logger.info("Successfully fetched teams");
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            logger.error("Error fetching teams: ", e);
            return ResponseEntity.internalServerError()
                    .body("Error fetching teams: " + e.getMessage());
        }
    }

    @GetMapping("/comparison/{team1Id}/{team2Id}")
    @Cacheable("comparison")
    public ResponseEntity<?> getComparison(
            @PathVariable String team1Id,
            @PathVariable String team2Id
    ) {
        logger.info("Fetching comparison for teams: {} and {}", team1Id, team2Id);

        String url = String.format(
                "http://api.football-data.org/v4/teams/%s/matches?limit=10&status=FINISHED",
                team1Id
        );

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Auth-Token", apiKey);

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            logger.info("Fetching team 1 matches from: {}", url);
            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    org.springframework.http.HttpMethod.GET,
                    entity,
                    Object.class
            );

            String url2 = String.format(
                    "http://api.football-data.org/v4/teams/%s/matches?limit=10&status=FINISHED",
                    team2Id
            );

            logger.info("Fetching team 2 matches from: {}", url2);
            ResponseEntity<Object> response2 = restTemplate.exchange(
                    url2,
                    org.springframework.http.HttpMethod.GET,
                    entity,
                    Object.class
            );

            Map<String, Object> result = Map.of(
                    "team1Matches", response.getBody(),
                    "team2Matches", response2.getBody()
            );

            logger.info("Successfully fetched comparison data");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("Error fetching comparison data: ", e);
            return ResponseEntity.internalServerError()
                    .body("Error fetching comparison data: " + e.getMessage());
        }
    }
}
