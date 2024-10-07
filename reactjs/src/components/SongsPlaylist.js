import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import SongCardPlaylist from './SongCardPlaylist';
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

const SongsPlaylist = () => {
  const { id } = useParams();  // Obtener el ID de la playlist desde la URL
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState('');  // Estado para almacenar el nombre de la playlist
  const [allSongs, setAllSongs] = useState([]); // Estado para almacenar todas las canciones
  const [selectedSongs, setSelectedSongs] = useState([]); // Estado para almacenar las canciones seleccionadas
  const [openSongDialog, setOpenSongDialog] = useState(false); // Estado para controlar el diálogo de agregar canciones
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const apiURL = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com';

  const getPlaylistDetails = useCallback(async () => {
    try {
      const response = await axios.post(apiURL + '/get_playlist', {
        id_playlist: id
      });
      setPlaylistName(response.data.name);
    } catch (error) {
      console.error(error);
    }
  }, [id, apiURL]);

  const getSongs = useCallback(async () => {
    try {
      const response = await axios.post(apiURL + '/get_songsPlaylist', { id_playlist: id });
      setSongs(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [id, apiURL]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${apiURL}/get_songs`);
      setAllSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handleAddSong = () => {
    setOpenSongDialog(true);
    fetchSongs();
  };

  const handleSongSelect = (id_song) => {
    setSelectedSongs(prevSelectedSongs => 
      prevSelectedSongs.includes(id_song) 
        ? prevSelectedSongs.filter(id => id !== id_song)
        : [...prevSelectedSongs, id_song]
    );
  };

  const handleSubmitSongs = async () => {
    try {
      for (let id_song of selectedSongs) {
        await axios.post(`${apiURL}/playlist_song`, {
          id_song: id_song,
          id_playlist: id,
          is_favorite: false
        });
      }
      setSnackbarMessage('Canciones agregadas correctamente');
      setSnackbarOpen(true);
      getSongs(); // Actualiza la lista de canciones de la playlist después de agregar nuevas canciones
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      setSnackbarMessage('Error al agregar canciones');
      setSnackbarOpen(true);
    } finally {
      setOpenSongDialog(false);
      setSelectedSongs([]);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleDeleteSong = async (id_song) => {
    try {
      await axios.delete(`${apiURL}/delete_playlist_song`, {
        data: {
          id_song: id_song,
          id_playlist: id,
        },
      });
      setSongs(prevSongs => prevSongs.filter(song => song.id_song !== id_song));
      setSnackbarMessage('Canción eliminada correctamente');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting song:', error);
      setSnackbarMessage('Error al eliminar canción');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    getPlaylistDetails();  // Obtiene los detalles de la playlist
    getSongs();  // Obtiene las canciones de la playlist
  }, [getPlaylistDetails, getSongs]);

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#121212', height: '100vh' }}>
      <Navbar />
      <Container sx={{ flexGrow: 1, padding: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
            {playlistName}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#9b51e0',
              color: 'white',
              '&:hover': {
                backgroundColor: '#7a3bb2',
              },
            }}
            onClick={handleAddSong}
          >
            Añadir Canción
          </Button>
        </Box>
        {
          songs.length > 0 ? (
            songs.map((song) => (
              <SongCardPlaylist key={song.id_song} song={song} onDelete={handleDeleteSong} />
            ))
          ) : (
            <Typography sx={{ color: 'white' }}>No songs found.</Typography>
          )
        }
      </Container>

      <Dialog
        open={openSongDialog}
        onClose={() => setOpenSongDialog(false)}
      >
        <DialogTitle>Seleccionar Canciones</DialogTitle>
        <DialogContent>
          {allSongs.map(song => (
            <Box key={song.id_song} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img src={song.photo_url} alt={song.name} style={{ width: 50, height: 50, marginRight: 10 }} />
              <Typography sx={{ flexGrow: 1 }}>{song.name} - {song.artist}</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSongs.includes(song.id_song)}
                    onChange={() => handleSongSelect(song.id_song)}
                  />
                }
                label="Seleccionar"
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSongDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmitSongs} color="secondary">
            Añadir Canciones
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Error') ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SongsPlaylist;
