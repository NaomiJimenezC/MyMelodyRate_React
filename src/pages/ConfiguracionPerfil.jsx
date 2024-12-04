import React, {useContext, useEffect} from 'react';
import {UserContext} from "../Context/UserProvider.jsx";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import Button from "../Components/Button.jsx";

const ConfiguracionPerfil = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        !user && navigate('/login');
    },[user])

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
    };//adaptarlo

    const validationSchema = Yup.object().shape({
        birthDate: Yup.string().
                trim()
                .matches(/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0,1,2])\/(19|20)\d{2}/gm,"Inserte una fecha válida"),
        password:Yup.string()
            .trim()
            .min(8)
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,"Su contraseña no cumple el formato básico")
            .required("La contraseña es obligatoria"),
        name: Yup.string()
              .trim()
              .min(3, "Mínimo 3 caracteres")
              .required("El nombre es requerido"),
        message: Yup.string()
                .trim()
                .min(3, "Mínimo 3 caracteres")
                .required("Se requiere algo de contenido")
    });
    return (
        <main>
            <Formik
                initialValues={{birtDate:"",password:"",name:"",message:"",picked:false}}
                validationSchema={validationSchema}
                onSubmit={onSubmit} // sí, esto hay que cambiarlo
            >
                {({
                    values,
                    handleSubmit,
                    handleBlur,
                    handleChange,
                    errors,
                    isSubmitting,
                    touched,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        {/*Una imagen no sería mucho curro?*/}

                        <h3>Nombre</h3>
                        <Field
                            name="name"
                            id="name"
                            as="input"
                            type="text"
                            placeholder="Ingrese su nombre"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {errors.name && touched.name && (
                            <div style={{color: 'red', fontSize: '0.8rem'}}>
                                {errors.name}
                            </div>
                        )}

                        <h3>Fecha de nacimiento</h3>
                        <Field
                            name="birtDate"
                            id="birtDate"
                            as="input"
                            type="date"
                            placeholder="dd/mm/YYYY"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.birthDate}
                        />
                        {errors.birtDate && touched.birtDate && (
                            <div style={{color: 'red', fontSize: '0.8rem'}}>
                                {errors.birtDate}
                            </div>
                        )}

                        <h3>¿Mostrar tu fecha?</h3>
                        <label>
                            <Field type={"radio"} name={"picked"} id={"picked"} value={true}/>
                        </label>

                        <label>
                            <Field type={"radio"} name={"picked"} id={"picked"} value={false}/>
                        </label>

                        <h3>Biografía:</h3>
                        <Field
                            name="message"
                            id="message"
                            as={"textarea"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                        />
                        {errors.message && touched.message && (
                            <div style={{color: 'red', fontSize: '0.8rem'}}>
                                {errors.message}
                            </div>
                        )}

                        <h3>Contraseña</h3>
                        <Field
                            name="password"
                            id="password"
                            type="password"
                            placeholder="********"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && (
                            <div style={{color: 'red', fontSize: '0.8rem'}}>
                                {errors.password}
                            </div>
                        )}
                        <Button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                            Confirmar cambios
                        </Button>
                    </Form>
                )

                }
            </Formik>
        </main>
    );
};

export default ConfiguracionPerfil;