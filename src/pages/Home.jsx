import React, {useCallback, useEffect, useState} from 'react';
import Card from "../Components/Card.jsx";
import CardArtist from "../Components/CardArtist.jsx";
import {hacerSolicitud} from "../config/Spotify.jsx";
import {getAuth} from "firebase/auth";

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
            console.log(r)
            setArtists(r)
        })

    }, []);  // Dependencia de handleNewAlbums

    return (
        <>
            <section className="album">
                {error && <div>{error}</div>}
                {
                    albums.length > 0 ? (
                        albums.map((album) => (
                            <article key={album.id}>
                                <img src={album.images[1].url} alt={album.name}/>
                                <p>{album.name}</p>
                            </article>
                        ))
                    ) : (
                        <p>No se han encontrado álbumes.</p>
                    )
                }
            </section>

            <section className="canciones">
                {error && <div>{error}</div>}
                {

                    songs.length > 0 ? (
                        songs.map((song) => (
                            <article key={song.id}>
                                <img src={song.track.album.images[2].url} alt={song.name}/>
                                <p>{song.track.name}</p>
                            </article>
                        ))
                    ) : (
                        <p>No se han encontrado álbumes.</p>
                    )
                }
            </section>
            <section className="artistas">
                {error && <div>{error}</div>}
                {

                    artists.length > 0 ? (
                        artists.map((artist) => (
                            <article key={artist.id}>
                                <img src={artist.images[2].url} alt={artist.name}/>
                                <p>{artist.name}</p>
                            </article>
                        ))
                    ) : (
                        <p>No se han encontrado álbumes.</p>
                    )
                }
            </section>
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
        return await hacerSolicitud("https://api.spotify.com/v1/playlists/2z7k6r8z0OlXuDsIuy80ZN/tracks?" +
            "fields=items%28track%28name%2Cid%2Calbum%28images%29%29%29&limit=5")
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
