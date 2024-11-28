import
{StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router/index.jsx";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Suspense fallback={<div>Cargando...</div>}>
            <RouterProvider router={router} />
        </Suspense>
    </StrictMode>,
)
