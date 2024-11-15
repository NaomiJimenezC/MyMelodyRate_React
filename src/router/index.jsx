import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import LayaoutPublic from "../Layaout/LayaoutPublic.jsx";
import NotFound from "../pages/NotFound.jsx";
import Home from "../pages/Home.jsx";
import Artista from "../pages/Artista.jsx";
import Album from "../pages/Album.jsx";
import Cancion from "../pages/Cancion.jsx";
import Perfil from "../pages/Perfil.jsx";
import Lista from "../pages/Lista.jsx";
import InicioDeSesion from "../pages/InicioDeSesion.jsx";
import Registro from "../pages/Registro.jsx";
import Conctactos from "../pages/Conctactos.jsx";


export const router = createBrowserRouter([
    {
        path:"/",
        element:<LayaoutPublic/>,
        errorElement: <NotFound />,
        children:[
            {
                children:[
                    {
                        // path: "/",
                        index:true,
                        element: <Home />,
                    },
                    {
                        path: "/artist",
                        element: <Artista />,
                    },
                    {
                        path: "/album",
                        element: <Album />,
                        //loader: loaderBlogs // hace que carguen los datos del fetch antes de montar el componente
                    },
                    {
                        path: "/track",
                        element: <Cancion />,
                        //loader: loaderPosts
                    },
                    {
                        path: "/user",
                        element:<Perfil />
                    },
                    {
                        path: "/list", //TODO()considerar poner /list:id
                        element: <Lista />,
                    },
                    {
                        path: "/sign_in",
                        element:<InicioDeSesion />
                    },
                    {
                        path: "/sign_up",
                        element:<Registro />
                    },
                    {
                        path: "/contact_me",
                        element:<Conctactos />
                    }
                ]
            }
        ],
    }
])


export default router;