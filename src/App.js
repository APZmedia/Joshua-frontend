import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext'; // Import the NotificationProvider
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import StepOne from './components/Formats/StepOne.jsx';
import StepTwo from './components/Formats/StepTwo';
import StepThree from './components/Formats/StepThree';
import StepFour from './components/Formats/StepFour';
import DashboardLayout from './components/layout/DashboardLayout';
import FormatSummary from './components/Formats/FormatSummary'; // Summary component after steps
import authService from './services/authService';
import Profile from './pages/Dashboard/Profile.jsx';
import Settings from './pages/Dashboard/Settings.jsx';
import Formats from './pages/Dashboard/Formats.jsx';
import Posts from './pages/Dashboard/Posts.jsx';
import Calendar from './pages/Dashboard/Calendar.jsx';
import Library from './pages/Dashboard/Library.jsx';


// Component for handling private routes (only accessible if authenticated)
const PrivateRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private Dashboard Routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Routes>
                    {/* Hardcoded step routes */}
                    <Route path="/format/carousel/step/1" element={<StepOne />} />
                    <Route path="/format/carousel/step/2" element={<StepTwo />} />
                    <Route path="/format/carousel/step/3" element={<StepThree />} />
                    <Route path="/format/carousel/step/4" element={<StepFour />} />
                    <Route path="/format/carousel/summary" element={<FormatSummary />} />
                    <Route path='/profile' element={<Profile />} /> 
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/formats' element={<Formats />} />
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/calendar' element={<Calendar />} />
                    <Route path='/library' element={<Library />} />
                  </Routes>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
