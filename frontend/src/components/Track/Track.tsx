import React, { useContext, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { IconButton } from '@mui/material';
import { PlayArrow, Pause, FavoriteBorder, Favorite } from '@mui/icons-material';
import convertSecondToMM from '../../utils/convertSecondToMM';
import { RootContextAudio } from '../../Context/Context';
import cn from 'classnames';
import { useFavorites } from '../../Context/FavoritesContext';

interface TrackProps {
  id: string;
  src: string;
  preview: string;
  title: string;
  artists: string;
  duration: number;
}

const Track: React.FC<TrackProps> = ({ id, src, preview, title, artists, duration }) => {
  const convertSeconds = convertSecondToMM(duration);
  const { currentTrack, playing, clickAudio } = useContext(RootContextAudio);
  const currentTrackBool = currentTrack.id === id;
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.includes(id.toString());

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      if (!isFavorite) {
        const response = await fetch('http://localhost:8000/api/users/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: id.toString(), src, preview, title, artists, duration }),
        });

        if (response.ok) {
          addFavorite(id.toString());
        }
      } else {
        const response = await fetch(`http://localhost:8000/api/users/favorites/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          removeFavorite(id.toString());
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className={cn(styles.track, currentTrackBool && styles.playing)}>
      <IconButton onClick={() => clickAudio({ id, src, preview, title, artists, duration })}>
        {currentTrackBool && playing ? <Pause /> : <PlayArrow />}
      </IconButton>
      <IconButton onClick={handleFavoriteClick} className={styles.favoriteButton}>
        {isFavorite ? <Favorite className={styles.favoriteIcon} /> : <FavoriteBorder />}
      </IconButton>
      <img className={styles.preview} src={preview} alt="" />
      <div className={styles.credits}>
        <b>{title}</b>
        <p>{artists}</p>
      </div>
      <p>{convertSeconds}</p>
    </div>
  );
};

export default Track;
