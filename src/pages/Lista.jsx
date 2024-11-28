import React, {useContext, useEffect} from 'react';
import {UserContext} from "../Context/UserProvider.jsx";
import {useNavigate} from "react-router-dom";

const Lista = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        user && navigate('/login');
    },[user])
    return (
        <div>

        </div>
    );
};

export default Lista;