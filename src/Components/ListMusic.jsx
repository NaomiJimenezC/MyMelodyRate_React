import React from 'react';
import Card from "./Card.jsx";
import "../sass/components/_list_music.scss"

// eslint-disable-next-line react/prop-types
const ListMusic = ({ musics, error, tittle,numberImg,typeOfMusic }) => {
    return (
        <section className={"list-music"}>
            <h1>{tittle}</h1>
            {error && <div>{error}</div>}
            {/* eslint-disable-next-line react/prop-types */}
            {musics.length > 0 ? (
                // eslint-disable-next-line react/prop-types
                musics.map((music) => {
                    const musicId = (typeof music.id !== "undefined") ? music.id : music.track.id;
                    const musicName = (typeof music.name !== "undefined") ? music.name : music.track.name;
                    const musicImage = (typeof music.images !== "undefined") ?  music.images[numberImg].url :
                        music.track.album.images[numberImg].url; // es para las imagenes de las canciones que en el json están de otra manera
                    return (
                        <>
                            <Card
                                id={musicId}
                                name={musicName}
                                image={musicImage}
                                typeOfMusic={typeOfMusic} // a la hora de redirigir artistas va a un lugar distinto
                            />
                        </>
                    );
                })
            ) : (
                <p>Algo fue mal</p>
            )}
        </section>
    );
};

export default ListMusic;