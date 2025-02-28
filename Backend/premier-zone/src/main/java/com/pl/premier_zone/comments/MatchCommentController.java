package com.pl.premier_zone.comments;

import com.pl.premier_zone.comments.dto.MatchCommentDto;
import com.pl.premier_zone.exception.NotFoundException;
import com.pl.premier_zone.exception.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v4/matches/{matchId}/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchCommentController {
    private final MatchCommentService commentService;

    public MatchCommentController(MatchCommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<List<MatchCommentDto>> getComments(@PathVariable Long matchId) {
        return ResponseEntity.ok(commentService.getMatchComments(matchId));
    }

    @PostMapping
    public ResponseEntity<?> addComment(  // Changed return type to handle errors
                                          @PathVariable Long matchId,
                                          @RequestBody Map<String, String> payload,
                                          @RequestHeader("Authorization") String token) {
        try {
            String content = payload.get("content");
            if (content == null || content.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Content cannot be empty");
            }

            MatchCommentDto comment = commentService.addComment(matchId, content, token);
            return ResponseEntity.ok(comment);
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // Add this for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding comment: " + e.getMessage());
        }
    }
}

