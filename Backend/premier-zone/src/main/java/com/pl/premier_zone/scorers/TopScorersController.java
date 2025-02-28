package com.pl.premier_zone.scorers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.cache.annotation.Cacheable;

@RestController
@RequestMapping("/api/v4")
@CrossOrigin(origins = "http://localhost:3000")
public class TopScorersController {

    @Value("${football-data.api-key}")
    private String apiKey;

    private final String PREMIER_LEAGUE_ID = "PL";
    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/scorers")
    @Cacheable("scorers")
    public ResponseEntity<?> getTopScorers() {
        String url = "http://api.football-data.org/v4/competitions/" + PREMIER_LEAGUE_ID + "/scorers";

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

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error fetching top scorers: " + e.getMessage());
        }
    }
}
