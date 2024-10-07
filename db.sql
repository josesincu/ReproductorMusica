-- USE practica1;

CREATE TABLE playlists 
    (
     id_playlist INTEGER NOT NULL , 
     name CHAR (100) NOT NULL , 
     description CHAR (255) , 
     photo_url CHAR (255),
     id_user INTEGER NOT NULL 
    );

ALTER TABLE playlists ADD CONSTRAINT playlists_PK PRIMARY KEY CLUSTERED (id_playlist);

CREATE TABLE songs 
    (
     id_song INTEGER NOT NULL , 
     name CHAR (100) , 
     photo_url CHAR (255) , 
     duration TIME , 
     artist CHAR (100) , 
     file_url CHAR (255) 
    );

ALTER TABLE songs ADD CONSTRAINT songs_PK PRIMARY KEY CLUSTERED (id_song);

-- NUEVA TABLA GENERERADA
CREATE TABLE song_playlist(
id_song_playlist INTEGER NOT NULL,
is_favorite BOOLEAN NOT NULL,
id_song INTEGER NOT NULL,
id_playlist INTEGER NOT NULL

);

ALTER TABLE song_playlist ADD CONSTRAINT song_playlist_PK PRIMARY KEY CLUSTERED (id_song_playlist);



CREATE TABLE users 
    (
     id_user INTEGER NOT NULL , 
     name CHAR (200) NOT NULL , 
     last_name CHAR (200) , 
     photo_url CHAR (255) NOT NULL , 
     email CHAR (50) NOT NULL , 
     password CHAR (255) NOT NULL , 
     date_of_birth DATE , 
     role CHAR (20) 
    );

ALTER TABLE users ADD CONSTRAINT users_PK PRIMARY KEY CLUSTERED (id_user);

ALTER TABLE song_playlist 
    ADD CONSTRAINT song_playlist_songs_FK FOREIGN KEY 
    ( 
     id_song
    ) 
    REFERENCES songs 
    ( 
     id_song 
    )
    
;

ALTER TABLE song_playlist 
    ADD CONSTRAINT song_playlist_playlists_FK FOREIGN KEY 
    ( 
     id_playlist
    ) 
    REFERENCES playlists 
    ( 
     id_playlist 
    ) ON DELETE CASCADE;
   
   
ALTER TABLE playlists 
ADD CONSTRAINT playlists_FK FOREIGN KEY 
    ( 
     id_user
    ) 
REFERENCES users
    ( 
     id_user 
    );
   
   
 
    
-- Eliminar restricciones de clave foránea en playlists
ALTER TABLE song_playlist DROP FOREIGN KEY song_playlist_songs_FK;
ALTER TABLE song_playlist DROP FOREIGN KEY song_playlist_playlists_FK;
ALTER TABLE playlists DROP FOREIGN KEY playlists_FK;

-- Modificar columnas para ser autoincrementables
ALTER TABLE users MODIFY id_user INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE songs MODIFY id_song INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE playlists MODIFY id_playlist INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE song_playlist MODIFY id_song_playlist INTEGER NOT NULL AUTO_INCREMENT;

-- Volver a agregar las restricciones de clave foránea
ALTER TABLE song_playlist
    ADD CONSTRAINT song_playlist_songs_FK FOREIGN KEY (id_song) REFERENCES songs(id_song);
ALTER TABLE song_playlist
    ADD CONSTRAINT song_playlist_playlists_FK FOREIGN KEY (id_playlist) REFERENCES playlists(id_playlist) ON DELETE CASCADE;
ALTER TABLE playlists
    ADD CONSTRAINT playlists_FK FOREIGN KEY (id_user) REFERENCES users(id_user);

/*
 * 
 * Eliminacion de tablas
 *
 * 
 * **/
DROP TABLE IF EXISTS song_playlist;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS users;
