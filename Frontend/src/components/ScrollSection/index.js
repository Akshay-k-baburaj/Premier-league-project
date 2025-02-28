import React, { useEffect, useState } from 'react';
import './index.scss';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaTiktok 
} from 'react-icons/fa';

const ScrollSection = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [teamCrests, setTeamCrests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.scroll-section');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = (rect.top < window.innerHeight * 0.75);
        
        setVisibleSections(prev => ({
          ...prev,
          [index]: isVisible
        }));
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    const fetchTeamCrests = async () => {
      try {
        // Get the JWT token from localStorage or wherever you store it
        const token = localStorage.getItem('jwt_token');
        
        const headers = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch('http://localhost:8080/api/v4/teams', {
          headers: headers
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Ensure we have an array of teams
        let teamsArray = [];
        if (Array.isArray(data)) {
          teamsArray = data;
        } else if (data.teams && Array.isArray(data.teams)) {
          teamsArray = data.teams;
        } else if (typeof data === 'object') {
          // If it's a single team object, wrap it in an array
          teamsArray = [data];
        }

        // Validate team data
        const validTeams = teamsArray.filter(team => 
          team && 
          team.name && 
          team.crest && 
          team.website
        );

        console.log('Processed teams:', validTeams);
        setTeamCrests(validTeams);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team crests:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeamCrests();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollSections = [
    {
      title: "What is Premier Zone?",
      description: "Premier Zone is your ultimate destination for comprehensive Premier League statistics, player insights, and fantasy football analytics. We transform raw data into meaningful insights for football enthusiasts.",
      image: "/premierpic/one.jpg",
      alignment: "right"
    },
    {
      title: "Why Premier League?",
      description: "The English Premier League is the most watched football league globally. Our platform provides in-depth analysis, helping fans and fantasy managers make informed decisions through detailed player and team statistics.",
      image: "/premierpic/two.jpg",
      alignment: "left"
    },
    {
      title: "Data-Driven Insights",
      description: "Leverage advanced analytics, real-time performance metrics, and predictive modeling to understand player potential, team dynamics, and fantasy football strategies like never before.",
      image: "/premierpic/three.jpg",
      alignment: "right"
    },
    {
      title: "Premier League Teams",
      description: "Explore official websites of Premier League teams. Click on a team crest to learn more!",
      alignment: "left",
      teamCrests: true
    },
    {
      title: "Official Premier League Socials",
      description: "Stay connected with the latest updates, highlights, and exclusive content from the official Premier League social media channels. Follow us across platforms to never miss a moment!",
      image: "/premierpic/four.jpg",
      alignment: "left",
      socialMedia: [
        { 
          icon: <FaFacebook />, 
          name: "Facebook", 
          link: "https://www.facebook.com/premierleague" 
        },
        { 
          icon: <FaTwitter />, 
          name: "Twitter", 
          link: "https://twitter.com/premierleague" 
        },
        { 
          icon: <FaInstagram />, 
          name: "Instagram", 
          link: "https://www.instagram.com/premierleague" 
        },
        { 
          icon: <FaYoutube />, 
          name: "YouTube", 
          link: "https://www.youtube.com/premierleague" 
        },
        { 
          icon: <FaTiktok />, 
          name: "TikTok", 
          link: "https://www.tiktok.com/@premierleague" 
        }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="scroll-sections-container">
        <div className="loading-container">
          Loading team crests...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="scroll-sections-container">
        <div className="error-container">
          Error loading team data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="scroll-sections-container">
      {scrollSections.map((section, index) => (
        <div 
          key={index} 
          className={`scroll-section ${section.alignment} ${visibleSections[index] ? 'visible' : ''}`}
        >
          <div className="content-wrapper">
            <div className="text-content">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
              {section.socialMedia && (
                <div className="social-media-links">
                  {section.socialMedia.map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-icon"
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              )}
              {section.teamCrests && Array.isArray(teamCrests) && teamCrests.length > 0 && (
                <div className="team-crest-container">
                  {teamCrests.map((team, idx) => (
                    <a 
                      key={idx} 
                      href={team.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="team-crest"
                      title={team.name}
                    >
                      <img src={team.crest} alt={team.name} />
                    </a>
                  ))}
                </div>
              )}
            </div>
            {section.image && (
              <div 
                className="image-content" 
                style={{backgroundImage: `url(${section.image})`}}
              >
                <div className="image-overlay"></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollSection;