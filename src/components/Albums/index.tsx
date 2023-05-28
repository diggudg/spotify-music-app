import { useEffect } from "react";
import useAlbums from "../../hooks/useAlbums";
import { AlbumCard } from "../AlbumCard";
import Grid from "@mui/material/Unstable_Grid2";

export const Albums = () => {
  const {
    loadNewReleases,
    newReleases,
    loadFavoritesAlbumsId: loadFavoritesAlbums,
  } = useAlbums();

  useEffect(() => {
    loadNewReleases();
    loadFavoritesAlbums();
  }, [loadFavoritesAlbums, loadNewReleases]);

  return (
    <div>
      <Grid container spacing={2}>
        {newReleases?.albums?.items?.map((album) => (
          <Grid xs={2}>
            <AlbumCard album={album} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
