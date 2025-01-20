import React, { useState, createContext } from 'react';
import tracksList from '../assets/tracksList.ts';

const audioTracks = new Audio();
console.log(audioTracks);

interface ContextValue {
  currentTrack: any;
  setCurrentTrack: React.Dispatch<React.SetStateAction<any>>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  clickAudio: (clickAudioTrackArgument: any) => void;
  audioTracks: any[];
}

export const RootContextAudio = createContext<ContextValue>({
  currentTrack: tracksList[0],
  setCurrentTrack: () => {},
  playing: false,
  setPlaying: () => {},
  clickAudio: () => {},
  audioTracks: [],
});

const ContextProviderForAudio: React.FC = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(tracksList[0]);
  const [playing, setPlaying] = useState(false);

  const clickAudio = (clickAudioTrackArgument: any) => {
    console.log(clickAudioTrackArgument.id);
    if (currentTrack.id !== clickAudioTrackArgument.id) {
      setCurrentTrack(clickAudioTrackArgument);
      setPlaying(true);

      if (!audioTracks.src || audioTracks.src !== clickAudioTrackArgument.src) {
        audioTracks.src = clickAudioTrackArgument.src;
        audioTracks.load();
      }

      audioTracks.play();
    } else {
      if (!playing) {
        setPlaying(true);
        audioTracks.play();
      } else {
        setPlaying(false);
        audioTracks.pause();
      }
    }
  };

  return (
    <RootContextAudio.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        playing,
        setPlaying,
        clickAudio,
        audioTracks,
      }}>
      {children}
    </RootContextAudio.Provider>
  );
};

export default ContextProviderForAudio;
