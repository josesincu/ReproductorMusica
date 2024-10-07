import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';

const MusicPlayer = ({ songUrl, songName, artistName, isPlaying, setIsPlaying }) => {
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause(); // Pausa cualquier reproducción en curso
      audio.currentTime = 0; // Reinicia el tiempo de reproducción
      audio.src = songUrl; // Establece la nueva fuente
      if (isPlaying) {
        audio.play().catch(error => console.error("Error playing audio:", error));
      }
    }
  }, [songUrl]);
  

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      const updateProgress = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      };
      audio.addEventListener('timeupdate', updateProgress);
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [volume]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event, newVolume) => {
    setVolume(newVolume / 100);
  };

  const handleSeek = (event, newTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 240,
        width: `calc(100% - 240px)`,
        bgcolor: '#212121',
        display: 'flex',
        alignItems: 'center',
        padding: 1,
        color: 'white',
        boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <Typography variant="body1" sx={{ color: 'white', mx: 2 }}>
          {songName} - {artistName}
        </Typography>
        <IconButton onClick={handlePlayPause} sx={{ color: 'white' }}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <Slider
          value={currentTime}
          max={duration}
          onChange={handleSeek}
          sx={{ width: 300, mx: 2 }}
        />
        <Slider
          value={volume * 100}
          min={0}
          max={100}
          onChange={handleVolumeChange}
          sx={{ width: 150, mx: 2 }}
        />
        <IconButton sx={{ color: 'white' }}>
          {volume > 0.5 ? <VolumeUpIcon /> : <VolumeDownIcon />}
        </IconButton>
      </Box>
      <audio ref={audioRef} />
    </Box>
  );
};

export default MusicPlayer;
