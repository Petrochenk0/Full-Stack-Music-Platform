import React from 'react';
import { Typography, Container, IconButton, Button } from '@mui/material';
import { ArrowBack, QueueMusicRounded, AddRounded } from '@mui/icons-material';
import styles from './PlaylistsPage.module.scss';

interface PlaylistsPageProps {
  onBack: () => void;
}

const PlaylistsPage: React.FC<PlaylistsPageProps> = ({ onBack }) => {
  // Здесь потом будем получать реальные плейлисты
  const playlists = [];

  return (
    <Container className={styles.container}>
      <div className={styles.header}>
        <IconButton onClick={onBack} className={styles.backButton}>
          <ArrowBack />
        </IconButton>
        <div className={styles.titleWrapper}>
          <QueueMusicRounded className={styles.icon} />
          <Typography variant="h4" className={styles.title}>
            My Playlists 🎵
          </Typography>
        </div>
      </div>

      <Button variant="contained" className={styles.createButton} startIcon={<AddRounded />}>
        Create New Playlist
      </Button>

      <div className={styles.playlistsGrid}>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div key={playlist.id} className={styles.playlistCard}>
              {/* Здесь будет карточка плейлиста */}
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <QueueMusicRounded className={styles.emptyIcon} />
            <Typography variant="h6">No playlists yet</Typography>
            <Typography variant="body1" color="textSecondary">
              Create your first playlist! 🎯
            </Typography>
          </div>
        )}
      </div>
    </Container>
  );
};

export default PlaylistsPage;
