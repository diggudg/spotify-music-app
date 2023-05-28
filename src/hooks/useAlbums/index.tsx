import { useContext } from "react";
import { AlbumsContext } from "../../contexts/albums/context";

const useAlbums = () => {
  const context = useContext(AlbumsContext);

  if (!context) {
    throw new Error("useAlbums must be used within a AlbumsContextProvider");
  }
  return context;
};

export default useAlbums;
