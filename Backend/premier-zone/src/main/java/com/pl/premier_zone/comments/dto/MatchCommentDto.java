package com.pl.premier_zone.comments.dto;

import com.pl.premier_zone.comments.MatchComment;
import java.time.LocalDateTime;

public class MatchCommentDto {
    private String content;
    private String username;
    private LocalDateTime createdAt;

    // Constructor
    public MatchCommentDto(MatchComment comment) {
        this.content = comment.getContent();
        this.username = comment.getUser().getUsername();
        this.createdAt = comment.getCreatedAt();
    }

    // Getters
    public String getContent() {
        return content;
    }

    public String getUsername() {
        return username;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
