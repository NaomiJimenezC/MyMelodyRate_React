import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {login} from "../config/Firebase.jsx";
import {UserContext} from "../Context/UserProvider.jsx";

const InicioDeSesion = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error,setError] = React.useState('');

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        user && navigate('/user');
    },[user])

    const handleEmailBlur = (e) => {
        const correo = e.target.value;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (emailRegex.test(correo)) {
            setEmail(correo);
        } else {
            setError("Por favor, ingrese un email válido.");
            console.log(error);//TODO(cambiar por una función que lo pinte)
        }
    };

    const handlePasswordBlur = (e) => {
        const password = e.target.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

        if (passwordRegex.test(password)) {
            setPassword(password);
            setError("")
        } else {
            setError("Por favor, ingrese una contraseña de 8 caracteres, con una minúscula, una mayúscula y un número minimo");
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({email, password});
            console.log('login successful');
        } catch (error) {
            setError(error.message);
            console.log(error);

        }
    }

    return (
        <section>
            <article>
                <form onSubmit={handleSubmit}>
                    <label id={"email"} >Email</label>
                    <input
                        id={"email"}
                        name={"email"}
                        placeholder={"Email"}
                        value={email}
                        onBlur={handleEmailBlur}
                    />
                    <label id={"password"}>Password</label>
                    <input
                        id={"password"}
                        type="password"
                        name={"password"}
                        value={password}
                        onBlur={handlePasswordBlur}
                    />

                    <button type="submit">Iniciar sesión</button>
                </form>
            </article>

            <article>
                <h2>¿No tienes cuenta? ¡Únete a nosotros!</h2>
                <button onClick={()=> navigate("/sign_up")}>¡Únete!</button>
            </article>
        </section>
    );
};

export default InicioDeSesion;