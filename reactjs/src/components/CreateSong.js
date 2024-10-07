import React from 'react';
import {
  Container,
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Typography,
  Box
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const theme = createTheme();

function CreateSong() {

  const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Crear un objeto FormData para enviar los datos del formulario
    const formData = new FormData();
    formData.append('name', data.get('name'));
    formData.append('duration', data.get('duration'));
    formData.append('artist', data.get('artist'));
    
    const photoFile = data.get('photo_url');
    if (photoFile) {
      formData.append('photo_url', photoFile); // Asegúrate de que el nombre del campo coincida con el backend
    }

    const fileFile = data.get('file_url');
    if (fileFile) {
      formData.append('file_url', fileFile); // Asegúrate de que el nombre del campo coincida con el backend
    }

    try {
      const response = await axios.post(`${pathApi}/create_song`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('Canción creada exitosamente');
      window.location.href = '/home'; // Redirige a la página de inicio
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Error al crear la canción');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PhotoCameraIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear Canción
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              autoComplete="name"
              autoFocus
            />

            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              Cargar Foto
              <input
                type="file"
                accept="image/*"
                hidden
                name="photo_url"
              />
            </Button>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="duration"
              label="Duración"
              name="duration"
              autoComplete="duration"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="artist"
              name="artist"
              label="Artista"
              autoComplete="artist"
            />
            
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              Cargar Canción
              <input
                type="file"
                accept="audio/*"
                hidden
                name="file_url"
              />
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear Canción
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateSong;
