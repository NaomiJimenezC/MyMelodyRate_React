import React, {useContext, useEffect} from 'react';
import {UserContext} from "../Context/UserProvider.jsx";
import {useNavigate} from "react-router-dom";
import Card from "../Components/Card.jsx";
import "../sass/components/_list_music.scss"

const Perfil = () => {
    const {user} = useContext(UserContext);
    const {favoriteSongs, favoriteAlbums,favoriteArtist} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        !user && navigate('/login');
    },[user])

    console.log(user);
    return (
        <main>
            <section>
                <h1>{user.displayName}</h1>
            </section>
            <section className={"list-music"}>
                <h1>Álbumnes favoritos</h1>
                {favoriteAlbums.length === 0 ? <p> No hay álbumnes favoritos</p> :
                favoriteSongs.map((song) => {
                    const {id,name,image,type} = song;
                    return (
                        <Card
                        id={id}
                        name={name}
                        image={image}
                        typeOfMusic={type}
                        />
                    )
                })}
            </section>
            <section className={"list-music"}>
                <h1>Canciones favoritas</h1>
                {favoriteAlbums.length === 0 ? <p> No hay álbumnes favoritos</p> :
                    favoriteSongs.map((song) => {
                        const {id,name,image,type} = song;
                        return (
                            <Card
                                id={id}
                                name={name}
                                image={image}
                                typeOfMusic={type}
                            />
                        )
                    })}
            </section>
            <section className={"list-music"}>
                <h1>Artistas favoritos</h1>
                {favoriteArtist.length === 0 ? <p> No hay álbumnes favoritos</p> :
                    favoriteSongs.map((song) => {
                        const {id,name,image,type} = song;
                        return (
                            <Card
                                id={id}
                                name={name}
                                image={image}
                                typeOfMusic={type}
                            />
                        )
                    })}
            </section>
        </main>
    );
};

export default Perfil;