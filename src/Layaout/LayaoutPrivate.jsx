import { useContext} from "react";
import {Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LayoutPrivate = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <div>
            {
                user ? <Outlet /> : navigate("/")
            }
        </div>

    );
};

export default LayoutPrivate;
