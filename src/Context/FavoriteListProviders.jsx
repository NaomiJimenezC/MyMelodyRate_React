import React, {createContext, useEffect, useState} from 'react';


export const FavoriteListContext = createContext()

// eslint-disable-next-line react/prop-types
const FavoriteListProviders = ({children}) => {
    const [favoriteSongs, setFavoriteSongs] = useState([]);
    const [favoriteAlbums, setFavoriteAlbums] = useState([]);
    const [favoriteArtists, setFavoriteArtists] = useState([]);

    useEffect(() => {
        // Cargar favoritos desde localStorage al iniciar
        const loadedSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
        const loadedAlbums = JSON.parse(localStorage.getItem('favoriteAlbums')) || [];
        const loadedArtists = JSON.parse(localStorage.getItem('favoriteArtists')) || [];

        setFavoriteSongs(loadedSongs);
        setFavoriteAlbums(loadedAlbums);
        setFavoriteArtists(loadedArtists);
    }, []);

    const toggleFavorite = (type, item) => {
        let currentFavorites, setFunction, storageKey;

        switch(type) {
            case 'song':
                currentFavorites = favoriteSongs;
                setFunction = setFavoriteSongs;
                storageKey = 'favoriteSongs';
                break;
            case 'album':
                currentFavorites = favoriteAlbums;
                setFunction = setFavoriteAlbums;
                storageKey = 'favoriteAlbums';
                break;
            case 'artist':
                currentFavorites = favoriteArtists;
                setFunction = setFavoriteArtists;
                storageKey = 'favoriteArtists';
                break;
            default:
                return;
        }

        const newFavorites = currentFavorites.some(fav => fav.id === item.id)
            ? currentFavorites.filter(fav => fav.id !== item.id)
            : [...currentFavorites, item];
        setFunction(newFavorites);

        localStorage.setItem(storageKey, JSON.stringify(newFavorites));
    };

    return (
        <FavoriteListProviders value={{
            favoriteSongs,
            favoriteAlbums,
            favoriteArtists,
            toggleFavorite
        }}>
            {children}
        </FavoriteListProviders>
    );
};

export default FavoriteListProviders;