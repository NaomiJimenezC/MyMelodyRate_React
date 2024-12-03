import React, {useCallback, useEffect, useState} from 'react';
import Card from "../Components/Card.jsx";
import CardArtist from "../Components/CardArtist.jsx";
import {hacerSolicitud} from "../config/Spotify.jsx";
import {getAuth} from "firebase/auth";
import ListMusic from "../Components/ListMusic.jsx";

const Home = () => {
    const [albums, setAlbums] = useState([]); // Estado para almacenar los álbumes
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [error, setError] = useState(null); // Estado para almacenar errores


    useEffect(() => {
        // Llamamos a la función getNewAlbums con el callback
        getNewAlbums().then(r =>{
            setAlbums(r.albums.items)
        } );

        getTopSongs().then(r =>{
            setSongs(r.items)
        })

        getTopArtists().then(r =>{
            setArtists(r)
        })

    }, []);  // Dependencia de handleNewAlbums

    return (
        <>
            <ListMusic
                musics={albums}
                error={error}
                tittle={"Álbumnes"}
                numberImg={0}
                typeOfMusic={"album"}
            />

            <ListMusic
                musics={songs}
                error={error}
                tittle={"Canciones más populares"}
                numberImg={1}
                typeOfMusic={"track"}
            />

            <ListMusic
                musics={artists}
                error={error}
                tittle={"Artistas del momento"}
                numberImg={1}
                typeOfMusic={"artist"}
            />

        </>
    );
};

export default Home;



const getNewAlbums = async () => {
    try {
        return await hacerSolicitud("https://api.spotify.com/v1/browse/new-releases?limit=5");
    } catch (error) {
        // setError(error);
        console.error("Error al obtener nuevos álbumes:", error);
        throw error; // Vuelve a lanzar el error si necesitas manejarlo aguas arriba
    }
};

const getTopSongs = async () => {
    try {
        return await hacerSolicitud('https://api.spotify.com/v1/playlists/2z7k6r8z0OlXuDsIuy80ZN/tracks?' +
            'fields=items%28track%28id%2Cname%2Chref%2Calbum%28name%2Chref%2Cimages%29%29%29&limit=5')
    } catch (error) {
        console.error("Error al obtener las canciones")
        throw error;
    }
}

const getTopArtists = async () => {
    try {
        const response = await hacerSolicitud("https://api.spotify.com/v1/playlists/2z7k6r8z0OlXuDsIuy80ZN/tracks?" +
            "fields=items(track(artists(id)))&limit=5");

        const artistIds = response.items.map(item => item.track.artists[0].id);
        const uniqueArtistIds = [...new Set(artistIds)];

        const artistsInfo = await hacerSolicitud(`https://api.spotify.com/v1/artists?ids=${uniqueArtistIds.join(',')}`);

        return artistsInfo.artists.map(artist => ({
            id: artist.id,
            name: artist.name,
            images: artist.images
        }));
    } catch (error) {

        console.error("Error al obtener los artistas", error);
        throw error;
    }
}
