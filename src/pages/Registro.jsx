import React, {useContext, useEffect} from 'react';
import {login, register} from "../config/Firebase.jsx";
import {UserContext} from "../Context/UserProvider.jsx";
import {useNavigate} from "react-router-dom";

const Registro = () => {
    const [nombre, setNombre] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [date, setDate] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [check, setCheck] = React.useState(false);
    const [valid, setValid] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user)
        user && navigate('/user');
    },[user])

    const onHandleBlurName = (e) => {
        const value = e.target.value;
        if (value.trim().length === 0) {
            alert("Introduzca un nombre válido")
        } else {
            setNombre(value);
        }
        checkValidity()
    }

    const handleEmailBlur = (e) => {
        const correo = e.target.value;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (emailRegex.test(correo)) {
            setEmail(correo);
        } else {
            console.log("Por favor, ingrese un email válido.");//TODO(cambiar por una función que lo pinte)
        }
        checkValidity()
    };

    const handleDateBlur = (e) => {
        const date = e.target.value;
        if (date){
            setDate(date);
        } else {
            console.log("Por favor, ingrese una fecha válida");
        }
        console.log(date);
    }

    const handlePasswordBlur = (e) => {
        const password = e.target.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

        if (passwordRegex.test(password)) {
            setPassword(password);
        } else {
            console.log("Por favor, ingrese una contraseña de 8 caracteres, con una minúscula, una mayúscula y un número minimo");
        }
        checkValidity()
    }

    const handleConfirmPasswordBlur = (e) => {
        const confirmPassword = e.target.value;

        password !== confirmPassword ?
            console.log("Ingrese la contraseña que ingresaste antes") : setConfirmPassword(confirmPassword);
        checkValidity()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (valid){
            try {
                await register({email, password});
                console.log('login successful');
            } catch (error) {
                console.log(error.code);
                console.log(error.message);
            }
        } else {
            console.log("completa los datos del formulario")
        }

    }

    const onHandleCheckClick = (e) => {
        const valorCheck = e.currentTarget.checked;
        if (valorCheck) {
            setCheck(valorCheck);
        } else {
            setCheck(valorCheck);
        }
        checkValidity()
    }

    const checkValidity = () => {
        if (check && nombre && email && date && password && confirmPassword) {
            setValid(true);
        }
    }

    return (
        <>
            <main>
                <form className={"form-registro"} onSubmit={handleSubmit}>
                    <fieldset className={"form-registro"}>
                        <label className={"campo-label"}>Nombre</label>
                        <input
                            className={"campo-input"}
                            id={"nombre"}
                            name="nombre"
                            type="text"
                            onBlur={onHandleBlurName}
                        />
                    </fieldset>

                    <fieldset className={"form-campo"}>
                        <label className={"campo-label"}>Email</label>
                        <input
                            className={"campo-input"}
                            id={'email'}
                            name={"email"}
                            type="text"
                            onBlur={handleEmailBlur}
                        />
                    </fieldset>

                    <fieldset className={"form-campo"}>
                        <label className={"campo-label"}>Fecha de nacimiento</label>
                        <input
                            className={"campo-input"}
                            type={"date"}
                            name={"bdDate"}
                            id="bdDate"
                            onBlur={handleDateBlur}
                        />
                    </fieldset>

                    <fieldset className={"form-campo"}>
                        <label className={"campo-label"}>Contraseña</label>
                        <input
                            className={"campo-input"}
                            id={"password"}
                            name={"password"}
                            type="password"
                            onBlur={handlePasswordBlur}
                        />
                    </fieldset>

                    <fieldset className={"form-campo"}>
                        <label className={"campo-label"}>Confirmar contraseña</label>
                        <input
                            className={"campo-input"}
                            id={"password_confirmation"}
                            name={"password_confirmation"}
                            type="password"
                            onBlur={handleConfirmPasswordBlur}
                        />
                    </fieldset>

                    <fieldset className={"form-campo"}>
                        <label className={"campo-label"}>Aceptar términos y condiciones</label>
                        <input
                            className={"campo-input"}
                            type={"checkbox"}
                            name={"agreement"}
                            id="agreement"
                            onClick={onHandleCheckClick}
                        />
                    </fieldset>

                    <button
                        type="submit"
                        className={valid ? "form-button-enable": "form-button-disable"}
                        disabled={valid}
                    >Registrarse
                    </button>
                </form>
            </main>

        </>
    );
};

export default Registro;