package com.pl.premier_zone.widgets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/football")
@CrossOrigin(origins = "http://localhost:3000")
public class FootballApiController {

    @Value("${api.football.key}")
    private String apiKey;

    private String baseUrl =  "https://v3.football.api-sports.io";

    private final RestTemplate restTemplate = new RestTemplate();

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-key", apiKey);
        headers.set("x-rapidapi-host", "v3.football.api-sports.io");
        return headers;
    }

    @GetMapping("/matches")
    public ResponseEntity<String> getMatches() {
        HttpEntity<String> entity = new HttpEntity<>(createHeaders());
        return restTemplate.exchange(
                baseUrl + "/fixtures?league=39&season=2024",
                HttpMethod.GET,
                entity,
                String.class
        );
    }

        @GetMapping("/champions")
        public ResponseEntity<String> getChampions() {
            HttpEntity<String> entity = new HttpEntity<>(createHeaders());
            return restTemplate.exchange(
                    baseUrl + "/leagues/seasons?id=39",
                    HttpMethod.GET,
                    entity,
                    String.class
            );
        }


    }

