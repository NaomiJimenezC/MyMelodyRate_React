import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../config/Firebase.jsx";
import { UserContext } from "../Context/UserProvider.jsx";

const InicioDeSesion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/user');
    }, [user, navigate]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validateEmail = () => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            setError("Por favor, ingrese un email válido.");
            return false;
        }
        return true;
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula y un número.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail() || !validatePassword()) return;

        try {
            await login({ email, password });
            console.log('Login successful');
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    return (
        <section>
            <article>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={validateEmail}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={validatePassword}
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Iniciar sesión</button>
                </form>
            </article>

            <article>
                <h2>¿No tienes cuenta? ¡Únete a nosotros!</h2>
                <button onClick={() => navigate("/sign_up")}>¡Únete!</button>
            </article>
        </section>
    );
};

export default InicioDeSesion;
