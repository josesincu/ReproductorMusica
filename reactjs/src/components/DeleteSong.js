import React from 'react';
import {
  Container,
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Grid
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const theme = createTheme();

function DeleteSong() {
  //const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración
  const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Crear un objeto FormData para enviar los datos del formulario
    const formData = new FormData();
    formData.append('name', data.get('name'));
    const photo_u = data.get('photo_url');
    if (photo_u) {
      formData.append('photo_url', photo_u); // Cambiado a 'photo' para coincidir con el backend
    }
    formData.append('duration', data.get('duration'));
    formData.append('artist', data.get('artist'));
    const file_u = data.get('file_url');

    if (file_u) {
      formData.append('file_url', file_u); // Cambiado a 'photo' para coincidir con el backend
    }


    try {
       // DELETE FROM songs WHERE name =  "${eliminarCancion.name}"
      //   const response = await axios.post(`${pathApi}/create_user`, formData,
      const response = await axios.post(`${pathApi}/"PATH_DE_DeleteSONG EN BACK"`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
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
            Borrar Cancion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoComplete="given-name"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default DeleteSong;