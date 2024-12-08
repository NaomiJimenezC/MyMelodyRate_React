import
{StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router/index.jsx";
import UserProvider from "./Context/UserProvider.jsx";
import FavoriteListProvider from "./Context/FavoriteListProvider.jsx";
import "./sass/base/_reset.scss"


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Suspense fallback={<div>Cargando...</div>}>
            <UserProvider>
                <FavoriteListProvider>
                    <RouterProvider router={router} />
                </FavoriteListProvider>
            </UserProvider>
        </Suspense>
    </StrictMode>,
)
