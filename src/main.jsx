import
{StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router/index.jsx";
import UserProvider from "./Context/UserProvider.jsx";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Suspense fallback={<div>Cargando...</div>}>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </Suspense>
    </StrictMode>,
)
