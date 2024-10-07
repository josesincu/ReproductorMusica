import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';
import axios from 'axios';

function ModifySong({ open, handleOpenEdit, song }) {
  const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración
    //const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración

  const [editedSong, setEditedSong] = useState({
    name: '',
    duration: '',
    artist: ''
  });

  useEffect(() => {
    if (song) {
      setEditedSong({
        name: song.name,
        duration: song.duration,
        artist: song.artist
      });
    }
  }, [song]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSong({
      ...editedSong,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar la solicitud para actualizar la canción usando axios
      const response = await axios.put(`${pathApi}/update_song`, {
        id_song: song.id_song,
        name: editedSong.name,
        duration: editedSong.duration,
        artist: editedSong.artist
      });

      // Verifica la respuesta del servidor
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      handleOpenEdit(); // Cierra el diálogo
      alert('Cancion actualizada correctamente');
      window.location.reload(); // Recarga la página para mostrar los cambios
    } catch (error) {
      console.error('Error updating the song:', error);
      alert('Error al actualizar la canción');
    }
  };

  return (
    <Dialog open={open} onClose={handleOpenEdit}>
      <DialogTitle>Edit Song</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            label="Song Name"
            name="name"
            value={editedSong.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="normal"
            label="Duration"
            name="duration"
            value={editedSong.duration}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="normal"
            label="Artist"
            name="artist"
            value={editedSong.artist}
            onChange={handleChange}
            fullWidth
            required
          />
          <DialogActions>
            <Button onClick={handleOpenEdit} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModifySong;
