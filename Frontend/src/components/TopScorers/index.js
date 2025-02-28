import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import "./index.scss";

const TopScorersComponent = () => {
  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScorers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v4/scorers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScorers(data.scorers || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching scorers:', error);
        setError('Failed to fetch top scorers data');
        setLoading(false);
      }
    };

    fetchScorers();
  }, []);

  if (loading) {
    return (
      <div className="scorers-page">
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-lg text-gray-600">Loading top scorers...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="scorers-page">
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="scorers-page">
      <Card className="scorers-card">
        <CardHeader className="scorers-header">
          <CardTitle>Premier League Top Scorers</CardTitle>
        </CardHeader>
        <CardContent className="scorers-content">
          <div className="scorers-table-container">
            <table className="scorers-table">
              <thead>
                <tr>
                  <th className="pos-header" data-tooltip="Position">Pos</th>
                  <th className="player-header" data-tooltip="Player">Player</th>
                  <th className="team-header" data-tooltip="Team">Team</th>
                  <th data-tooltip="Goals">Goals</th>
                  <th data-tooltip="Assists">Assists</th>
                  <th data-tooltip="Penalties">Penalties</th>
                  <th data-tooltip="Matches Played">MP</th>
                </tr>
              </thead>
              <tbody>
                {scorers.map((scorer, index) => (
                  <tr key={scorer.player.id} className="scorer-row">
                    <td className="position">
                      <span className={`position-indicator ${index < 3 ? 'pos-top' : 'pos-regular'}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="player-name">
                      <div className="player-info">
                        <span>{scorer.player.name}</span>
                      </div>
                    </td>
                    <td className="team-name">
                      <div className="team-info">
                        <img 
                          src={scorer.team.crest} 
                          alt={scorer.team.shortName} 
                          className="team-crest"
                        />
                        <span>{scorer.team.shortName}</span>
                      </div>
                    </td>
                    <td className="goals">{scorer.goals}</td>
                    <td>{scorer.assists || 0}</td>
                    <td>{scorer.penalties || 0}</td>
                    <td>{scorer.playedMatches}</td>
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

export default TopScorersComponent;