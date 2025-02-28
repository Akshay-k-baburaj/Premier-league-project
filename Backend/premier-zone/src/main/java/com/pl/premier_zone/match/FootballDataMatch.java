package com.pl.premier_zone.match;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.ZonedDateTime;
import java.util.List;

public class FootballDataMatch {
    private Long id;
    private Team homeTeam;
    private Team awayTeam;
    private Score score;
    @JsonProperty("utcDate")
    private ZonedDateTime utcDate;
    private String status;

    private List<Referee> referees;
    private Integer matchday;

    // Getters and setters

    public Integer getMatchday() {
        return matchday;
    }

    public void setMatchday(Integer matchday) {
        this.matchday = matchday;
    }


    public List<Referee> getReferees() {
        return referees;
    }

    public void setReferees(List<Referee> referees) {
        this.referees = referees;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Team getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(Team homeTeam) {
        this.homeTeam = homeTeam;
    }

    public Team getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(Team awayTeam) {
        this.awayTeam = awayTeam;
    }

    public Score getScore() {
        return score;
    }

    public void setScore(Score score) {
        this.score = score;
    }

    public ZonedDateTime getUtcDate() {
        return utcDate;
    }

    public void setUtcDate(ZonedDateTime utcDate) {
        this.utcDate = utcDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Inner classes

    public static class Referee {
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getNationality() {
            return nationality;
        }

        public void setNationality(String nationality) {
            this.nationality = nationality;
        }

        private Long id;
        private String name;
        private String type;
        private String nationality;

        // Add getters and setters
    }
    public static class Team {
        private String name;
        @JsonProperty("crest")
        private String crest;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getCrest() {
            return crest;
        }

        public void setCrest(String crest) {
            this.crest = crest;
        }
    }

    public static class Score {
        @JsonProperty("fullTime")
        private FullTime fullTime;

        @JsonProperty("halfTime")
        private FullTime halfTime;

        private String winner;

        public FullTime getFullTime() {
            return fullTime;
        }

        public void setFullTime(FullTime fullTime) {
            this.fullTime = fullTime;
        }

        public FullTime getHalfTime() {
            return halfTime;
        }

        public void setHalfTime(FullTime halfTime) {
            this.halfTime = halfTime;
        }

        public String getWinner() {
            return winner;
        }

        public void setWinner(String winner) {
            this.winner = winner;
        }


        public static class FullTime {
            private Integer home;
            private Integer away;

            public Integer getHome() {
                return home;
            }

            public void setHome(Integer home) {
                this.home = home;
            }

            public Integer getAway() {
                return away;
            }

            public void setAway(Integer away) {
                this.away = away;
            }
        }
    }
}