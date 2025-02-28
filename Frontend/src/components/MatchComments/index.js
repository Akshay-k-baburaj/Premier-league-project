import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { MessageSquare, Send, X, ChevronDown } from 'lucide-react';
import "./index.scss";

const CommentForm = ({ onSubmit, isLoading }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onSubmit(commentText);
    setCommentText('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="input-container">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !commentText.trim()}
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </div>
    </form>
  );
};

const MatchComments = ({ matchId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleCommentSubmit = async (commentText) => {
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/v4/matches/${matchId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: commentText })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post comment');
      }
      
      const comment = await response.json();
      setComments(prevComments => [comment, ...prevComments]);
    } catch (error) {
      console.error('Error posting comment:', error);
      setError(error.message);
      
      if (error.message.includes('unauthorized')) {
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v4/matches/${matchId}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [matchId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);


  const CommentsList = ({ limit = undefined }) => (
    <div className="comments-list">
      {comments.slice(0, limit).map((comment, index) => (
        <div 
          key={`${comment.username}-${comment.createdAt}-${index}`} 
          className="comment-item"
        >
          <div className="comment-header">
            <span className="username">{comment.username}</span>
            <span className="timestamp">
              {format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a')}
            </span>
          </div>
          <p className="comment-content">{comment.content}</p>
        </div>
      ))}
    </div>
  );

  const AuthPrompt = () => (
    <div className="auth-prompt">
      <p>Join the discussion by logging in or creating an account</p>
      <div className="auth-buttons">
        <a href="/login" className="login-btn">Login</a>
        <a href="/register" className="register-btn">Register</a>
      </div>
    </div>
  );

  return (
    <div className="match-comments-section">
      <div className="comments-header" onClick={() => setShowAllComments(true)}>
        <MessageSquare className="w-6 h-6" />
        <h4>Match Discussion ({comments.length})</h4>
      </div>

      {isAuthenticated ? (
        <CommentForm onSubmit={handleCommentSubmit} isLoading={isLoading} />
      ) : (
        <AuthPrompt />
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <CommentsList limit={5} />
      
      {comments.length > 5 && (
        <div className="view-all-comments-container">
          <button
            className="view-all-comments"
            onClick={() => setShowAllComments(!showAllComments)} // Toggle the popup
          >
            View All Comments ({comments.length})
            <ChevronDown className="w-4 h-4" />
          </button>
    
          {showAllComments && (
            <div className="comments-overlay active">
              <div className="comments-popup active">
                <div className="comments-popup-header">
                  <h3>Match Discussion</h3>
                  <button className="close-btn" onClick={() => setShowAllComments(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="comments-popup-content">
                  {isAuthenticated ? (
                    <CommentForm onSubmit={handleCommentSubmit} isLoading={isLoading} />
                  ) : (
                    <AuthPrompt />
                  )}
                  {error && (
                    <div className="error-message">
                      {error}
                    </div>
                  )}
                  <CommentsList />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
        </div>
)}

export default MatchComments;