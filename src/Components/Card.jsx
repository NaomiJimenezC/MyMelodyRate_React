import React from 'react';

const Card = ({ id, image, name }) => {
    console.log(image)
    return (
        <article key={id}>
            <img src={image} alt={name}/>
            <p>{name}</p>
        </article>
    );
};

export default Card;