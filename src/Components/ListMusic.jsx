import React from 'react';
import Card from "./Card.jsx";

// eslint-disable-next-line react/prop-types
const ListMusic = ({ musics, error, tittle,numberImg }) => {
    return (
        <section>
            <h1>{tittle}</h1>
            {error && <div>{error}</div>}
            {musics.length > 0 ? (
                // console.log(music.track.album.images[numberImg].url);// Para depurar
                // console.log(music.track.name);

                // eslint-disable-next-line react/prop-types
                musics.map((music) => {
                    const musicName = (typeof music.name !== "undefined") ? music.name : music.track.name;
                    const musicImage = (typeof music.images !== "undefined") ?  music.images[numberImg].url :
                        music.track.album.images[numberImg].url; // es para las imagenes de las canciones que en el json están de otra manera


                    return (
                        <>
                            <Card
                                key={music.id}
                                name={musicName}
                                image={musicImage}
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