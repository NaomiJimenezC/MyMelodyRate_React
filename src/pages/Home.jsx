import React, {useCallback, useEffect, useState} from 'react';
import Card from "../Components/Card.jsx";
import CardArtist from "../Components/CardArtist.jsx";
import {hacerSolicitud} from "../config/Spotify.jsx";

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
            console.log(r)
        })

        getTopArtists().then(r =>{
            console.log(r)
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
                                <p>{album.name}</p>
                                <img src={album.images[0].url} alt={album.name} />
                            </article>
                        ))
                    ) : (
                        <p>No se han encontrado álbumes.</p>
                    )
                }
            </section>

            <section className="canciones">
                <Card/>
                <Card/>
                <Card/>
            </section>
            <section className="artistas">
                <CardArtist/>
                <CardArtist/>
                <CardArtist/>
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
        return await hacerSolicitud("https://open.spotify.com/playlist/2z7k6r8z0OlXuDsIuy80ZN")
    } catch (error) {
        console.error("Error al obtener las canciones")
        throw error;
    }
}

const getTopArtists = async () => {}
