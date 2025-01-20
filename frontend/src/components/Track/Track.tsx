import React, { useContext } from 'react';
import styles from './styles.module.scss';
import { IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import convertSecondToMM from '../../utils/convertSecondToMM';
import { RootContextAudio } from '../../Context/Context';
import cn from 'classnames';

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

  return (
    <div className={cn(styles.track, currentTrackBool && styles.playing)}>
      <IconButton onClick={() => clickAudio({ id, src, preview, title, artists, duration })}>
        {currentTrackBool && playing ? <Pause /> : <PlayArrow />}
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
