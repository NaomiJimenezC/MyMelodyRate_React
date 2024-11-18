import React from 'react';

const Contactos = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');


    const handleNameBlur = (e) => {
        const nombre = e.target.value;
        if (nombre.length > 0) {
            setName(nombre);
        } else {
            console.log("Por favor, ingrese un nombre.");
        }
    };

    const handleEmailBlur = (e) => {
        const correo = e.target.value;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (emailRegex.test(correo)) {
            setEmail(correo);
        } else {
            console.log("Por favor, ingrese un email válido.");
        }
    };

    const handleMessageBlur = (e) => {
        const mensaje = e.target.value;
        if (mensaje.length > 0) {
            setMessage(mensaje);
        } else {
            console.log("Por favor, ingrese un mensaje.");
        }
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (name && email && message) {
            console.log("Enviando email...");
        } else {
            console.log("Por favor, complete todos los campos.");
        }
    };


    return (
        <main className="bg-mi-color flex-grow-1 bg-light p-3" >
            <section className="container mt-5 ">
                <form onSubmit={onHandleSubmit} >
                    <legend className="mb-4">¡Contáctanos!</legend>
                    <fieldset>
                        <label htmlFor="name" className="form-label ">Su nombre</label>
                        <input type="text"
                               className="form-control mb-3 bg-input text-descriptivo"
                               id="name"
                               name="name"
                               placeholder="Introduzca su nombre"
                               onBlur={handleNameBlur}
                               defaultValue={name}
                        />

                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text"
                               className="form-control mb-3 bg-input text-descriptivo"
                               id="email"
                               name="email"
                               placeholder="Introduzca su email"
                               onBlur={handleEmailBlur}
                        />

                        <label htmlFor="contenidoDelMensaje" className="form-label">Contenido del mensaje</label>
                        <textarea
                            className="form-control mb-3 bg-input text-descriptivo"
                            id="contenidoDelMensaje"
                            rows="4"
                            placeholder="Escribe tu mensaje aquí"
                            defaultValue={message}
                            onBlur={handleMessageBlur}
                        >
                        </textarea>

                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </fieldset>
                </form>
            </section>
        </main>
    );
};

export default Contactos;