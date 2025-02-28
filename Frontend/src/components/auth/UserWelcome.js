import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { getUsername, removeAuthData } from './authManager';

const UserWelcome = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setUsername(getUsername());
    
    const handleAuthChange = () => {
      setUsername(getUsername());
    };
    
    window.addEventListener('auth-changed', handleAuthChange);
    return () => window.removeEventListener('auth-changed', handleAuthChange);
  }, []);

  const handleLogout = () => {
    removeAuthData();
    window.location.href = '/';
  };

  if (!username) return null;

  return (
    <div className="user-welcome-section bg-opacity-20 bg-white p-4 mb-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} className="text-blue-900" />
          </div>
          <div>
            <div className="text-black text-opacity-80 text-sm">Welcome back</div>
            <div className="text-black font-semibold truncate max-w-[120px]">{username}</div>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center p-2 rounded bg-opacity-20 bg-white text-white hover:bg-opacity-30 transition-all"
          title="Logout"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default UserWelcome;