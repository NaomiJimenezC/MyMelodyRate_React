import React from 'react';

const Registro = () => {
    return (
        <>
            <form>
                <label>Nombre</label>
                <input/>
                <label>Identificador</label>
                <input/>
                <label>Email</label>
                <input/>
                <label>Confirmar Email</label>
                <input/>
                <label>Contraseña</label>
                <input/>
                <label>Confirmar contraseña</label>
                <input/>
                <label>Aceptar términos y condiciones</label>
                <input type={"checkbox"}/>
                <button><Registrarse></Registrarse></button>
            </form>
        </>
    );
};

export default Registro;