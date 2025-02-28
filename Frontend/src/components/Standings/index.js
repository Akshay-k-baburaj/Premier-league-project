import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import "./index.scss";

const StandingsComponent = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v4/standings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStandings(data.standings[0].table || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching standings:', error);
        setError('Failed to fetch standings data');
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return (
      <div className="standings-page">
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-lg text-gray-600">Loading standings...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="standings-page">
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="standings-page">
      <Card className="standings-card">
        <CardHeader className="standings-header">
          <CardTitle>Premier League Standings</CardTitle>
        </CardHeader>
        <CardContent className="standings-content">
          <div className="standings-table-container">
            <table className="standings-table">
            <thead>
                <tr>
                    <th className="pos-header" data-tooltip="Position">Pos</th>
                    <th className="team-header" data-tooltip="Team">Team</th>
                    <th data-tooltip="Matches Played">MP</th>
                    <th data-tooltip="Wins">W</th>
                    <th data-tooltip="Draws">D</th>
                    <th data-tooltip="Losses">L</th>
                    <th data-tooltip="Goals For">GF</th>
                    <th data-tooltip="Goals Against">GA</th>
                    <th data-tooltip="Goal Difference">GD</th>
                    <th data-tooltip="Points">Pts</th>
                </tr>
            </thead>
              <tbody>
                {standings.map((team) => (
                  <tr key={team.team.id} className="team-row">
                    <td className="position">
                      <span className={`position-indicator pos-${getPositionClass(team.position)}`}>
                        {team.position}
                      </span>
                    </td>
                    <td className="team-name">
                      <div className="team-info">
                        <img 
                          src={team.team.crest} 
                          alt={team.team.shortName} 
                          className="team-crest"
                        />
                        <span>{team.team.shortName}</span>
                      </div>
                    </td>
                    <td>{team.playedGames}</td>
                    <td>{team.won}</td>
                    <td>{team.draw}</td>
                    <td>{team.lost}</td>
                    <td>{team.goalsFor}</td>
                    <td>{team.goalsAgainst}</td>
                    <td className={team.goalDifference >= 0 ? 'positive' : 'negative'}>
                      {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                    </td>
                    <td className="points">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const getPositionClass = (position) => {
  if (position <= 4) return 'champions';
  if (position === 5) return 'europa';
  if (position >= 18) return 'relegation';
  return 'regular';
};

export default StandingsComponent;