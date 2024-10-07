# Semi1-A-2S2024-Grupo7-Practica1


### Versiones

Versión de backend desarrollado en NodeJs   20.16.0
Versión de backend desarrollado en Flask     3.12.5


### Rutas  de Python Flask: Puerto a usar 4000

#### Usuarios
---

##### Obtener Usuario
Endpoint
```code
GET: localhost:4000/get_user
```
Application
```json
{
  "id_user": 1
}
```
Response
```json
{
  "name": "John",
  "last_name": "Doe",
  "photo_url": "http://example.com/photo.jpg",
  "email": "john.doe@example.com",
  "date_of_birth": "01/01/1990"
}
```
Response Error
```json
{
  "message": "Usuario no encontrado"
}
```

##### Loguear Usuario
Endpoint
```code
POST: localhost:4000/login
```
Application
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```
Response
```json
{
  "id_user": 1,
  "role": "user"
}
```
Response Error
```json
{
    "message": "Mensaje de Error"
}
```

##### Crear Usuario
Endpoint
```code
POST: localhost:4000/create_user
```
Application multipart/form-data
```code
Body:
  name: Nombre del usuario.
  last_name: Apellido del usuario.
  email: Correo electrónico del usuario.
  password: Contraseña del usuario.
  date_of_birth: Fecha de nacimiento del usuario (en formato 'YYYY-MM-DD').
  role: Rol del usuario.
Files:
  photo (File)
```
Response
```json
{
    "message": "Usuario y playlist creados con éxito"
}
```
Response Error
```json
{
    "message": "Error al crear el usuario y la playlist"
}
```

#### Canciones
---

##### Obtener Todas las Canciones
Endpoint
```code
GET: localhost:4000/get_songs
```
Response
```json
[
    {
        "id_song": 1,
        "name": "Song 1",
        "photo_url": "http://example.com/image1.jpg",
        "duration": "03:30",
        "artist": "Artist 1",
        "file_url": "http://example.com/song1.mp3"
    }
]
```

##### Crear Cancion 
Endpoint
```code
POST: localhost:4000/create_song
```
Application multipart/form-data
```code
Body:
  name (Text)
  duration (Text)
  artist (Text)
Files:
  file_url (File)
  photo_url (File)
```
Response
```json
{
    "id_song": 1
}
```
Response Error
```json
{
    "error": "Mensaje de Error"
}
```

##### Eliminar Cancion 
Endpoint
```code
DELETE: localhost:4000/delete_song
```
Application
```json
{
    "id_song": 1
}
```
Response
```json
{
    "message": "Song deleted"
}
```
Response Error
```json
{
    "error": "Mensaje de Error"
}
```

##### Actualizar Cancion 
Endpoint
```code
PUT: localhost:4000/update_song
```
Application
```json
{
  "id_song": 1,       
  "name": "Nuevo nombre de la canción",     
  "duration": "HH:MM:SS", 
  "artist": "Nuevo nombre del artista"  
}
```
Response
```json
{
  "id_song": 1,       // Obligatorio: ID de la canción que se desea actualizar
  "name": "Nuevo nombre de la canción",     // Opcional: Nuevo nombre de la canción
  "duration": "HH:MM:SS",  // Opcional: Nueva duración de la canción en formato HH:MM:SS
  "artist": "Nuevo nombre del artista"     // Opcional: Nuevo nombre del artista
}
```
Response Error
```json
{
    "error": "Mensaje de Error"
}
```

#### Playlists
---
##### Agregar Cancion a un playlist
Endpoint
```code
POST: localhost:4000/playlist_song
```
Application
```json
{
  "id_song": 1,        // Obligatorio: ID de la canción que se desea asociar a la playlist
  "id_playlist": 2,    // Obligatorio: ID de la playlist a la que se desea agregar la canción
  "is_favorite": true  // Obligatorio: Indicador de si la canción es favorita en la playlist (true o false)
}
```
Response
```json
{
  "message": "Playlist-Song relation created",
  "id": 1  // ID de la relación creada en la tabla playlist_songs
}
```
Response Error
```json
{
    "error": "Mensaje de Error"
}
```

##### Obtener canciones de una playlist
Endpoint
```code
POST: localhost:4000/get_songsPlaylist
```
Application
```json
{
  "id_playlist": 2  // Obligatorio: ID de la playlist de la cual se desean obtener las canciones
}

```
Response
```json
[
  {
      "id_song": 1,
      "name": "Nombre de la canción",
      "artist": "Nombre del artista",
      "duration": "HH:MM:SS",  // Duración en formato string
      "file_url": "URL del archivo de la canción",
      "photo_url": "URL de la imagen de la canción",
      "is_favorite": true  // Indicador de si la canción es favorita en la playlist
  },
  // ... otras canciones
]
```
Response Error
```json
{
    "error": "Mensaje de Error"
}
```

##### Eliminar cancion de una playlist
Endpoint
```code
DELETE: localhost:4000/delete_playlist_song
```
Application
```json
{
  "id_song": 1,        // Obligatorio: ID de la canción que se desea eliminar de la playlist
  "id_playlist": 2     // Obligatorio: ID de la playlist de la cual se desea eliminar la canción
}

```
Response
```json
{
  "message": "Song removed from playlist"
}
```
Response Error
```json
{
    "error": "Mensaje de Error"
}
```

##### Obtener todas las playlists (Este endpoint no se usa en el front opcional hacer)
Endpoint
```code
GET: localhost:4000/get_playlists
```

Response
```json
[
  {
      "id_playlist": 1,
      "name": "Nombre de la playlist",
      "description": "Descripción de la playlist",
      "photo_url": "URL de la foto de la playlist",
      "id_user": 1  // ID del usuario que creó la playlist
  },
  // ... otras playlists
]

```


##### Obtener todas las playlist de un  usuario
Endpoint
```code
POST: localhost:4000/get_playlists_u
```
Application
```json
{
  "id_user": 1  // Obligatorio: ID del usuario cuyas playlists se desean obtener
}

```
Response
```json
[
  {
      "id_playlist": 1,
      "name": "Nombre de la playlist",
      "description": "Descripción de la playlist",
      "photo_url": "URL de la foto de la playlist",
      "id_user": 1  // ID del usuario que creó la playlist
  },
  // ... otras playlists
]
```
Response Error
```json
{
    "error": "Mensaje de Error"
}


##### Crear playlists
Endpoint
```code
POST: localhost:4000/create_playlist
```
Application multipart/form-data
```code
Body:
  name: Nombre de la playlist.
  description: Descripción de la playlist.
  id_user: ID del usuario que crea la playlist.
Files:
  photo (File)
```
Response
```json
{
  "id_playlist": 1,
  "name": "Nombre de la playlist",
  "description": "Descripción de la playlist",
  "photo_url": "URL de la foto de la playlist",
  "id_user": 1  // ID del usuario que creó la playlist
}
```
Response Error
```json
{
    "error": "Mensaje de Error"
}
```

##### Obtener una Playlist

Endpoint
```code
POST: localhost:4000/get_playlist
```
Application 
```json
{
  "id_playlist": 1  // Obligatorio: ID de la playlist cuya información se desea obtener
}
```
Response
```json
{
  "id_playlist": 1,
  "name": "Nombre de la playlist",
  "description": "Descripción de la playlist",
  "photo_url": "URL de la foto de la playlist",
  "id_user": 1  // ID del usuario que creó la playlist
}
```
Response Error
```json
{
    "error": "Mensaje de Error"
}
```

##### Eliminar una playlist
Endpoint
```code
DELETE: localhost:4000/delete_playlist
```
Application 
```json
{
  "id_playlist": 1  // Obligatorio: ID de la playlist que se desea eliminar
}
```
Response
```json
{
  "message": "Playlist and associated songs deleted"
}

```
Response Error
```json
{
  "message": "An error occurred"
}
```

##### Obtener playlist favoritos para saber que id tiene la playlist de favoritos de ese usuario
Endpoint
```code
POST: localhost:4000/get_playlist_favorite
```
Application 
```json
{
  "id_user": 1  // Obligatorio: ID del usuario para el que se desea obtener la playlist de favoritos
}

```
Response
```json
{
  "id_playlist": 1,
  "name": "favorites-1",
  "description": "Descripción de la playlist de favoritos",
  "photo_url": "URL de la foto de la playlist",
  "id_user": 1  // ID del usuario que creó la playlist
}


```
Response Error
```json
{
  "message": "Playlist no encontrada"
}

```