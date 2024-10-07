
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Playlist from './components/Playlist';
import SongsPlaylist from './components/SongsPlaylist';
import CreateSong from './components/CreateSong';
import Account from './components/Account'
import Favorites from './components/Favorites';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c27b0', // Morado
    },
    background: {
      default: '#121212', // Color de fondo oscuro
      paper: '#1e1e1e', // Color de fondo de los papeles
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/playlists" element={<Playlist />} />
        <Route path="/songsPlaylist/:id" element={<SongsPlaylist />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/add-song" element={<CreateSong />} />
        <Route path="/account" element={< Account/>} />
        <Route path="/" element={<Login />} /> {/* Redirige a login por defecto */}
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
