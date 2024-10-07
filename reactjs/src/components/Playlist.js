import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlaylistCard from './PlaylistCard'; // Asegúrate de que la ruta sea correcta
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import Navbar from './Navbar';
import AddIcon from '@mui/icons-material/Add';

function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSongDialog, setOpenSongDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    photo: null
  });
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  const [playlistToAddSong, setPlaylistToAddSong] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const userId = localStorage.getItem('id_user');

  const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración


  useEffect(() => {
    if (userId) {
      axios.post(`${pathApi}/get_playlists_u`, { id_user: userId })
        .then(response => {
          const idFavorites = localStorage.getItem('id_favorites'); // Obtener el id de la playlist favorita
          const filteredPlaylists = response.data.filter(playlist => playlist.id_playlist !== parseInt(idFavorites));
          setPlaylists(filteredPlaylists);
        })
        .catch(error => {
          console.error('Error fetching playlists:', error);
        });
    }
  }, [userId]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('id_user', userId);
    data.append('name', formData.name);
    data.append('description', formData.description);
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    try {
      const response = await axios.post(`${pathApi}/create_playlist`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPlaylists([...playlists, response.data]);
      setSnackbarMessage('Playlist creada correctamente');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('Error al crear la playlist');
      setSnackbarOpen(true);
    } finally {
      setOpenCreateDialog(false);
      setFormData({
        name: '',
        description: '',
        photo: null
      });
    }
  };

  const handleDelete = (id_playlist) => {
    setPlaylistToDelete(id_playlist);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    axios.delete(`${pathApi}/delete_playlist`, {
      data: { id_playlist: playlistToDelete }
    })
    .then(response => {
      setPlaylists(playlists.filter(playlist => playlist.id_playlist !== playlistToDelete));
      setSnackbarMessage('Playlist eliminada correctamente');
      setSnackbarOpen(true);
    })
    .catch(error => {
      console.error('Error deleting playlist:', error);
    })
    .finally(() => {
      setOpenDeleteDialog(false);
      setPlaylistToDelete(null);
    });
  };

  const handlePlay = (id_playlist) => {
    // Implementa la lógica para reproducir la playlist
    console.log('Playing playlist', id_playlist);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleView = (id_playlist) => {
    // Navigate to the songs playlist view, passing the playlist ID
    window.location.href = `/songsPlaylist/${id_playlist}`;
  };
  

  const handleAddSong = (id_playlist) => {
    setPlaylistToAddSong(id_playlist);
    setOpenSongDialog(true);
    fetchSongs();
  };

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${pathApi}/get_songs`);
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
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
        await axios.post(`${pathApi}/playlist_song`, {
          id_song: id_song,
          id_playlist: playlistToAddSong,
          is_favorite: false
        });
      }
      setSnackbarMessage('Canciones agregadas correctamente');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      setSnackbarMessage('Error al agregar canciones');
      setSnackbarOpen(true);
    } finally {
      setOpenSongDialog(false);
      setSelectedSongs([]);
    }
  };
  

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#121212', height: '100vh' }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: 3, marginLeft: 2, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 3 }}>
            Mis PlayLists
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
            onClick={() => setOpenCreateDialog(true)}
          >
            Nueva Playlist
          </Button>
        </Box>
        {playlists.map(playlist => (
          <PlaylistCard
            key={playlist.id_playlist}
            playlist={playlist}
            onDelete={handleDelete}
            onPlay={handlePlay}
            onView={handleView}
            onAddSong={() => handleAddSong(playlist.id_playlist)}
          />
        ))}
        <Dialog
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
        >
          <DialogTitle>Crear Nueva Playlist</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Descripción"
                name="description"
                autoComplete="description"
                value={formData.description}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Cargar Imagen
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  name="photo"
                  onChange={handleChange}
                />
              </Button>
              <DialogActions>
                <Button onClick={() => setOpenCreateDialog(false)} color="primary">
                  Cancelar
                </Button>
                <Button type="submit" color="secondary">
                  Crear
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Está seguro de que desea eliminar la playlist "{playlists.find(p => p.id_playlist === playlistToDelete)?.name}"?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
              Cancelar
            </Button>
            <Button onClick={confirmDelete} color="secondary">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openSongDialog}
          onClose={() => setOpenSongDialog(false)}
        >
          <DialogTitle>Seleccionar Canciones</DialogTitle>
          <DialogContent>
            {songs.map(song => (
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
    </Box>
  );
}

export default Playlist;
