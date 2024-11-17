import React from 'react';

const Conctactos = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [valid, setValid] = React.useState(false);

    const handleNameChange = (e) => {
        const nombre = e.target.value;
        setName(nombre);
        nombre ? setValid(nombre && email && message) : console.log("ingrese algo")
    }

    const handleEmailChange = (e) => {
        const email = e.target.value;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        setEmail(email)
        emailRegex.test(email) ? setValid(name && emailRegex.test(email) && message) : console.log("ingrese un email válido")
    }

    const handleMessageChange = (e) => {
        const mensaje = e.target.value;
        setMessage(mensaje);
        mensaje ? setValid(name && email && message) : console.log("ingrese un mensaje")
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        if (valid) {
            console.log("enviando email")
        } else {
            console.log("mal")
        }
    }

    return (
        <main className="container mt-5 ">
            <section>
                <form onSubmit={onHandleSubmit}>
                    <legend className="mb-4">¡Contáctanos!</legend>
                    <fieldset>
                        <label htmlFor="name" className="form-label ">Su nombre</label>
                        <input type="text"
                               className="form-control mb-3 bg-input text-descriptivo"
                               id="name"
                               name="name"
                               placeholder="Introduzca su nombre"
                               onChange={handleNameChange}
                               value={name}
                        />

                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text"
                               className="form-control mb-3 bg-input text-descriptivo"
                               id="email"
                               name="email"
                               placeholder="Introduzca su email"
                               onChange={handleEmailChange}
                               value={email}
                        />

                        <label htmlFor="contenidoDelMensaje" className="form-label">Contenido del mensaje</label>
                        <textarea
                            className="form-control mb-3 bg-input text-descriptivo"
                            id="contenidoDelMensaje"
                            rows="4"
                            placeholder="Escribe tu mensaje aquí"
                            onChange={handleMessageChange}
                            value={message}
                        >
                        </textarea>

                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </fieldset>
                </form>
            </section>
        </main>
    );
};

export default Conctactos;