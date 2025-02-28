import './index.scss'
import { Link, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faTshirt, faBars, faClose, faUsers, faFlag, faFootball, } from '@fortawesome/free-solid-svg-icons'
import { RiDashboardHorizontalFill } from "react-icons/ri";
import LogoPL from '../../assets/images/PL.webp';
import LogoSubtitle from '../../assets/images/sub-logo.png';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons'
import UserWelcome from '../auth/UserWelcome';

const Sidebar = () => {
    const [showNav, setShowNav] = useState(false);

    return (
        <>
            {/* Hamburger Icon */}
            <FontAwesomeIcon 
                onClick={() => setShowNav(true)} 
                icon={faBars} 
                color="#ffd700" 
                size="3x" 
                className="hamburger-icon" 
            />

            {/* Drawer */}
            <div className={`drawer ${showNav ? 'show-drawer' : ''}`}>
                <div className="drawer-content">
                    {/* Logo Section */}
                    <Link className="logo" to="/">
                        <img src={LogoPL} alt="logo" />
                        <img className="sub-logo" src={LogoSubtitle} alt="PremierZone" />
                    </Link>

                    <UserWelcome />

                    {/* Close Icon */}
                    <FontAwesomeIcon 
                        icon={faClose} 
                        size="3x" 
                        className="close-icon"
                        onClick={() => setShowNav(false)} 
                    />

                    {/* Navigation Links */}
                    <nav>
                        <NavLink 
                            exact="true" 
                            activeclassname="active" 
                            to="/"
                            onClick={() => setShowNav(false)}
                        >
                            <FontAwesomeIcon icon={faHome} />
                            <span>HOME</span>
                        </NavLink>

                        <NavLink 
                            exact="true" 
                            activeclassname="active" 
                            className="teams-link" 
                            to="/dashboard"
                            onClick={() => setShowNav(false)}
                        >
                            <RiDashboardHorizontalFill />
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink 
                            exact="true" 
                            activeclassname="active" 
                            className="teams-link" 
                            to="/teams"
                            onClick={() => setShowNav(false)}
                        >
                            <FontAwesomeIcon icon={faUsers} />
                            <span>TEAMS</span>
                        </NavLink>

                        <NavLink 
                            exact="true" 
                            activeclassname="active" 
                            className="nation-link" 
                            to="/nation"
                            onClick={() => setShowNav(false)}
                        >
                            <FontAwesomeIcon icon={faFlag} />
                            <span>NATION</span>
                        </NavLink>

                        <NavLink 
                            exact="true" 
                            activeclassname="active" 
                            className="position-link" 
                            to="/position"
                            onClick={() => setShowNav(false)}
                        >
                            <FontAwesomeIcon icon={faTshirt} />
                            <span>POSITION</span>
                        </NavLink>
                        <NavLink 
                            exact="true" 
                            activeclassname="active" 
                            className="matches-link" 
                            to="/matches"
                            onClick={() => setShowNav(false)}
                        >
                            <FontAwesomeIcon icon={faFootball} />
                            <span>MATCHES</span>
                        </NavLink>
                        
                        <NavLink 
                            exact="true" 
                            activeclassname="active" 
                            className="news-link" 
                            to="/news"
                            onClick={() => setShowNav(false)}
                        >       
                            <FontAwesomeIcon icon={faNewspaper} />
                            <span>NEWS</span>
                        </NavLink>
                        
                        <NavLink 
                            exact="true" 
                            activeclassname="active" 
                            className="standings-link" 
                            to="/standings"
                            onClick={() => setShowNav(false)}
                        >
                            <FontAwesomeIcon icon={faTrophy} />
                            <span>STANDINGS</span>
                        </NavLink>

                        <NavLink 
                            exact="true" 
                            activeclassname="active" 
                            className="scorers-link" 
                            to="/scorers"
                            onClick={() => setShowNav(false)}
                        >
                            <FontAwesomeIcon icon={faFutbol} />
                            <span>TOP SCORERS</span>
                        </NavLink>
                        <NavLink 
                            exact="true" 
                            activeclassname="active" 
                            className="comparison-link" 
                            to="/comparison"
                            onClick={() => setShowNav(false)}
                        >
                            <FontAwesomeIcon icon={faBalanceScale} />
                            <span>HEAD TO HEAD</span>
                        </NavLink>

                        <NavLink 
                            exact="true" 
                            activeclassname="active" 
                            className="records-link" 
                            to="/records"
                            onClick={() => setShowNav(false)}
                        >
                            <FontAwesomeIcon icon={faTrophy} />
                            <span>RECORDS</span>
                        </NavLink>
                        
                        <NavLink 
                            exact="true" 
                            activeclassname="active" 
                            className="search-link" 
                            to="/search"
                            onClick={() => setShowNav(false)}
                        >
                            <FontAwesomeIcon icon={faSearch} />
                            <span>SEARCH</span>
                        </NavLink>
                    </nav>
                </div>
            </div>

            {/* Overlay */}
            {showNav && (
                <div 
                    className="drawer-overlay"
                    onClick={() => setShowNav(false)}
                />
            )}
        </>
    )
}

export default Sidebar