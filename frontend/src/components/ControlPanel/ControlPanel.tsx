import React, { useContext, useState, useEffect } from 'react';
import { RootContextAudio } from '../../Context/Context';
import styles from './styles.module.scss';
import { Slider, IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import convertSecondToMM from '../../utils/convertSecondToMM';

const TimeControl: React.FC = () => {
  console.log('Time control rerender');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const { currentTrack, audioTracks } = useContext(RootContextAudio);
  const { duration } = currentTrack;

  const finnalyFilteredCurrentTimeForSlider: number = Math.round((currentTime / duration) * 100);

  const finnalyFilteredCurrentTimeWithSecondForSlider: string = convertSecondToMM(currentTime);

  const changeAudioSlider = (event: Event, value: number | number[], activeThumb: number) => {
    const timeAudioInSeconds: number = Math.round(((value as number) / 100) * duration);
    setCurrentTime(timeAudioInSeconds);
    if (audioTracks) {
      audioTracks.currentTime = timeAudioInSeconds;
    }
  };

  useEffect(() => {
    const addIntervalOfOneSecond = setInterval(() => {
      setCurrentTime(audioTracks?.currentTime || 0);
    }, 1000);
    return () => {
      clearInterval(addIntervalOfOneSecond);
    };
  }, [audioTracks]);

  return (
    <>
      <p>{finnalyFilteredCurrentTimeWithSecondForSlider}</p>{' '}
      <Slider
        step={1}
        min={0}
        max={100}
        value={finnalyFilteredCurrentTimeForSlider}
        onChange={changeAudioSlider}
      />{' '}
    </>
  );
};

const ControlPanel: React.FC = () => {
  console.log('Control panel rerender');
  const { currentTrack, playing, clickAudio } = useContext(RootContextAudio);
  const { title, artists, duration, preview } = currentTrack;

  const convertSecond: string = convertSecondToMM(duration);

  return (
    <div className={styles.playbar}>
      <img className={styles.preview} src={preview} alt="preview" />{' '}
      <IconButton onClick={() => clickAudio(currentTrack)}>
        {playing ? <Pause /> : <PlayArrow />}{' '}
      </IconButton>{' '}
      <div className={styles.credits}>
        <h3>{title}</h3> <p>{artists}</p>{' '}
      </div>{' '}
      <div className={styles.slider}>
        <TimeControl /> <p>{convertSecond}</p>{' '}
      </div>{' '}
    </div>
  );
};

export default ControlPanel;
