package com.pl.premier_zone.match;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByMatchDateBetweenOrderByMatchDateAsc(LocalDateTime start, LocalDateTime end);
    List<Match> findByMatchDateGreaterThanOrderByMatchDateAsc(LocalDateTime date);
    List<Match> findByMatchDateLessThanOrderByMatchDateDesc(LocalDateTime date);
}