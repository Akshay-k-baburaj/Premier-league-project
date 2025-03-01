package com.pl.premier_zone.player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name = "player_statistic")
public class Player {
    @Id
    @Column(name = "player_name", unique = true)
    private String name;
    private String nation;
    private String position;
    private Integer age;
    private Integer matches_played;
    private Integer starts;
    private Double minutes_played;
    private Double goals;
    private Double assists;
    private Double penalties_scored;
    private Double yellow_cards;
    private Double red_cards;
    private Double expected_goals;
    private Double expected_assists;
    private String team_name;

    public Player(String name) {
        this.name = name;
    }

    public Player(String name, String nation, String position, Integer age, Integer matches_played, Integer starts, Double minutes_played, Double goals, Double assists, Double penalties_scored, Double yellow_cards, Double red_cards, Double expected_goals, Double expected_assists, String team_name) {
        this.name = name;
        this.nation = nation;
        this.position = position;
        this.age = age;
        this.matches_played = matches_played;
        this.starts = starts;
        this.minutes_played = minutes_played;
        this.goals = goals;
        this.assists = assists;
        this.penalties_scored = penalties_scored;
        this.yellow_cards = yellow_cards;
        this.red_cards = red_cards;
        this.expected_goals = expected_goals;
        this.expected_assists = expected_assists;
        this.team_name = team_name;
    }
    public Player() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNation() {
        return nation != null ? nation : "unknown";
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getPosition() {
        return position != null ? position : "unknown";
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Serializable getAge() {
        return age != null ? age : "unknown";
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Serializable getMatches_played() {
        return matches_played != null ? matches_played : "unknown";
    }

    public void setMatches_played(Integer matches_played) {
        this.matches_played = matches_played;
    }

    public Serializable getStarts() {
        return starts != null ? starts : "unknown";
    }

    public void setStarts(Integer starts) {
        this.starts = starts;
    }

    public Serializable getMinutes_played() {
        return minutes_played != null ? minutes_played : "unknown";
    }

    public void setMinutes_played(Double minutes_played) {
        this.minutes_played = minutes_played;
    }

    public Serializable getGoals() {
        return goals!= null ? goals : "unknown";
    }

    public void setGoals(Double goals) {
        this.goals = goals;
    }

    public Serializable getAssists() {
        return assists!= null ? assists : "unknown";
    }

    public void setAssists(Double assists) {
        this.assists = assists;
    }

    public Serializable getPenalties_scored() {
        return penalties_scored != null ? penalties_scored : "unknown";
    }

    public void setPenalties_scored(Double penalties_scored) {
        this.penalties_scored = penalties_scored;
    }

    public Serializable getYellow_cards() {
        return yellow_cards != null ? yellow_cards : "unknown";
    }

    public void setYellow_cards(Double yellow_cards) {
        this.yellow_cards = yellow_cards;
    }

    public Serializable getRed_cards() {
        return red_cards != null ? red_cards : "unknown";
    }

    public void setRed_cards(Double red_cards) {
        this.red_cards = red_cards;
    }

    public Serializable expected_goals() {
        return expected_goals != null ? expected_goals : "unknown";
    }

    public void setExpected_goals(Double expected_goals) {
        this.expected_goals = expected_goals;
    }

    public Double getExpected_assists() {
        return expected_assists;
    }

    public void setExpected_assists(Double expected_assists) {
        this.expected_assists = expected_assists;
    }

    public String getTeam_name() {
        return team_name;
    }

    public void setTeam_name(String team_name) {
        this.team_name = team_name;
    }
}
