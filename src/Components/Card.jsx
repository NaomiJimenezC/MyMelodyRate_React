import { useNavigate } from 'react-router-dom';

const Card = ({ id, image, name, typeOfMusic }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        switch (typeOfMusic) {
            case "artist":
                navigate(`/artist?id=${id}`);
                break;
            case "album":
                navigate(`/album?id=${id}`);
                break;
            case "track":
                navigate(`/track?id=${id}`);
                break;
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
