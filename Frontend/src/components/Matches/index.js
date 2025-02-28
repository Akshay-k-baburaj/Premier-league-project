import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, Clock, X} from 'lucide-react';
import "./index.scss";
import { format , parseISO} from 'date-fns';
import { TbBrandDisney } from "react-icons/tb";
import { SiPremierleague } from "react-icons/si";
import MatchComments from '../MatchComments';



const MatchSection = ({ matches, title, type }) => {
  if (matches.length === 0) return null;

  return (
    <div className={`match-section ${type}`} id={`${type}-section`}>
      <h3 className="section-title">{title}</h3>
      {matches.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};

const MatchDetails = ({ match, onClose }) => {
  const handleRequestLogin = () => {
    window.location.href = '/login';
  };

  if (!match) return null;

  return (
    <div className="record-details-overlay active">
      <div className="record-details-card active">
        <div className="record-details-header">
          <h3>Match Details</h3>
          <button className="close-btn" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="record-details-content match-details-content">
          <div className="match-details-top">
            <div className="match-teams flex justify-between items-center">
              <div className="team text-center">
                <img src={match.homeCrest} alt={match.homeTeam} className="w-24 h-24 mx-auto mb-4" />
                <div className="team-name font-semibold text-xl">{match.homeTeam}</div>
              </div>
              
              <div className="score-display text-3xl font-bold">
                {match.status === 'FINISHED' ? (
                  <>
                    {match.homeScore} - {match.awayScore}
                  </>
                ) : (
                  format(parseISO(match.matchDate), 'h:mm a')
                )}
              </div>
              
              <div className="team text-center">
                <img src={match.awayCrest} alt={match.awayTeam} className="w-24 h-24 mx-auto mb-4" />
                <div className="team-name font-semibold text-xl">{match.awayTeam}</div>
              </div>
            </div>
          </div>

          <div className="match-details-section">
            <div className="details-group">
              <div className="details-item">
                <CalendarIcon className="details-icon" />
                <span>{format(parseISO(match.matchDate), 'PPP')}</span>
              </div>
              <div className="details-item">
                <Clock className="details-icon" />
                <span>{format(parseISO(match.matchDate), 'h:mm a')}</span>
              </div> 
            </div>
          </div>

        
          {match.score && (
  <div className="match-details-section">
    <h4>Score Details</h4>
    <div className="details-group">
      <div className="details-item">
        <span>Half Time:</span>
        <span>{match.score.homeHalfTime} - {match.score.awayHalfTime}</span>
      </div>
      <div className="details-item">
        <span>Full Time:</span>
        <span>{match.score.homeFullTime} - {match.score.awayFullTime}</span>
      </div>
      {match.score.winner && (
        <div className="details-item winner">
          <span>Winner:</span>
          <span>{match.score.winner === 'HOME_TEAM' ? match.homeTeam : match.awayTeam}</span>
        </div>
      )}
    </div>
  </div>
)}

        {match.referees && match.referees.length > 0 && (
          <div className="match-details-section">
              <h4>Match Officials</h4>
          <div className="details-group">
          <div className="details-item">
            <span>Referee:</span>
            <span>{match.referees[0].name}</span>
          </div>
          </div>
          </div>
)}
          <div className="match-details-section">
            <h4>Watch</h4>
          <div className="streaming-links">
              <a 
                href="https://www.hotstar.com/in/sports/football/tournaments/premier-league"
                target="_blank"
                rel="noopener noreferrer"
                className="streaming-link"
              >
                <TbBrandDisney />
                Watch on Hotstar (India)
              </a>
              <a 
                href="https://www.premierleague.com/broadcast-schedules"
                target="_blank"
                rel="noopener noreferrer"
                className="streaming-link"
              >
                <SiPremierleague />
                Global Broadcast Schedule
              </a>
            </div>
          </div>
          <MatchComments 
      matchId={match.id}
      onRequestLogin={handleRequestLogin}
    />
        </div>
      </div>
    </div>
  );
};

const MatchCard = ({ match }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusClass = () => {
    switch(match.status) {
      case 'FINISHED': return 'past';
      case 'SCHEDULED': return 'upcoming';
      default: return 'live';
    }
  };

  return (
    <>
      <div 
        className={`match-card ${getStatusClass()} cursor-pointer hover:bg-gray-50`}
        onClick={() => setShowDetails(true)}
      >
        <div className="match-info">
          <span className="match-date">
            {format(parseISO(match.matchDate), 'dd MMM yyyy')}
          </span>
          {match.status === 'FINISHED' && 
            <span className="match-status">Full Time</span>
          }
        </div>
        <div className="match-content">
          <div className="team-container">
            <div className="team">
              <img src={match.homeCrest} alt={match.homeTeam} className="team-crest" />
              <span className="team-name">{match.homeTeam}</span>
            </div>
            <div className="score-display">
              {match.status === 'FINISHED' ? (
                <>
                  <span className="score">{match.homeScore}</span>
                  <span className="score-separator">-</span>
                  <span className="score">{match.awayScore}</span>
                </>
              ) : (
                <span className="match-time">
                  {format(parseISO(match.matchDate), 'h:mm a')}
                </span>
              )}
            </div>
            <div className="team">
              <img src={match.awayCrest} alt={match.awayTeam} className="team-crest" />
              <span className="team-name">{match.awayTeam}</span>
            </div>
          </div>
        </div>
      </div>
      {showDetails && (
        <MatchDetails match={match} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
};

const MatchesComponent = () => {
  const [matches, setMatches] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v4/matches');
        const data = await response.json();
        
        const allMatches = [
          ...data.yesterday, 
          ...data.today, 
          ...data.upcoming
        ].sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));

        setMatches(allMatches);

        // Modified scroll logic
        setTimeout(() => {
          const todaySection = document.getElementById('today-section');
          const upcomingSection = document.getElementById('upcoming-section');
          
          if (todaySection && data.today.length > 0) {
            todaySection.scrollIntoView({ behavior: 'smooth' });
          } else if (upcomingSection && data.upcoming.length > 0) {
            upcomingSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } catch (error) {
        console.error('Error fetching matches', error);
      }
    };

    fetchMatches();
  }, []);

  const organizeMatches = () => {
    const today = new Date();
    return {
      past: matches.filter(m => new Date(m.matchDate) < today && m.status === 'FINISHED'),
      today: matches.filter(m => {
        const matchDate = new Date(m.matchDate);
        return matchDate.toDateString() === today.toDateString();
      }),
      upcoming: matches.filter(m => new Date(m.matchDate) > today)
    };
  };

  const { past, today, upcoming} = organizeMatches();

  return (
    <div className="matches-scroll-container">
  

      <div ref={scrollRef} className="matches-scroll-view">
        <MatchSection matches={past} title="Past Matches" type="past" />
        <MatchSection matches={today} title="Today's Matches" type="today" />
        <MatchSection matches={upcoming} title="Upcoming Matches" type="upcoming" />
      </div>
    </div>
  );
};

export default MatchesComponent;