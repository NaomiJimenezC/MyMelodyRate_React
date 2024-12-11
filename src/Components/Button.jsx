import React from 'react';
import "../sass/components/_button.scss";

const Button = ({valor}) => {
    return (
        <button className={"button"} >{valor}</button>
    );
};

export default Button;