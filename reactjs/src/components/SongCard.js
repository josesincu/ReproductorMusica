import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModifySong from './ModifySong';
import axios from 'axios';
function SongCard({ song, isFavorite, onFavoriteToggle, onDelete, onEdit, onPlay }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

  // Revisar si el usuario es administrador
  const isAdmin = localStorage.getItem('role') === 'admin';


  const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración
  //const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
    if (onPlay) {
      onPlay(isPlaying ? null : song);
    }
  };

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleViewClick = () => {
    setOpenView(!openView);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(`${pathApi}/delete_song`, {
        data: {
          id_song: song.id_song
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.data.message) {
        alert("Canción eliminada exitosamente");
        window.location.reload();
      } else {
        alert("Error al eliminar la canción");
      }
    } catch (error) {
      console.error(error);
      alert('Error al eliminar la canción');
    }
  };
  
  

  const handleEdit = (updatedSong) => {
    if (onEdit) {
      onEdit(updatedSong);
    }
    handleOpenEdit(); // Cierra el diálogo después de guardar
  };

  const handleFavoriteClick = () => {
    if (onFavoriteToggle) {
      onFavoriteToggle(song.id_song);
    }
  };

  return (
    <>
      <Card sx={{ display: 'flex', bgcolor: '#121212', color: 'white', mb: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          image={song.photo_url}
          alt={song.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6">
              {song.name}
            </Typography>
            <Typography variant="subtitle1" color="gray" component="div">
              {song.artist}
            </Typography>
            <Typography variant="subtitle2" color="gray" component="div">
              {song.duration}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <IconButton
              aria-label="like"
              sx={{ color: isFavorite ? '#ff4081' : 'white' }}
              onClick={handleFavoriteClick}
            >
              <FavoriteIcon />
            </IconButton>
            
            <IconButton
              aria-label="play"
              sx={{
                backgroundColor: isPlaying ? '#9b51e0' : 'transparent',
                color: isPlaying ? 'white' : 'inherit',
                ml: 'auto',
                '&:hover': {
                  backgroundColor: '#9b51e0',
                  color: 'white',
                },
              }}
              onClick={handlePlayClick}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            
            {isAdmin && (
              <>
                <IconButton aria-label="view" sx={{ color: 'white' }} onClick={handleViewClick}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton aria-label="edit" sx={{ color: 'white' }} onClick={handleOpenEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" sx={{ color: 'white' }} onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      </Card>
      
      <audio ref={audioRef} src={song.file_url} />
      
      <ModifySong
        open={openEdit}
        handleOpenEdit={handleOpenEdit}
        song={song}
        onSave={handleEdit}
      />
      <Dialog open={openView} onClose={handleViewClick}>
        <DialogTitle>Detalles de la canción</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CardMedia
              component="img"
              sx={{ width: 200, height: 200, borderRadius: 1, mb: 2 }}
              image={song.photo_url}
              alt={song.name}
            />
            <Typography variant="h6" gutterBottom>
              Nombre: {song.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Artista: {song.artist}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Duración: {song.duration}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              URL de música: <a href={song.file_url} target="_blank" rel="noopener noreferrer">{song.file_url}</a>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClick} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SongCard;
