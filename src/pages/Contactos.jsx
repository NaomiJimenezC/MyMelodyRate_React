import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';


const Contactos = () => {
    const onSubmit = ({ name,email, message }, { setSubmitting, setErrors, resetForm }) => {
        try {
            console.log(name,email,message);
            resetForm();
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                setErrors({ credentials: "Credenciales inválidas" });
            } else {
                console.error(error.code, error.message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().trim().email("Email no válido").matches( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Formato no válido").required("El email es requerido"),
        name: Yup.string().trim().min(3, "Mínimo 3 caracteres").required("El nombre es requerido"),
        message: Yup.string().trim().min(3, "Mínimo 3 caracteres").required("Se requiere algo de contenido"),
    });

    return (
        <section>
            <Formik
                initialValues={{name: "", email: "", message: ""}}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                {
                    ({
                         values,
                         handleChange,
                         handleSubmit,
                         handleBlur,
                         touched,
                         errors,
                         isSubmitting
                     })  => (
                        <form onSubmit={handleSubmit}>
                            <legend className="mb-4">¡Contáctanos!</legend>
                            <fieldset>
                                <label htmlFor="name" className="form-label ">Su nombre</label>
                                <input type="text"
                                       className="form-control mb-3 bg-input text-descriptivo"
                                       id="name"
                                       name="name"
                                       placeholder="Introduzca su nombre"
                                       value={values.name}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                />
                                {errors.name && touched.name && (
                                    <div style={{ color: 'red', fontSize: '0.8rem' }}>
                                        {errors.name}
                                    </div>
                                )}

                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    className="form-control mb-3 bg-input text-descriptivo"
                                    id="email"
                                    type="text"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="email"
                                />
                                {errors.email && touched.email && (
                                    <div style={{ color: 'red', fontSize: '0.8rem' }}>
                                        {errors.email}
                                    </div>
                                )}

                                <label htmlFor="message" className="form-label">Contenido del
                                    mensaje</label>
                                <textarea
                                    className="form-control mb-3 bg-input text-descriptivo"
                                    id="message"
                                    name="message"
                                    rows="4"
                                    placeholder="Escribe tu mensaje aquí"
                                    value={values.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                 >
                                </textarea>

                                {errors.message && touched.message && (
                                    <div style={{ color: 'red', fontSize: '0.8rem' }}>
                                        {errors.message}
                                    </div>
                                )}

                                <button type="submit" disabled={isSubmitting}>Enviar</button>
                            </fieldset>
                        </form>
                    )
                }
            </Formik>
        </section>
    )
};


export default Contactos;