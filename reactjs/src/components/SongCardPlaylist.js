import React, { useState } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';

function SongCardPlaylist({ song, onDelete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [openView, setOpenView] = useState(false); // Estado para el diálogo de visualización
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); // Estado para el diálogo de confirmación de eliminación

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleOpenDeleteConfirm = () => {
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(song.id_song); // Llama a la función de eliminación pasada como prop
    }
    handleCloseDeleteConfirm();
  };
  
  

  const handleViewClick = () => {
    setOpenView(!openView); // Alterna la visibilidad del diálogo
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
            <IconButton aria-label="like" sx={{ color: 'white' }}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="delete" sx={{ color: 'white' }} onClick={handleOpenDeleteConfirm}>
              <DeleteIcon />
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
              <PlayArrowIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar esta canción?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

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
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SongCardPlaylist;
