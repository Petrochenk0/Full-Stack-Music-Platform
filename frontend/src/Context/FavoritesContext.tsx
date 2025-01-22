import React, { createContext, useState, useContext, useEffect } from 'react';

interface FavoritesContextType {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  refreshFavorites: () => Promise<void>;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {},
  refreshFavorites: async () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const refreshFavorites = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:8000/api/users/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFavorites(data.map((fav: any) => fav.trackId.toString()));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const addFavorite = (id: string) => {
    setFavorites((prev) => [...prev, id]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  useEffect(() => {
    refreshFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        refreshFavorites,
        addFavorite,
        removeFavorite,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
