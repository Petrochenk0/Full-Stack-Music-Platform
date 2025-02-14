import React, { useState, useEffect } from 'react';
import Main from './pages/Main';
import ContextProviderForAudio from './Context/Context';
import ControlPanel from './components/ControlPanel/ControlPanel';
import AuthModal from './components/AuthModal/AuthModal';
import { Button } from '@mui/material';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import PlaylistsPage from './pages/PlaylistsPage/PlaylistsPage';

import styles from './global.module.scss';

type Page = 'main' | 'profile' | 'favorites' | 'playlists';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('main');
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
    setCurrentPage('main');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return user ? (
          <ProfilePage
            username={user.username}
            email={user.email}
            onLogout={handleLogout}
            onNavigate={(page) => handleNavigate(page)}
          />
        ) : null;
      case 'favorites':
        return <FavoritesPage onBack={() => handleNavigate('profile')} />;
      case 'playlists':
        return <PlaylistsPage onBack={() => handleNavigate('profile')} />;
      default:
        return (
          <>
            <Main />
            <ControlPanel />
          </>
        );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {user ? (
          <Button
            variant="contained"
            className={styles.signUpButton}
            onClick={() => handleNavigate('profile')}>
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
      {renderPage()}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
