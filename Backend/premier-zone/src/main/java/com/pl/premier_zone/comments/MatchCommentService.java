package com.pl.premier_zone.comments;

import com.pl.premier_zone.comments.dto.MatchCommentDto;
import com.pl.premier_zone.exception.UnauthorizedException;
import com.pl.premier_zone.match.Match;
import com.pl.premier_zone.match.MatchRepository;
import com.pl.premier_zone.security.JwtService;
import com.pl.premier_zone.user.User;
import com.pl.premier_zone.user.UserRepository;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import com.pl.premier_zone.exception.NotFoundException;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MatchCommentService {
    private final MatchCommentRepository commentRepository;
    private final MatchRepository matchRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public MatchCommentService(
            MatchCommentRepository commentRepository,
            MatchRepository matchRepository,
            UserRepository userRepository,
            JwtService jwtService) {
        this.commentRepository = commentRepository;
        this.matchRepository = matchRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public List<MatchCommentDto> getMatchComments(Long matchId) {
        return commentRepository.findByMatchIdOrderByCreatedAtDesc(matchId)
                .stream()
                .map(MatchCommentDto::new)
                .collect(Collectors.toList());
    }

    public MatchCommentDto addComment(Long matchId, String content, String token) throws ChangeSetPersister.NotFoundException {
        System.out.println("Received request - matchId: " + matchId + ", content: " + content); // Add this

        String username = jwtService.validateTokenAndGetUsername(token.substring(7));
        System.out.println("Username from token: " + username); // Add this

        if (username == null) {
            throw new UnauthorizedException("Invalid token");
        }

        User user = userRepository.findByUsername(username);
        System.out.println("Found user: " + user); // Add this

        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new NotFoundException("Match not found"));
        System.out.println("Found match: " + match); // Add this

        MatchComment comment = new MatchComment();
        comment.setContent(content);
        comment.setMatch(match);
        comment.setUser(user);

        MatchComment savedComment = commentRepository.save(comment);
        System.out.println("Saved comment: " + savedComment); // Add this

        return new MatchCommentDto(savedComment);
    }
}
