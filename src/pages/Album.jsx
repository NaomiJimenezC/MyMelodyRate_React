import React from 'react';
import {useLocation} from "react-router-dom";

const Album = () => {
    const location = useLocation();
    // Parámetros de búsqueda
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    return (
        <div>
            <p>{id}</p>
        </div>
    );
};

export default Album;