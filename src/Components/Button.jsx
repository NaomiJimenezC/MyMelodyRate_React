import React from 'react';
import "../sass/components/_button.scss";

const Button = ({valor,clase}) => {
    return (
        <button className={clase} >{valor}</button>
    );
};

export default Button;