package com.pl.premier_zone.match;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "matches")
public class Match {
    @Id
    private Long id;
    @Column(name = "home_crest")
        private String homeCrest;
    @Column(name = "away_crest")
        private String awayCrest;
    @Column(name = "home_team", nullable = false)
        private String homeTeam;
    @Column(name = "away_team", nullable = false)
        private String awayTeam;
    @Column(name = "home_score")
        private Integer homeScore;
    @Column(name = "away_score")
        private Integer awayScore;
    @Column(name = "match_date", nullable = false)
        private LocalDateTime matchDate;
    @Column(nullable = false)
        private String status;
    @Embedded
        private Score score;
    @ElementCollection
    @CollectionTable(name = "match_referees", joinColumns = @JoinColumn(name = "match_id"))
        private List<MatchReferee> referees;
        private Integer matchday;

        @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Default constructor
    public Match() {}

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }


    public Integer getMatchday() {
        return matchday;
    }

    public void setMatchday(Integer matchday) {
        this.matchday = matchday;
    }

    public List<MatchReferee> getReferees() {
        return referees;
    }
    public void setReferees(List<MatchReferee> referees) {
        this.referees = referees;
    }

    public String getHomeCrest() {
        return homeCrest;
    }

    public void setHomeCrest(String homeCrest) {
        this.homeCrest = homeCrest;
    }

    public String getAwayCrest() {
        return awayCrest;
    }

    public void setAwayCrest(String awayCrest) {
        this.awayCrest = awayCrest;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(String homeTeam) {
        this.homeTeam = homeTeam;
    }

    public String getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(String awayTeam) {
        this.awayTeam = awayTeam;
    }

    public Integer getHomeScore() {
        return homeScore;
    }

    public void setHomeScore(Integer homeScore) {
        this.homeScore = homeScore;
    }

    public Integer getAwayScore() {
        return awayScore;
    }

    public void setAwayScore(Integer awayScore) {
        this.awayScore = awayScore;
    }

    public LocalDateTime getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(LocalDateTime matchDate) {
        this.matchDate = matchDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Score getScore() {
        return score;
    }

    public void setScore(Score score) {
        this.score = score;
    }

    @Embeddable
    public static class MatchReferee {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class Score {
        private Integer homeHalfTime;
        private Integer awayHalfTime;
        private Integer homeFullTime;
        private Integer awayFullTime;
        private String winner;

        public Integer getHomeHalfTime() {
            return homeHalfTime;
        }

        public void setHomeHalfTime(Integer homeHalfTime) {
            this.homeHalfTime = homeHalfTime;
        }

        public Integer getAwayHalfTime() {
            return awayHalfTime;
        }

        public void setAwayHalfTime(Integer awayHalfTime) {
            this.awayHalfTime = awayHalfTime;
        }

        public Integer getHomeFullTime() {
            return homeFullTime;
        }

        public void setHomeFullTime(Integer homeFullTime) {
            this.homeFullTime = homeFullTime;
        }

        public Integer getAwayFullTime() {
            return awayFullTime;
        }

        public void setAwayFullTime(Integer awayFullTime) {
            this.awayFullTime = awayFullTime;
        }

        public String getWinner() {
            return winner;
        }

        public void setWinner(String winner) {
            this.winner = winner;
        }
    }
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

