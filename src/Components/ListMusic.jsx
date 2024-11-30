import React from 'react';
import Card from "./Card.jsx";

// eslint-disable-next-line react/prop-types
const ListMusic = ({ musics, error, tittle,numberImg }) => {
    return (
        <section>
            <h1>{tittle}</h1>
            {error && <div>{error}</div>}
            {musics.length > 0 ? (
                // eslint-disable-next-line react/prop-types
                musics.map((music) => {
                    console.log(music.images[numberImg].url); // Para depurar
                    return (
                        <>
                            <Card
                                key={music.id}
                                name={music.name}
                                images={music.images[numberImg].url}
                            />
                            <img src={music.images[numberImg].url} alt={music.name} style={{width: '10%'}} />
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