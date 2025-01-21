import React, { useState, useEffect } from 'react';
import Main from './pages/Main';
import styles from './global.module.scss';
import ContextProviderForAudio from './Context/Context';
import ControlPanel from './components/ControlPanel/ControlPanel';
import AuthModal from './components/AuthModal/AuthModal';
import Profile from './components/Profile/Profile';
import { Button } from '@mui/material';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Получаем данные пользователя
      fetch('http://localhost:8000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          console.error('Failed to fetch user profile:', err);
          localStorage.removeItem('token');
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsProfileOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {user ? (
          <Button
            variant="text"
            className={styles.userButton}
            onClick={() => setIsProfileOpen(!isProfileOpen)}>
            {user.username}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            className={styles.signUpButton}>
            Sign Up
          </Button>
        )}
      </div>
      <Main />
      <ControlPanel />
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {isProfileOpen && user && (
        <Profile username={user.username} email={user.email} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
