package com.pl.premier_zone.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PlayerService {
    private final PlayerRespository playerRespository;

    @Autowired
    public PlayerService(PlayerRespository playerRespository){
        this.playerRespository = playerRespository;
    }
    public List<Player> getPlayers() {
        return playerRespository.findAll();
    }
    public List<Player> getPlayersFromTeam(String teamName) {
        return playerRespository.findAll().stream()
                .filter(player -> teamName.equals(player.getTeam_name()))
                .collect(Collectors.toList());
    }
    public List<Player> getPlayersByName(String searchText) {
        return playerRespository.findAll().stream()
                .filter(player -> player.getName().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }
    public List<Player> getPlayersByPos(String searchText) {
        return playerRespository.findAll().stream()
                .filter(player -> player.getPosition().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByNation(String searchText) {
        return playerRespository.findAll().stream()
                .filter(player -> player.getNation().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByTeamAndPosition(String team, String position){
        return playerRespository.findAll().stream()
                .filter(player -> team.equals(player.getTeam_name()) && position.equals(player.getPosition()))
                .collect(Collectors.toList());
    }
    public Player addPlayer(Player player) {
        playerRespository.save(player);
        return player;
    }
    public Player updatePlayer(Player updatedPlayer) {
        Optional<Player> existingPlayer = playerRespository.findByName(updatedPlayer.getName());

        if (existingPlayer.isPresent()) {
            Player playerToUpdate = existingPlayer.get();
            playerToUpdate.setName(updatedPlayer.getName());
            playerToUpdate.setTeam_name(updatedPlayer.getTeam_name());
            playerToUpdate.setPosition(updatedPlayer.getPosition());
            playerToUpdate.setNation(updatedPlayer.getNation());
            playerRespository.save(playerToUpdate);
            return playerToUpdate;
        }
        return null;
    }
    @Transactional
    public void deletePlayer(String playerName) {
        playerRespository.deleteByName(playerName);
    }
}
