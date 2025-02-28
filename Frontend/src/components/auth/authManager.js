// authManager.js
export const TOKEN_KEY = 'token'; // Changed to match existing implementation
export const USERNAME_KEY = 'username';

// Store the token and username
export const setAuthToken = (token, username) => {
  if (!token) {
    console.warn('Attempted to store empty token');
    return false;
  }
  try {
    localStorage.setItem(TOKEN_KEY, token);
    if (username) {
      localStorage.setItem(USERNAME_KEY, username);
    }
    console.log('Token and username stored successfully');
    window.dispatchEvent(new Event('auth-changed'));
    return true;
  } catch (error) {
    console.error('Failed to store auth token:', error);
    return false;
  }
};

// Retrieve the token
export const getAuthToken = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    return token || null;
  } catch (error) {
    console.error('Failed to retrieve auth token:', error);
    return null;
  }
};

// Get username
export const getUsername = () => {
  try {
    return localStorage.getItem(USERNAME_KEY);
  } catch (error) {
    console.error('Failed to retrieve username:', error);
    return null;
  }
};

// Remove auth data
export const removeAuthData = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    console.log('Auth data removed successfully');
    window.dispatchEvent(new Event('auth-changed'));
    return true;
  } catch (error) {
    console.error('Failed to remove auth data:', error);
    return false;
  }
};

// Verify if token exists and is potentially valid
export const verifyAuthToken = () => {
  const token = getAuthToken();
  if (!token) return false;
  
  try {
    // Basic JWT structure verification
    const [header, payload, signature] = token.split('.');
    if (!header || !payload || !signature) {
      console.warn('Invalid token structure');
      return false;
    }

    // Decode the payload
    const decodedPayload = JSON.parse(atob(payload));
    
    // Check if token is expired
    if (decodedPayload.exp && decodedPayload.exp * 1000 < Date.now()) {
      console.warn('Token is expired');
      removeAuthData();
      return false;
    }

    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

// Listen for storage events
window.addEventListener('storage', (event) => {
  if (event.key === TOKEN_KEY || event.key === USERNAME_KEY) {
    window.dispatchEvent(new Event('auth-changed'));
  }
});