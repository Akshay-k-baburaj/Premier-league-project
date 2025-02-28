import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import { Link } from 'react-router-dom';
import LogoPL from '../../assets/images/PL.webp';
import AnimatedLetters from '../AnimatedLetters';
import ScrollSection from '../ScrollSection';

import './index.scss';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [username, setUsername] = useState(null);

    const nameArray = "Welcome to".split("");
    const jobArray = "Premier Zone Fantasy!".split("");

    const backgroundImages = [
        '/premierpic/one.jpg',
        '/premierpic/two.jpg',
        '/premierpic/three.jpg',
        '/premierpic/four.jpg',
        '/premierpic/five.jpg',
        '/premierpic/six.jpg'
    ];

    useEffect(() => {
        // Check if user is logged in
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        const timerId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);

        return () => clearTimeout(timerId);
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => 
                prev === backgroundImages.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(slideInterval);
    }, [backgroundImages.length]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername(null);
    };

    return (
        <>
            <div className="container home-page">
                <nav className="nav-auth">
                    {username ? (
                        <div className="user-welcome">
                            <span>Welcome, {username}</span>
                            <button onClick={handleLogout} className="auth-button">LOGOUT</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="auth-button">LOGIN</Link>
                            <Link to="/register" className="auth-button">REGISTER</Link>
                        </>
                    )}
                </nav>

                <div className="slideshow-background">
                    {backgroundImages.map((img, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    ))}
                    <div className="gradient-overlay" />
                </div>

                <div className="text-zone">
                    <h1>
                        <img src={LogoPL} alt="PremierZone" />
                        <br />
                        <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={12} />
                        <br />
                        <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={15} />
                    </h1>
                    <h2>Your home for everything Premier League related!</h2>
                    <Link to="/dashboard" className="flat-button">GET STARTED</Link>
                </div>
            </div>
            <ScrollSection />
            <Loader type="pacman" />
        </>
    );
};

export default Home;