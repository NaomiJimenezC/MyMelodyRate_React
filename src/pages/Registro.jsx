import React from 'react';

const Registro = () => {
    const [nombre, setNombre] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [date, setDate] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [check, setCheck] = React.useState(false);


    const onHandleBlurName = (e) => {
        const value = e.target.value;
        if (value.trim().length === 0) {
            alert("Introduzca un nombre válido")
        } else {
            setNombre(value);
        }
    }

    const handleEmailBlur = (e) => {
        const correo = e.target.value;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (emailRegex.test(correo)) {
            setEmail(correo);
        } else {
            console.log("Por favor, ingrese un email válido.");//TODO(cambiar por una función que lo pinte)
        }
    };

    const handleDateBlur = (e) => {
        const date = e.target.value;
        if (date){
            setDate(date);
        } else {
            console.log("Por favor, ingrese una fecha válida");
        }
    }

    const handlePasswordBlur = (e) => {
        const password = e.target.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

        if (passwordRegex.test(password)) {
            setPassword(password);
        } else {
            console.log("Por favor, ingrese una contraseña de 8 caracteres, con una minúscula, una mayúscula y un número minimo");
        }
    }

    const handleConfirmPasswordBlur = (e) => {
        const confirmPassword = e.target.value;
        if (password !== confirmPassword) {
            console.log("Ingrese la contraseña que ingresaste antes");
        } else  {
            setConfirmPassword(confirmPassword);
        }
    }



    const onHandleSubmit = (e) => {
        e.preventDefault();
        if (check && nombre && email && date && password && confirmPassword) {
            console.log("enviando");
        } else {
            console.log("Rellene correctamente todos los campos")
        }
    }

    return (
        <>
            <section>
                <form onSubmit={onHandleSubmit}>
                    <label>Nombre</label>
                    <input
                        id={"nombre"}
                        name="nombre"
                        type="text"
                        onBlur={onHandleBlurName}
                    />

                    <label>Email</label>
                    <input
                        id={'email'}
                        name={"email"}
                        type="text"
                    />

                    <label>Fecha de nacimiento</label>
                    <input
                        type={"date"}
                        name={"bdDate"}
                        id="bdDate"
                        onBlur={handleDateBlur}
                    />

                    <label>Contraseña</label>

                    <input
                        id={"password"}
                        name={"password"}
                        type="password"
                        onBlur={handlePasswordBlur}
                    />
                    <label>Confirmar contraseña</label>
                    <input
                        id={"password_confirmation"}
                        name={"password_confirmation"}
                        type="password"
                        onBlur={handleConfirmPasswordBlur}
                    />

                    <label>Aceptar términos y condiciones</label>
                    <input
                        type={"checkbox"}
                        name={"agreement"}
                        id="agreement"
                        onClick={()=> setCheck(true)}
                    />

                    <button>Registrarse</button>
                </form>
            </section>

        </>
    );
};

export default Registro;