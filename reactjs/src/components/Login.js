import React from 'react';
import {
  Container,
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
const theme = createTheme();

function Login() {
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    //const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración
  const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración

    try {
      const response = await axios.post(`${pathApi}/login`, {
        email: email,
        password: password,
      });
      console.log(response.data);
      if (response.data.id_user!==undefined) {
        
        localStorage.setItem('id_user', response.data.id_user);
        localStorage.setItem('role', response.data.role);
        //alert('Inicio de sesión exitoso');
        //window.location.href = '/home';
        
      }else{
        alert('Usuario o contraseña incorrectos');
      }
      //para guardar el id de la playlist favoritos
      const response2 = await axios.post(`${pathApi}/get_playlist_favorite`, {
        id_user: response.data.id_user
      });
      console.log(response2.data.id_user);
      //se modifico dentro del if response2.data.id_user
      if (response2.data["id_user"]!==undefined) {
        localStorage.setItem('id_favorites', response2.data.id_playlist);
        alert('Inicio de sesión exitoso');
        window.location.href = '/home';
        
      }else{
        alert('No se encontro la playlist favoritos');
      }




    } catch (error) {
      console.error('Error:', error);
  };
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
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sound Stream - Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Box>
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Button variant="text" color="primary" href="/register">
              Regístrate aquí
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
