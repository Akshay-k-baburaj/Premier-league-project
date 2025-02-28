import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Teams from './components/Teams';
import TeamData from './components/TeamData';
import Nation from "./components/Nation";
import Position from "./components/Position";
import Search from "./components/Search";
import MatchesComponent from './components/Matches';
import NewsComponent from './components/News';
import StandingsComponent from './components/Standings';
import TopScorersComponent from './components/TopScorers';
import HeadToHeadComponent from './components/HeadToHead';
import RecordsPage from './components/RecordsPage';
import DashboardComponent from './components/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  useEffect(() => {
    document.title = 'PremierZone Fantasy';
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="data" element={<TeamData />} />
          <Route path="nation" element={<Nation />} />
          <Route path="position" element={<Position />} />
          <Route path="search" element={<Search />} />
          <Route path="matches" element={<MatchesComponent />} />
          <Route path="/news" element={<NewsComponent />} />
          <Route path="/standings" element={<StandingsComponent />} />
          <Route path="/scorers" element={<TopScorersComponent />} />
          <Route path="/comparison" element={<HeadToHeadComponent />} />
          <Route path="/records" element={<RecordsPage />} />
          <Route path="/dashboard" element={<DashboardComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;