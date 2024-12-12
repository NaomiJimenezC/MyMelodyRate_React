import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../sass/components/_cardSongAlbum.scss"

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
        <article className={"card"} onClick={handleClick}>
            <img className={"card__image"} src={image} alt={name}  />
            <div className={"card__text"}>{name}</div>
        </article>
    );
};

export default Card;
