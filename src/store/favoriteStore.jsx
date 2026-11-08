import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoriteStore = create(
  persist(
    set => ({
      favorites: [],

      addFavorite: user =>
        set(state => ({
          favorites: [...state.favorites, user],
        })),

      removeFavorite: userId =>
        set(state => ({
          favorites: state.favorites.filter(user => user.id !== userId),
        })),

      toggleFavorite: user =>
        set(state => {
          const exists = state.favorites.some(fav => fav.id === user.id);

          return {
            favorites: exists
              ? state.favorites.filter(fav => fav.id !== user.id)
              : [...state.favorites, user],
          };
        }),
    }),
    {
      name: 'favorite-users',
    },
  ),
);

export default useFavoriteStore;
