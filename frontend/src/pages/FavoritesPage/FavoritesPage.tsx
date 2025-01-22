import React, { useState, useEffect } from 'react';
import { Typography, Container, IconButton } from '@mui/material';
import { ArrowBack, FavoriteRounded } from '@mui/icons-material';
import styles from './FavoritesPage.module.scss';
import Track from '../../components/Track/Track';

interface FavoritesPageProps {
  onBack: () => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ onBack }) => {
  const [favoriteTracks, setFavoriteTracks] = useState([]);

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
        setFavoriteTracks(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Container className={styles.container}>
      <div className={styles.header}>
        <IconButton onClick={onBack} className={styles.backButton}>
          <ArrowBack />
        </IconButton>
        <div className={styles.titleWrapper}>
          <FavoriteRounded className={styles.icon} />
          <Typography variant="h4" className={styles.title}>
            Favorite Tracks 💜
          </Typography>
        </div>
      </div>

      <div className={styles.tracksList}>
        {favoriteTracks.length > 0 ? (
          favoriteTracks.map((track: any) => (
            <Track
              key={track.trackId}
              id={track.trackId}
              src={track.src}
              preview={track.preview}
              title={track.title}
              artists={track.artists}
              duration={track.duration}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <FavoriteRounded className={styles.emptyIcon} />
            <Typography variant="h6">No favorite tracks yet</Typography>
            <Typography variant="body1" color="textSecondary">
              Start adding tracks you love! ✨
            </Typography>
          </div>
        )}
      </div>
    </Container>
  );
};

export default FavoritesPage;
