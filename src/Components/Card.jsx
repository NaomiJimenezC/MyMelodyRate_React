import { useNavigate } from 'react-router-dom';

const Card = ({ id, image, name, typeOfMusic }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("Tipo de música:", typeOfMusic); // Para depuración

        const validTypes = ["artist", "album", "track"];

        if (validTypes.includes(typeOfMusic)) {
            navigate(`/${typeOfMusic}?id=${id}&name=${name}`);
        } else {
            console.warn(`Tipo no válido: ${typeOfMusic}`);
        }
    };

    return (
        <article onClick={handleClick}>
            <img src={image} alt={name}/>
            <p>{name}</p>
        </article>
    );
};

export default Card;
