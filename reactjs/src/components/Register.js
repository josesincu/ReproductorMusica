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

function Register() {

  const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración
  //const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Crear un objeto FormData para enviar los datos del formulario
    const formData = new FormData();
    formData.append('name', data.get('firstName'));
    formData.append('last_name', data.get('lastName'));
    formData.append('email', data.get('email'));
    formData.append('password', data.get('password'));
    formData.append('date_of_birth', data.get('birthDate'));
    formData.append('role', 'admin');

    // Añadir la imagen al FormData
    const photo = data.get('photo');
    if (photo) {
      formData.append('photo', photo); // Cambiado a 'photo' para coincidir con el backend
    }

    try {
      const response = await axios.post(`${pathApi}/create_user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('Usuario creado correctamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el usuario');
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
            Registro de Usuario
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Nombres"
              name="firstName"
              autoComplete="given-name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Apellidos"
              name="lastName"
              autoComplete="family-name"
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
                name="photo"
              />
            </Button>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Contraseña"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="birthDate"
              label="Fecha de Nacimiento"
              name="birthDate"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
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
        <Grid container justifyContent="center">
          <Grid item>
            <Button component="a" href="/login" variant="text" color="primary">
              Ya tengo una cuenta
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
