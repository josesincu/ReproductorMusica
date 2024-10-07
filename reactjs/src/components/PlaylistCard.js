import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

function PlaylistCard({ playlist, onDelete, onPlay, onView, onAddSong }) {
  return (
    <Card sx={{ display: 'flex', bgcolor: '#121212', color: 'white', mb: 2, alignItems: 'center', position: 'relative' }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, borderRadius: '8px', marginLeft: 2 }}
        image={playlist.photo_url}
        alt={playlist.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 2 }}>
        <CardContent sx={{ flex: '1 0 auto', padding: '0 !important' }}>
          <Typography component="div" variant="h6">
            {playlist.name}
          </Typography>
          <Typography variant="subtitle1" color="gray" component="div">
            {playlist.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<VisibilityIcon />}
            sx={{ color: 'white', borderColor: 'white', marginRight: 1 }}
            onClick={() => onView(playlist.id_playlist)}
          >
            Ver
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddIcon />}
            sx={{ color: 'white', borderColor: 'white', marginRight: 1 }}
            onClick={() => onAddSong(playlist.id_playlist)}
          >
            Agregar Canción
          </Button>
          <IconButton
            aria-label="delete"
            sx={{ color: 'white', marginRight: 'auto' }}
            onClick={() => onDelete(playlist.id_playlist)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: 20,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          aria-label="play"
          sx={{
            backgroundColor: '#9b51e0',
            color: 'white',
            height: 60,
            width: 60,
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: '#7b41b3',
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => onPlay(playlist.id_playlist)}
        >
          <PlayArrowIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
    </Card>
  );
}

export default PlaylistCard;
