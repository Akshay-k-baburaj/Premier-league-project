import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import "./index.scss";


const HeadToHeadComponent = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam1, setSelectedTeam1] = useState('');
    const [selectedTeam2, setSelectedTeam2] = useState('');
    const [comparison, setComparison] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v4/teams');
                if (!response.ok) throw new Error('Failed to fetch teams');
                const data = await response.json();
                if (data?.teams && Array.isArray(data.teams)) {
                    setTeams(data.teams);
                } else {
                    throw new Error('Invalid teams data format');
                }
            } catch (error) {
                setError('Error loading teams: ' + error.message);
                console.error('Error fetching teams:', error);
            }
        };
        fetchTeams();
    }, []);

    const handleCompare = async () => {
        if (!selectedTeam1 || !selectedTeam2) {
            setError('Please select both teams');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `http://localhost:8080/api/v4/comparison/${selectedTeam1}/${selectedTeam2}`
            );
            if (!response.ok) throw new Error('Failed to fetch comparison data');
            const data = await response.json();
            setComparison(data);
        } catch (error) {
            setError('Error loading comparison: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortMatches = (matches) => {
        if (!matches?.matches) return [];
        
        return matches.matches
            .filter(match => new Date(match.utcDate) <= new Date())
            .sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate))
            .slice(0, 5);
    };

    const renderMatchResult = (match) => {
        if (!match) return null;
        
        const homeTeam = match.homeTeam?.name || 'Unknown';
        const awayTeam = match.awayTeam?.name || 'Unknown';
        const homeScore = match.score?.fullTime?.home ?? '-';
        const awayScore = match.score?.fullTime?.away ?? '-';
        const matchDate = new Date(match.utcDate).toLocaleDateString();
        const competition = match.competition?.name || '';
        
        return (
            <div className="match-result">
                <span className="match-date">{matchDate}</span>
                {competition && <span className="match-competition">{competition}</span>}
                <span className="match-teams">{homeTeam} vs {awayTeam}</span>
                <span className="match-score">{homeScore} - {awayScore}</span>
            </div>
        );
    };

    const getTeamDetails = (teamId) => {
        const team = teams.find(t => t.id === parseInt(teamId));
        return {
            name: team?.name || 'Unknown Team',
            crest: team?.crest || '/api/placeholder/32/32'
        };
    };

    return (
        <div className="head-to-head-page">
            <Card className="comparison-card">
                <CardHeader className="comparison-header">
                    <CardTitle>Head-to-Head Comparison</CardTitle>
                </CardHeader>
                <CardContent className="comparison-content">
                    <div className="team-selectors">
                        <div className="select-wrapper">
                            <select
                                value={selectedTeam1}
                                onChange={(e) => setSelectedTeam1(e.target.value)}
                                disabled={loading}
                            >
                                <option value="">Select First Team</option>
                                {teams.map(team => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="select-wrapper">
                            <select
                                value={selectedTeam2}
                                onChange={(e) => setSelectedTeam2(e.target.value)}
                                disabled={loading}
                            >
                                <option value="">Select Second Team</option>
                                {teams.map(team => (
                                    <option key={team.id} value={team.id} disabled={team.id === parseInt(selectedTeam1)}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="compare-button-wrapper">
                        <button
                            onClick={handleCompare}
                            disabled={!selectedTeam1 || !selectedTeam2 || loading}
                            className={loading ? 'loading' : ''}
                        >
                            {loading ? 'Loading...' : 'Compare'}
                        </button>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {comparison && (
                        <div className="comparison-results">
                            <h3>Recent Matches</h3>
                            <div className="teams-comparison">
                                <div className="team-column">
                                    <h4>
                                        <img 
                                            src={getTeamDetails(selectedTeam1).crest}
                                            alt={`${getTeamDetails(selectedTeam1).name} crest`}
                                            className="team-crest"
                                            onError={(e) => {
                                                e.target.src = '/api/placeholder/32/32';
                                            }}
                                        />
                                        {getTeamDetails(selectedTeam1).name}
                                    </h4>
                                    {filterAndSortMatches(comparison.team1Matches).map((match, index) => (
                                        <div key={index}>
                                            {renderMatchResult(match)}
                                        </div>
                                    ))}
                                    {filterAndSortMatches(comparison.team1Matches).length === 0 && (
                                        <div className="no-matches">No recent matches available</div>
                                    )}
                                </div>
                                <div className="team-column">
                                    <h4>
                                        <img 
                                            src={getTeamDetails(selectedTeam2).crest}
                                            alt={`${getTeamDetails(selectedTeam2).name} crest`}
                                            className="team-crest"
                                            onError={(e) => {
                                                e.target.src = '/api/placeholder/32/32';
                                            }}
                                        />
                                        {getTeamDetails(selectedTeam2).name}
                                    </h4>
                                    {filterAndSortMatches(comparison.team2Matches).map((match, index) => (
                                        <div key={index}>
                                            {renderMatchResult(match)}
                                        </div>
                                    ))}
                                    {filterAndSortMatches(comparison.team2Matches).length === 0 && (
                                        <div className="no-matches">No recent matches available</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default HeadToHeadComponent;