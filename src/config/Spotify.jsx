import axios from "axios";

let accessToken ;
let tokenExpiration;

const obtenerToken = async () => {
    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
                client_secret: "aae0eef128f54d539db828a35af28dd7",
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        accessToken = response.data.access_token;
        tokenExpiration = Date.now() + response.data.expires_in * 1000; // Calcula el tiempo de expiración
    } catch (error) {
        console.error('Error al obtener el token:', error.response?.data || error.message);
        throw error;
    }
};

// Verifica si el token sigue siendo válido
async function verificarToken() {

    if (!accessToken || Date.now() >= tokenExpiration) {
        console.log('Token expirado. Solicitando uno nuevo...');
        await obtenerToken();
    }
}

// Hace una solicitud a la API usando el token actual
export const hacerSolicitud = async (urlPeticion) => {
    await verificarToken(); // Asegura que el token sea válido
    try {
        const response = await axios.get(urlPeticion, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data; // Devuelve los datos de la API
    } catch (error) {
        console.error('Error al hacer la solicitud:', error.response?.data || error.message);
        throw error; // Lanza el error para que sea manejado donde se llame
    }
};