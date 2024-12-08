import React, {useContext, useEffect} from 'react';
import {UserContext} from "../Context/UserProvider.jsx";
import {useNavigate} from "react-router-dom";

const Perfil = () => {
    const {user} = useContext(UserContext);
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
            <section>
                <h1>Álbumnes favoritos</h1>
            </section>
            <section>
                <h1>Canciones favoritas</h1>
            </section>
            <section>
                <h1>Artistas favoritos</h1>
            </section>
        </main>
    );
};

export default Perfil;