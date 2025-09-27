
  import React, { useEffect } from 'react';
  import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
  import { Toaster } from 'react-hot-toast';
  import HomePage from './pages/HomePage';
  import UserHomePage from './pages/UserHomePage';
  import { useAuthStore } from './store/useAuthStore';

  const DynamicRouteWrapper = () => {
    const { authUser } = useAuthStore();
    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if (authUser) {
        if (authUser.username !== username) {
          navigate(`/${authUser.username}`); // Redirect to correct user page
        }
      } else {
        navigate('/'); // Redirect to home if not authenticated
      }
    }, [authUser, username, navigate]);

    return authUser?.username === username ? <UserHomePage /> : null;
  };

  const App = () => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      checkAuth(); // Run authentication check once
    }, [checkAuth]);

    useEffect(() => {
      if (authUser?.username) {
        navigate(`/${authUser.username}`);
      }
    }, [authUser, navigate]);

    if (isCheckingAuth) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    return (
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:username" element={<DynamicRouteWrapper />} />
        </Routes>
        <Toaster />
      </div>
    );
  };

  export default App;
