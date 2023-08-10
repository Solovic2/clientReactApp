import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const AudioPlayer = ({src, playingCard, setPlayingCard}) => {
  const audio = useRef(null); 
  useEffect(() => {
    audio.current = new Audio(src);
  }, [src]);
  
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

export default AudioPlayer;