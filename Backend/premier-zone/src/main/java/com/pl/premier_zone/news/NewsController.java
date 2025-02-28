package com.pl.premier_zone.news;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.cache.annotation.Cacheable;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsController {

    @Value("${newsapi.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/news")
    @Cacheable("footballNews")
    public ResponseEntity<?> getFootballNews() {
        String url = "https://newsapi.org/v2/everything?" +
                "q=(premier+league+OR+EPL)+AND+(transfer+OR+injury+OR+news)" +
                "&language=en" +
                "&sortBy=publishedAt" +
                "&apiKey=" + apiKey;

        try {
            return ResponseEntity.ok(
                    restTemplate.getForObject(url, Object.class)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error fetching news: " + e.getMessage());
        }
    }
}
