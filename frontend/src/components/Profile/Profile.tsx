import React from 'react';
import { Typography, Button, Box, Divider } from '@mui/material';
import { FavoriteRounded, QueueMusicRounded, LogoutRounded } from '@mui/icons-material';
import styles from './Profile.module.scss';

interface ProfileProps {
  username: string;
  email: string;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ username, email, onLogout }) => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.userInfo}>
        <Typography variant="h4" className={styles.username}>
          {username}
        </Typography>
        <Typography variant="body1" className={styles.email}>
          {email}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<LogoutRounded />}
          onClick={onLogout}
          className={styles.logoutButton}>
          Logout
        </Button>
      </div>

      <Divider className={styles.divider} />

      <div className={styles.musicSection}>
        <Box className={styles.section}>
          <div className={styles.sectionHeader}>
            <FavoriteRounded className={styles.icon} />
            <Typography variant="h6">Favorite Tracks</Typography>
          </div>
          <div className={styles.tracksList}>
            {/* Здесь будет список любимых треков */}
            <Typography variant="body2" color="textSecondary">
              No favorite tracks yet
            </Typography>
          </div>
        </Box>

        <Box className={styles.section}>
          <div className={styles.sectionHeader}>
            <QueueMusicRounded className={styles.icon} />
            <Typography variant="h6">My Playlists</Typography>
          </div>
          <div className={styles.playlistsList}>
            {/* Здесь будет список плейлистов */}
            <Typography variant="body2" color="textSecondary">
              No playlists created yet
            </Typography>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
