import { acceptHMRUpdate, defineStore } from 'pinia';


interface FavoriteData {
  id: string
  url: string
}

interface State {
  favorites: FavoriteData[]
}

export const useFavoriteStore = defineStore('favorites', {
	state: (): State => ({
    favorites: []
	}),
	actions: {
    addToFavorite(data: FavoriteData) {
      const found = this.favorites.find((el) => el.id === data.id)
      if (!found) {
        this.favorites.push(data)
      }
    },
    removeFromFavorite(id: string) {
      this.favorites = this.favorites.filter(item => id !== item.id)
    },
    inFavorite(id: string) {
      return this.favorites.find((el) => el.id === id)
    }
	}
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useFavoriteStore, import.meta.hot));
}
