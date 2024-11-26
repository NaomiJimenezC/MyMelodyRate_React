import React, {useCallback, useEffect, useState} from 'react';
import Card from "../Components/Card.jsx";
import CardArtist from "../Components/CardArtist.jsx";
import {hacerSolicitud} from "../config/Spotify.jsx";

const Home = () => {
    const [albums, setAlbums] = useState([]); // Estado para almacenar los álbumes
    const [error, setError] = useState(null); // Estado para almacenar errores

    // Función de manejo de álbumes (callback)
    const handleNewAlbums = useCallback((newAlbums) => {
        if (newAlbums.error) {
            setError('Hubo un error al obtener los álbumes');
        } else {
            // Asegúrate de que newAlbums contiene los datos correctos
            setAlbums(newAlbums.albums.items);  // Asegúrate de acceder a `items`
        }
    }, []); // El array de dependencias está vacío, por lo que la función se memorizza

    useEffect(() => {
        // Llamamos a la función getNewAlbums con el callback
        getNewAlbums(handleNewAlbums).then(r =>{
            console.log(r.albums.items);
            setAlbums(r.albums.items)
        } );
    }, [handleNewAlbums]);  // Dependencia de handleNewAlbums



    return (
        <>
            <section className="canciones">
                {error && <div>{error}</div>} {/* Mostrar error si lo hay */}
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


const getTopArtist = () => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${import.meta.env.VITE_LAST_FM_API_KEY}&format=json`)
        .then(res => res.json())
    .then(data => console.log(data))
}

const getNewAlbums = async () => {
    try {
        return await hacerSolicitud("https://api.spotify.com/v1/browse/new-releases");
    } catch (error) {
        console.error("Error al obtener nuevos álbumes:", error);
        throw error; // Vuelve a lanzar el error si necesitas manejarlo aguas arriba
    }
};


export const popularArtist = async () => {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${import.meta.env.VITE_LAST_FM_API_KEY}&format=json`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return (data.topartists.artist) ;
    } catch (error) {
        console.error('Error fetching popular artists:', error);
        throw error;
    }
};
{/*{error ? (*/}
{/*    <p>{error}</p> // Muestra el mensaje de error si existe*/}
{/*) : !playlists || playlists.length === 0 ? (*/}
{/*    <p>No se encontraron canciones.</p> // Mensaje si no hay canciones disponibles*/}
{/*) : (*/}
{/*    playlists.map((album) => (*/}
{/*        <article key={album.id}> /!* Usa un ID único si está disponible *!/*/}
{/*            <p>{album.name}</p> /!* Asumiendo que cada álbum tiene un atributo "name" *!/*/}
{/*            {album.artists && (*/}
{/*                <p>Artista: {album.artists.map((artist) => artist.name).join(", ")}</p>*/}
{/*            )}*/}
{/*        </article>*/}
{/*    ))*/}
{/*)}*/}