import { createContext } from "react";
import { FavoriteAlbums, NewReleaseAlbums } from "./interface";

type Albums = {
  loadNewReleases: () => Promise<NewReleaseAlbums>;
  newReleases: NewReleaseAlbums | null;
  updateFavoritesAlbums: (albumId: string) => Promise<void>;
  favoritesAlbumsId: string[] | null;
  loadFavoritesAlbumsId: () => Promise<string[]>;
  searched: string | null;
  loadSearched: (search: string) => Promise<any>;
  favoritesAlbums: FavoriteAlbums | null;
  loadFavoritesAlbums: () => Promise<NewReleaseAlbums>;
};

export const AlbumsContext = createContext<Albums | undefined>(undefined);
