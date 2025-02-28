package com.pl.premier_zone.comments;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MatchCommentRepository extends JpaRepository<MatchComment, Long> {
    List<MatchComment> findByMatchIdOrderByCreatedAtDesc(Long matchId);
}
