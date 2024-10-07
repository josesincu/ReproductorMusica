import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid
} from '@mui/material';
import Navbar from './Navbar';

function Account() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [photo, setPhoto] = useState('');

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email:'',
    photo_url: null
  });
  
  const userId = localStorage.getItem('id_user');

  const pathApi = 'http://loadbalancer1-semi1-A-G7-c7464ad890b693e1.elb.us-east-1.amazonaws.com'; // Ajusta el pathApi según tu configuración

  useEffect(() => {
    if (userId) {
      axios.get(`${pathApi}/get_user`,{ params: { id_user: userId } })
        .then(response => {
          let data = response.data;
          
          setName(data.name);
          setLastName(data.last_name);
          setEmail(data.email);
          setDateOfBirth(data.date_of_birth);
          setPhoto(data.photo_url);
          
        })
        .catch(error => {
          console.error('Error fetching user', error);
        });
    }
  }, [userId]);

//evento para controlar imagen archivo
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  //modificar datos usuario
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    
    const data = new FormData();
    data.append('id_user', userId);
    data.append('name', formData.name);
    data.append('last_name', formData.last_name);
    data.append('email', formData.email);
    if (formData.photo_url) {
      data.append('photo', formData.photo_url);
    }

    try {
      
      const response = await axios.put(`${pathApi}/update_user`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      //console.log(response);
      setSnackbarMessage('Usuario actualizada correctamente!!!');
      setSnackbarOpen(true);
     
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('Error al modificar usuario');
      setSnackbarOpen(true);
    } finally {
      setOpenCreateDialog(false);
      setFormData({
        name: '',
        last_name: '',
        email:'',
        photo_url: null
      });
    }
  };//fin de modifcar usuario
  
//evento para redireccionar a logout
const handleRedirect = () => {
  navigate('/login');
};


  return (
    <Box sx={{ display: 'flex', backgroundColor: '#121212', height: '100vh' }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: 3, marginLeft: 2, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 3 }}>
            Mi Cuenta
          </Typography>
          {/* boton para modificar datos usuario*/}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#9b51e0',
              color: 'white',
              '&:hover': {
                backgroundColor: '#7a3bb2',
              },
            }}
            onClick={() => setOpenCreateDialog(true)}
          >
            Modificar Datos
          </Button>

          {/* Imagen de perfil*/}
          <Avatar alt={name} src={photo} sx={{ width: 56, height: 56 }} />
          {/* boton para cerrar session */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#9b51e0',
              color: 'white',
              '&:hover': {
                backgroundColor: '#7a3bb2',
              },
            }}
            onClick={handleRedirect}
          >
            Cerrar Sesion
          </Button>

          
        </Box>
        
        <Dialog
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
        >
          <DialogTitle>Datos Nuevos</DialogTitle>
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
                id="last_name"
                label="Apellido"
                name="last_name"
                autoComplete="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electronico"
                name="email"
                autoComplete="email"
                value={formData.email}
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
                  name="photo_url"
                  onChange={handleChange}
                />
              </Button>
              <DialogActions>
                <Button onClick={() => {
                  setOpenCreateDialog(false);
                  setFormData({
                    name: '',
                    last_name: '',
                    email:'',
                    photo: null
                  });
                }} 
                color="primary">
                  Cancelar
                </Button>
                <Button type="submit" color="secondary">
                  Guardar
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
        
      <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          disabled
          id="outlined-disabled"
          label="Nombre"
          value={name}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          disabled
          id="outlined-disabled"
          label="Apellido"
          value={lastName}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          disabled
          id="outlined-disabled"
          label="Correo"
          value={email}
          fullWidth

        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          disabled
          id="outlined-disabled"
          label="Fecha Nacimiento"
          value={dateOfBirth}
          fullWidth

        />
      </Grid>
      
    </Grid>
    
    </Box>
      
    </Box>
  );
}

export default Account;
