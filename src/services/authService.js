// Example functions for authService.js

const authService = {
    onLogin: async (email, password) => {
      // Simulate login API call (replace with actual API call)
      if (email === 'me@apzmedia.com' && password === 'password') {
        localStorage.setItem('isAuthenticated', 'true');
        return true;
      }
      throw new Error('Invalid credentials');
    },
    logout: () => {
      localStorage.removeItem('isAuthenticated');
    },
    isAuthenticated: () => {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
  };
  
  export default authService;
  