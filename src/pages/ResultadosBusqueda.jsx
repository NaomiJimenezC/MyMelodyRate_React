
import {hacerSolicitud} from "../config/Spotify.jsx";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResultadosBusqueda = () => {
    const location = useLocation();
    const [results, setResults] = useState([]); // Resultados de búsqueda
    const [loading, setLoading] = useState(true); // Estado de carga
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [totalResults, setTotalResults] = useState(0); // Total de resultados

    // Parámetros de búsqueda
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const type = queryParams.get('type');

    // Límite de resultados por página
    const limit = 10;

    useEffect(() => {
        const getResults = async () => {
            if (query && type) {
                try {
                    const data = await resultadosBusqueda({ query, type, limit, offset: currentPage * limit });
                    setResults(data.tracks.items); // Asumiendo que los resultados están en data.tracks.items
                    setTotalResults(data.tracks.total); // Total de resultados para paginación
                } catch (error) {
                    console.error("Error al obtener los resultados:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        getResults();
    }, [query, type, currentPage]); // Dependencias

    if (loading) return <p>Cargando resultados...</p>;

    return (
        <div>
            <h1>Resultados de Búsqueda</h1>
            <p>Buscando: {query}</p>
            <p>Tipo: {type}</p>
            <ul>
                {results.length > 0 ? (
                    results.map(track => (
                        <li key={track.id}>
                            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                {track.name} - {track.artists.map(artist => artist.name).join(', ')}
                            </a>
                        </li>
                    ))
                ) : (
                    <p>No se encontraron resultados.</p>
                )}
            </ul>

            {/* Paginación */}
            <div>
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                >
                    Anterior
                </button>
                <span>Página {currentPage + 1}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.floor(totalResults / limit)))}
                    disabled={(currentPage + 1) * limit >= totalResults}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export const resultadosBusqueda = async ({ query, type, limit = 10, offset = 0 }) => {
    try {
        return await hacerSolicitud(`https://api.spotify.com/v1/search?q=${query}&type=${type}&market=ES&limit=${limit}&offset=${offset}`);
    } catch (error) {
        console.error("Error al obtener las canciones");
        throw error;
    }
};


export default ResultadosBusqueda;