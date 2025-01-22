import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Container, IconButton } from '@mui/material';
import {
  FavoriteRounded,
  QueueMusicRounded,
  PersonRounded,
  EmailRounded,
  ArrowBack,
} from '@mui/icons-material';
import styles from './ProfilePage.module.scss';

interface ProfilePageProps {
  username: string;
  email: string;
  onLogout: () => void;
  onNavigate: (page: 'favorites' | 'playlists' | 'main') => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ username, email, onLogout, onNavigate }) => {
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:8000/api/users/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFavoriteCount(data.length);
      } catch (error) {
        console.error('Error fetching favorites count:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Container className={styles.container}>
      <IconButton onClick={() => onNavigate('main')} className={styles.backButton}>
        <ArrowBack />
      </IconButton>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>{username[0].toUpperCase()}</div>
          </div>
          <Typography variant="h4" className={styles.title}>
            My Profile 🚀
          </Typography>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoItem}>
            <PersonRounded className={styles.icon} />
            <div>
              <Typography variant="body2" className={styles.label}>
                Username
              </Typography>
              <Typography variant="h6" className={styles.value}>
                {username}
              </Typography>
            </div>
          </div>
          <div className={styles.infoItem}>
            <EmailRounded className={styles.icon} />
            <div>
              <Typography variant="body2" className={styles.label}>
                Email
              </Typography>
              <Typography variant="h6" className={styles.value}>
                {email}
              </Typography>
            </div>
          </div>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statCard} onClick={() => onNavigate('favorites')}>
            <FavoriteRounded className={styles.icon} />
            <Typography variant="h6">Favorite Tracks</Typography>
            <Typography variant="h4" className={styles.statNumber}>
              {favoriteCount}
            </Typography>
          </div>
          <div className={styles.statCard} onClick={() => onNavigate('playlists')}>
            <QueueMusicRounded className={styles.icon} />
            <Typography variant="h6">Playlists</Typography>
            <Typography variant="h4" className={styles.statNumber}>
              0
            </Typography>
          </div>
        </div>

        <Button variant="outlined" className={styles.logoutButton} onClick={onLogout}>
          Logout
        </Button>
      </div>
    </Container>
  );
};

export default ProfilePage;
