import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FavoriteAlbums, NewReleaseAlbums } from "./interface";
import { AlbumsContext } from "./context";
import useDebounce from "../../hooks/useDebounce";
import { setupInterceptorsTo } from "../../interceptor";

export interface IAlbumsProps {
  children: React.ReactNode;
}

const AlbumsContextProvider: React.FC<IAlbumsProps> = ({ children }) => {
  const [albums, setAlbums] = useState<NewReleaseAlbums | null>(null);

  const [favoritesAlbumsId, setFavoritesAlbumsId] = useState<string[] | null>(
    null
  );

  const [favoritesAlbums, setFavoritesAlbums] = useState<FavoriteAlbums | null>(
    null
  );

  const apiUrl = process.env.REACT_APP_API_URL;

  const [searched, setSearched] = useState<string | null>("");
  const debouncedValue = useDebounce(searched, 500);

  const axiosInstance = setupInterceptorsTo(axios);

  const loadNewReleases = useCallback(async () => {
    const response = await axios.get<NewReleaseAlbums>(
      `${apiUrl}/spotify/NewReleases`
    );

    const { data } = response;
    setAlbums(data);

    return data;
  }, [apiUrl]);

  const saveFavoritesAlbums = useCallback(
    (albumId: string) => {
      axiosInstance.post(`${apiUrl}/spotify/favorites`, {
        albumId,
      });
    },
    [apiUrl, axiosInstance]
  );

  const deleteFavoritesAlbums = useCallback(
    (id: string) => {
      axiosInstance.delete(`${apiUrl}/spotify/favorites/${id}`, {});
    },
    [apiUrl, axiosInstance]
  );

  const loadFavoritesAlbumsId = useCallback(async () => {
    const response = await axiosInstance.get(`${apiUrl}/spotify/favorites`);

    const { data } = response;
    const mappedData = data.map((item: any): string[] => item.albumId);
    setFavoritesAlbumsId(mappedData);

    return data;
  }, [apiUrl, axiosInstance]);

  const loadFavoritesAlbums = useCallback(async () => {
    const response = await axios.get(`${apiUrl}/spotify/favorites/all`);

    const { data } = response;

    setFavoritesAlbums(data);

    return data;
  }, [apiUrl]);

  const loadSearched = useCallback(
    async (search: string) => {
      setSearched(search);
      if (!search) {
        return;
      } else if (search === debouncedValue) {
        return;
      } else if (search !== debouncedValue) {
        const response = await axios.get(
          `https://localhost:7293/api/spotify/search/${search}`
        );
        const { data } = response;
        setAlbums(data);
      }
    },
    [debouncedValue]
  );

  useEffect(() => {
    loadFavoritesAlbumsId();
    loadFavoritesAlbums();
  }, [loadFavoritesAlbums, loadFavoritesAlbumsId]);

  const updateFavoritesAlbums = useCallback(
    async (albumId: string) => {
      if (favoritesAlbumsId?.includes(albumId)) {
        const newFavoritesAlbums = favoritesAlbumsId?.filter(
          (album) => album !== albumId
        );
        setFavoritesAlbumsId(newFavoritesAlbums);
        deleteFavoritesAlbums(albumId);
        loadFavoritesAlbums();
      } else {
        const newFavoritesAlbums = favoritesAlbumsId
          ? [...favoritesAlbumsId, albumId]
          : [albumId];
        setFavoritesAlbumsId(newFavoritesAlbums);
        saveFavoritesAlbums(albumId);
        loadFavoritesAlbums();
      }
    },
    [
      deleteFavoritesAlbums,
      favoritesAlbumsId,
      loadFavoritesAlbums,
      saveFavoritesAlbums,
    ]
  );

  const value = {
    loadNewReleases,
    newReleases: albums,
    updateFavoritesAlbums,
    favoritesAlbumsId,
    loadFavoritesAlbumsId,
    searched,
    loadSearched,
    favoritesAlbums,
    loadFavoritesAlbums,
  };

  return (
    <AlbumsContext.Provider value={value}>{children}</AlbumsContext.Provider>
  );
};

export { AlbumsContextProvider, AlbumsContext };
