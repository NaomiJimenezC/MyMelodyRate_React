import { useNavigate } from 'react-router-dom';

const Card = ({ id, image, name, typeOfMusic }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("Tipo de música:", typeOfMusic); // Para depuración

        const validTypes = ["artist", "album", "track"];

        if (validTypes.includes(typeOfMusic)) {
            navigate(`/${typeOfMusic}?id=${id}`);
        } else {
            console.warn(`Tipo no válido: ${typeOfMusic}`);
            // Puedes decidir qué hacer en caso de un tipo no reconocido
            // Por ejemplo, navegar a una página por defecto o mostrar un mensaje de error
        }
    };

    return (
        <article onClick={handleClick} style={{ cursor: 'pointer' }}>
            <img src={image} alt={name}/>
            <p>{name}</p>
        </article>
    );
};

export default Card;
