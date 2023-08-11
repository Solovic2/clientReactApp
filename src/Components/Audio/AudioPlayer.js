import React from 'react';
import { useRef } from 'react';

const AudioPlayer = ({src, playingCard, setPlayingCard}) => {
  const audio = useRef();
  if (!audio.current) {
    audio.current = new Audio(src);
  } 
  const play = () => {
    if(playingCard) {
      playingCard.pause(); 
    }
    
    audio.current.play(); 
    setPlayingCard(audio.current);
  }

  return (
    <div>
      <audio ref={audio} controls src={src} onPlay={play} />
    </div>
  );
}

export default React.memo(AudioPlayer);