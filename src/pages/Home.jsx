import React from 'react';
import Card from "../Components/Card.jsx";
import CardArtist from "../Components/CardArtist.jsx";

import { useState, useEffect } from 'react';
import {hacerSolicitud} from "../config/Spotify.jsx";

const Home = () => {
    const [artists, setArtists] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const fetchedArtists = await popularArtist();
                setArtists(fetchedArtists);
            } catch (error) {
                console.error('Error:', error);
                setError('Error al cargar los artistas');
            }
        };
        fetchArtists();
        console.log(pruebaAPISPotify);
    }, []);

    return (
        <>
            {getTopArtist()}
            <section className="canciones">
                {error ? (
                    <p>{error}</p>
                ) : (
                    artists.map((artista, index) => (
                        <article key={index}>
                            <img src={artista.image[0]['#text']} alt={artista.name}/>
                            <p>{artista.name}</p>
                        </article>
                    ))
                )}
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



const pruebaAPISPotify = hacerSolicitud("https://api.spotify.com/v1/browse/new-releases");


export const getTopTracks = () => {
    //https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${import.meta.env.VITE_LAST_FM_API_KEY}&format=json
    fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=${import.meta.env.VITE_LAST_FM_API_KEY}&format=json`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching toptracks tracks:', error));
}

const getTopArtist = () => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${import.meta.env.VITE_LAST_FM_API_KEY}&format=json`)
        .then(res => res.json())
    .then(data => console.log(data))
}

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
