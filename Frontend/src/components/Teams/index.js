import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import { Link } from 'react-router-dom';
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";
import teamData from "../../data/teams.json";

const Teams = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 3000);
        return () => clearTimeout(timer);
    });

    useEffect(() => {
        const filtered = teamData.teams.filter(team =>
            team.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTeams(filtered);
    }, [searchQuery]);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const renderTeam = (teams) => {
        return (
            <div className="images-container">
                {teams.map((team, idx) => (
                    <div key={idx} className="image-box">
                        <img 
                            src={team.cover} 
                            alt={team.title} 
                            className="teams-image"
                        />
                        <div className="content">
                            <p className="title">{team.title}</p>
                            <Link 
                                className="btn" 
                                to={`/data?team=${encodeURIComponent(team.title)}`}
                            >
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="nation-page">
                <h1 className="page-title">
                    <AnimatedLetters 
                        letterClass={letterClass}
                        strArray={"Teams".split("")}
                        idx={15} 
                    />
                </h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for teams"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="nations-container">
                    <div className="nations-header">
                        <h3>Football Teams</h3>
                    </div>
                    <div className="nations-content">
                        {renderTeam(filteredTeams)}
                    </div>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    );
};

export default Teams;