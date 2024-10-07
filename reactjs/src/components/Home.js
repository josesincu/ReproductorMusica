import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SongCard from './SongCard';
import { Container, Box, Snackbar, Alert } from '@mui/material';
import MusicPlayer from './MusicPlayer';

import axios from 'axios';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const idFavorite = localStorage.getItem('id_favorites');
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar si la canción está en reproducción
  //const apiURL = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com';
  const apiURL = "http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com";

  const getSongs = async () => {
    try {
      const response = await axios.get(apiURL + '/get_songs');
      console.log(response.data);
      setSongs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  const handleFavoriteToggle = async (id_song) => {
    try {
      await axios.post(`${apiURL}/playlist_song`, {
        id_song,
        id_playlist: idFavorite,
        is_favorite: true
      });
      setSnackbarMessage('Canción añadida a favoritos correctamente');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error al añadir a favoritos:', error);
      setSnackbarMessage('Error al añadir la canción a favoritos');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true); // Inicia la reproducción automáticamente
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#121212', minHeight: '100vh' }}>
      <Navbar />
      <Container sx={{ flexGrow: 1, padding: 3 }}>
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onFavoriteToggle={handleFavoriteToggle}
            onPlay={handlePlaySong}  // Combina ambos eventos si es necesario
          />
        ))}
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Error') ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {currentSong && (
        <MusicPlayer
          songUrl={currentSong.file_url}
          songName={currentSong.name}
          artistName={currentSong.artist}
          isPlaying={isPlaying} // Pasa isPlaying como prop
          setIsPlaying={setIsPlaying} // Pasa setIsPlaying como prop
        />
      )}
    </Box>
  );
  
};

export default Home;
