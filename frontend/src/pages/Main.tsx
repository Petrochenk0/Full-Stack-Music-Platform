import React, { ChangeEvent } from 'react';
import tracksList from '../assets/tracksList.ts';
import styles from './styles.module.scss';
import Track from '../components/Track/Track';
import { Input } from '@mui/material';

interface TrackArgument {
  title: string;
  artists: string;
}

const runSearch = (queryStringArgument: string): TrackArgument[] => {
  if (!queryStringArgument) {
    return tracksList;
  }
  const lowerQueryStringArgument = queryStringArgument.toLowerCase();

  return tracksList.filter(
    (trackArgument: TrackArgument) =>
      trackArgument.title.toLowerCase().includes(lowerQueryStringArgument) ||
      trackArgument.artists.toLowerCase().includes(lowerQueryStringArgument),
  );
};

const Main: React.FC = () => {
  const [tracks, setTracks] = React.useState<TrackArgument[]>(tracksList);

  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const etv = event.target.value;
    const foundsTrack = runSearch(etv);
    setTracks(foundsTrack);
  };

  return (
    <div className={styles.search}>
      <Input className={styles.input} placeholder="Что хочешь послушать?" onChange={changeInput} />
      <div className={styles.list}>
        {tracks.map((value: TrackArgument, index: number) => {
          return <Track key={index} {...value} />;
        })}
      </div>
    </div>
  );
};
export default Main;
