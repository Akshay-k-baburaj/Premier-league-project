import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Newspaper, User, Users, Award, History, Star } from 'lucide-react';
import axios from 'axios';
import { Card, CardHeader, CardContent } from '../ui/card';
import { format, parseISO } from 'date-fns';
import "./index.scss";

const derbyMatches = [
  // London derbies
  { teams: ['Arsenal', 'Tottenham Hotspur'], name: 'North London Derby' },
  { teams: ['Arsenal', 'Chelsea'], name: 'London Derby' },
  { teams: ['Chelsea', 'Tottenham Hotspur'], name: 'London Derby' },
  { teams: ['West Ham United', 'Tottenham Hotspur'], name: 'London Derby' },
  { teams: ['West Ham United', 'Arsenal'], name: 'London Derby' },
  { teams: ['West Ham United', 'Chelsea'], name: 'London Derby' },
  { teams: ['Crystal Palace', 'West Ham United'], name: 'London Derby' },
  { teams: ['Crystal Palace', 'Arsenal'], name: 'London Derby' },
  { teams: ['Crystal Palace', 'Chelsea'], name: 'London Derby' },
  { teams: ['Crystal Palace', 'Tottenham Hotspur'], name: 'London Derby' },
  { teams: ['Brentford', 'Chelsea'], name: 'West London Derby' },
  { teams: ['Brentford', 'Fulham'], name: 'West London Derby' },
  
  // Manchester derbies
  { teams: ['Manchester United', 'Manchester City'], name: 'Manchester Derby' },
  
  // Merseyside derbies
  { teams: ['Liverpool', 'Everton'], name: 'Merseyside Derby' },
  
  // North West derbies
  { teams: ['Manchester United', 'Liverpool'], name: 'North West Derby' },
  { teams: ['Manchester City', 'Liverpool'], name: 'North West Derby' },
  { teams: ['Manchester United', 'Everton'], name: 'North West Derby' },
  { teams: ['Manchester City', 'Everton'], name: 'North West Derby' },
  
  // Midlands derbies
  { teams: ['Aston Villa', 'Birmingham City'], name: 'Second City Derby' },
  { teams: ['Aston Villa', 'Wolverhampton Wanderers'], name: 'West Midlands Derby' },
  { teams: ['Wolverhampton Wanderers', 'West Bromwich Albion'], name: 'Black Country Derby' },
  { teams: ['Leicester City', 'Nottingham Forest'], name: 'East Midlands Derby' },
  
  // South Coast derbies
  { teams: ['Southampton', 'Portsmouth'], name: 'South Coast Derby' },
  { teams: ['Southampton', 'Bournemouth'], name: 'South Coast Derby' },
  { teams: ['Brighton & Hove Albion', 'Southampton'], name: 'South Coast Derby' },
  { teams: ['Brighton & Hove Albion', 'Bournemouth'], name: 'South Coast Derby' },
  
  // Yorkshire derbies
  { teams: ['Leeds United', 'Sheffield United'], name: 'Yorkshire Derby' },
];

// Function to identify if a match is a derby
const isDerbyMatch = (homeTeam, awayTeam) => {
  return derbyMatches.find(derby => 
    (derby.teams.includes(homeTeam) && derby.teams.includes(awayTeam))
  );
};

const DashboardComponent = () => {
  const [matches, setMatches] = useState({ today: [], upcoming: [] });
  const [standings, setStandings] = useState(null);
  const [scorers, setScorers] = useState(null);
  const [news, setNews] = useState([]);
  const [champions, setChampions] = useState([]);
  const [derbies, setDerbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch matches data
        const matchesRes = await axios.get('http://localhost:8080/api/v4/matches');
        setMatches(matchesRes.data);
        
        // Filter upcoming matches to find derbies
        if (matchesRes.data.upcoming && matchesRes.data.upcoming.length > 0) {
          const upcomingDerbies = matchesRes.data.upcoming
            .filter(match => isDerbyMatch(match.homeTeam, match.awayTeam))
            .map(match => {
              const derby = isDerbyMatch(match.homeTeam, match.awayTeam);
              return {
                ...match,
                derbyName: derby ? derby.name : 'Derby Match'
              };
            })
            .slice(0, 5);
          
          setDerbies(upcomingDerbies);
        }
        
        // Fetch standings data
        const standingsRes = await axios.get('http://localhost:8080/api/v4/standings');
        setStandings(standingsRes.data);
        
        // Fetch top scorers data
        const scorersRes = await axios.get('http://localhost:8080/api/v4/scorers');
        setScorers(scorersRes.data);
        
        // Fetch champions data
        try {
          const championsRes = await axios.get('http://localhost:8080/api/football/champions');
          // This assumes the API returns data in a format that can be parsed for champions
          // You might need to adjust based on the actual response format
          const championsData = JSON.parse(championsRes.data);
          const recentChampions = championsData.response
            .slice(-5)
            .map(season => ({
              season: season.season,
              winner: season.league.champion
            }))
            .reverse();
          setChampions(recentChampions);
        } catch (champErr) {
          console.warn('Champions data could not be fetched:', champErr);
          setChampions([
            { season: "2023/2024", winner: "Manchester City" },
            { season: "2022/2023", winner: "Manchester City" },
            { season: "2021/2022", winner: "Manchester City" },
            { season: "2020/2021", winner: "Manchester City" },
            { season: "2019/2020", winner: "Liverpool" }
          ]);
        }
        
        // Fetch news data
        try {
          const newsRes = await axios.get('http://localhost:8080/api/v1/news');
          setNews(newsRes.data.articles || []);
        } catch (newsErr) {
          console.warn('News data could not be fetched:', newsErr);
          setNews([
            { title: "Premier League news not available", publishedAt: new Date().toISOString() },
            { title: "Check back later for updates", publishedAt: new Date().toISOString() }
          ]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Premier League Dashboard</h1>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="dashboard-grid">
        {/* Today's Matches Card */}
        <Card className="dashboard-card matches-card">
          <CardHeader className="card-header">
            <div className="card-title">
              <Calendar className="icon" />
              <span>Today's Matches</span>
            </div>
          </CardHeader>
          <CardContent className="card-content">
            {loading ? (
              <div className="loading-spinner"></div>
            ) : matches.today && matches.today.length > 0 ? (
              <div className="matches-list">
                {matches.today.slice(0, 5).map(match => (
                  <div key={match.id} className="match-item">
                    <div className="match-teams">
                      <div className="team">
                        <div className="team-logo-container">
                          <img src={match.homeCrest} alt={match.homeTeam} className="team-logo" />
                        </div>
                        <span className="team-name">{match.homeTeam}</span>
                      </div>
                      <div className="match-score">
                        {match.status === 'FINISHED' ? `${match.homeScore} - ${match.awayScore}` : 'vs'}
                      </div>
                      <div className="team">
                        <div className="team-logo-container">
                          <img src={match.awayCrest} alt={match.awayTeam} className="team-logo" />
                        </div>
                        <span className="team-name">{match.awayTeam}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Link to="/matches" className="view-all-link">
                  View all matches <span>→</span>
                </Link>
              </div>
            ) : (
              <div className="no-data">
                No matches scheduled for today
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Matches Card */}
        <Card className="dashboard-card matches-card">
          <CardHeader className="card-header">
            <div className="card-title">
              <Calendar className="icon" />
              <span>Upcoming Matches</span>
            </div>
          </CardHeader>
          <CardContent className="card-content">
            {loading ? (
              <div className="loading-spinner"></div>
            ) : matches.upcoming && matches.upcoming.length > 0 ? (
              <div className="matches-list">
                {matches.upcoming.slice(0, 5).map(match => (
                  <div key={match.id} className="match-item">
                    <div className="match-teams">
                      <div className="team">
                        <div className="team-logo-container">
                          <img src={match.homeCrest} alt={match.homeTeam} className="team-logo" />
                        </div>
                        <span className="team-name">{match.homeTeam}</span>
                      </div>
                      <div className="match-time">
                        {format(parseISO(match.matchDate), 'h:mm a')}
                      </div>
                      <div className="team">
                        <div className="team-logo-container">
                          <img src={match.awayCrest} alt={match.awayTeam} className="team-logo" />
                        </div>
                        <span className="team-name">{match.awayTeam}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Link to="/matches" className="view-all-link">
                  View all upcoming matches <span>→</span>
                </Link>
              </div>
            ) : (
              <div className="no-data">
                No upcoming matches scheduled
              </div>
            )}
          </CardContent>
        </Card>

        {/* Standings Card */}
        <Card className="dashboard-card standings-card">
          <CardHeader className="card-header">
            <div className="card-title">
              <Trophy className="icon" />
              <span>Current Standings</span>
            </div>
          </CardHeader>
          <CardContent className="card-content">
            {loading ? (
              <div className="loading-spinner"></div>
            ) : standings && standings.standings && standings.standings.length > 0 ? (
              <div className="standings-table">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Team</th>
                      <th>Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.standings[0].table.slice(0, 5).map(team => (
                      <tr key={team.team.id}>
                        <td>{team.position}</td>
                        <td>
                          <div className="team-info">
                            <div className="team-logo-container">
                              <img src={team.team.crest} alt={team.team.name} className="team-logo" />
                            </div>
                            <span className="team-name">{team.team.name}</span>
                          </div>
                        </td>
                        <td>{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link to="/standings" className="view-all-link">
                  View full table <span>→</span>
                </Link>
              </div>
            ) : (
              <div className="no-data">
                Standings data not available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Champions Card */}
        <Card className="dashboard-card champions-card">
          <CardHeader className="card-header">
            <div className="card-title">
              <History className="icon" />
              <span>Recent Champions</span>
            </div>
          </CardHeader>
          <CardContent className="card-content">
            {loading ? (
              <div className="loading-spinner"></div>
            ) : champions && champions.length > 0 ? (
              <div className="champions-list">
                {champions.map((champ, idx) => (
                  <div key={idx} className="champion-item">
                    <div className="season-info">
                      <span className="season">{champ.season}</span>
                      <div className="trophy-icon">
                        <Trophy size={16} className="trophy" />
                      </div>
                    </div>
                    <div className="champion-name">{champ.winner}</div>
                  </div>
                ))}
                <Link to="/history" className="view-all-link">
                  View full history <span>→</span>
                </Link>
              </div>
            ) : (
              <div className="no-data">
                Champions data not available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Scorers Card */}
        <Card className="dashboard-card scorers-card">
          <CardHeader className="card-header">
            <div className="card-title">
              <User className="icon" />
              <span>Top Scorers</span>
            </div>
          </CardHeader>
          <CardContent className="card-content">
            {loading ? (
              <div className="loading-spinner"></div>
            ) : scorers && scorers.scorers && scorers.scorers.length > 0 ? (
              <div className="scorers-list">
                {scorers.scorers.slice(0, 5).map((scorer, idx) => (
                  <div key={scorer.player.id} className="scorer-item">
                    <div className="scorer-info">
                      <span className="rank">{idx + 1}</span>
                      <div className="scorer-details">
                        <div className="name">{scorer.player.name}</div>
                        <div className="team">{scorer.team.name}</div>
                      </div>
                    </div>
                    <div className="goals">{scorer.goals} goals</div>
                  </div>
                ))}
                <Link to="/scorers" className="view-all-link">
                  View all scorers <span>→</span>
                </Link>
              </div>
            ) : (
              <div className="no-data">
                Top scorers data not available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Derbies Card */}
        <Card className="dashboard-card derbies-card">
          <CardHeader className="card-header">
            <div className="card-title">
              <Star className="icon" />
              <span>Upcoming Derbies</span>
            </div>
          </CardHeader>
          <CardContent className="card-content">
            {loading ? (
              <div className="loading-spinner"></div>
            ) : derbies && derbies.length > 0 ? (
              <div className="derbies-list">
                {derbies.map(match => (
                  <div key={match.id} className="derby-item">
                    <div className="derby-info">
                      <span className="derby-name">{match.derbyName}</span>
                      <span className="derby-date">{format(parseISO(match.matchDate), 'PPP')}</span>
                    </div>
                    <div className="match-teams">
                      <div className="team">
                        <div className="team-logo-container">
                          <img src={match.homeCrest} alt={match.homeTeam} className="team-logo" />
                        </div>
                        <span className="team-name">{match.homeTeam}</span>
                      </div>
                      <div className="vs">vs</div>
                      <div className="team">
                        <div className="team-logo-container">
                          <img src={match.awayCrest} alt={match.awayTeam} className="team-logo" />
                        </div>
                        <span className="team-name">{match.awayTeam}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Link to="/derbies" className="view-all-link">
                  View all derbies <span>→</span>
                </Link>
              </div>
            ) : (
              <div className="no-data">
                No upcoming derby matches
              </div>
            )}
          </CardContent>
        </Card>

        {/* News Card */}
        <Card className="dashboard-card news-card">
          <CardHeader className="card-header">
            <div className="card-title">
              <Newspaper className="icon" />
              <span>Latest News</span>
            </div>
          </CardHeader>
          <CardContent className="card-content">
            {loading ? (
              <div className="loading-spinner"></div>
            ) : news && news.length > 0 ? (
              <div className="news-list">
                {news.slice(0, 3).map((article, idx) => (
                  <div key={idx} className="news-item">
                    <div className="news-title">{article.title}</div>
                    <div className="news-date">
                      {format(parseISO(article.publishedAt), 'PPP')}
                    </div>
                  </div>
                ))}
                <Link to="/news" className="view-all-link">
                  View all news <span>→</span>
                </Link>
              </div>
            ) : (
              <div className="no-data">
                No news available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links Card */}
        <Card className="dashboard-card quick-links-card">
          <CardHeader className="card-header">
            <div className="card-title">
              <Award className="icon" />
              <span>Quick Links</span>
            </div>
          </CardHeader>
          <CardContent className="card-content">
            <div className="links-list">
              <Link to="/comparison" className="link-item">
                <Users className="link-icon" />
                <div className="link-text">
                  <h3>Head to Head Comparison</h3>
                  <p>Compare teams with head-to-head statistics</p>
                </div>
              </Link>
              <Link to="/records" className="link-item">
                <Award className="link-icon" />
                <div className="link-text">
                  <h3>Premier League Records</h3>
                  <p>View the history and records of Premier League</p>
                </div>
              </Link>
              <Link to="/matches" className="link-item">
                <Calendar className="link-icon" />
                <div className="link-text">
                  <h3>Match Schedule</h3>
                  <p>View all upcoming and past matches</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardComponent;