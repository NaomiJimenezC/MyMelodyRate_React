import React, { lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";
import LayaoutPublic from "../Layaout/LayaoutPublic.jsx";
import Home from "../pages/Home.jsx";
import LayaoutPrivate from "../Layaout/LayaoutPrivate.jsx";
import ResultadosBusqueda from "../pages/RealizarBusqueda.jsx";
import("../pages/Home.jsx")

const NotFound = lazy(() => import("../pages/NotFound.jsx"));
const Artista = lazy(() => import("../pages/Artista.jsx"));
const Album = lazy(() => import("../pages/Album.jsx"));
const Cancion = lazy(() => import("../pages/Cancion.jsx"));
const Perfil = lazy(() => import("../pages/Perfil.jsx"));
const Lista = lazy(() => import("../pages/Lista.jsx"));
const InicioDeSesion = lazy(() => import("../pages/InicioDeSesion.jsx"));
const Registro = lazy(() => import("../pages/Registro.jsx"));
const Contactos = lazy(() => import("../pages/Contactos.jsx"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayaoutPublic />,
        errorElement: <NotFound />,
        children: [
            {
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: "/artist",
                        element: <Artista />,
                    },
                    {
                        path: "/album",
                        element: <Album />,
                    },
                    {
                        path: "/track",
                        element: <Cancion />,
                    },
                    {
                        path: "/results",
                        element: <ResultadosBusqueda />,
                    }
                    ,
                    {
                        path: "/sign_in",
                        element: <InicioDeSesion />
                    },
                    {
                        path: "/sign_up",
                        element: <Registro />
                    },
                    {
                        path: "/contact_me",
                        element: <Contactos />
                    },
                    {
                        path: "/user",
                        element: <LayaoutPrivate />,
                        children:[
                            {
                                index: true,
                                element: <Perfil />,
                            },
                            {
                                path: "list",
                                element: <Lista />,
                            },
                        ]
                    }
                ]
            }
        ],
    }
]);

export default router;
