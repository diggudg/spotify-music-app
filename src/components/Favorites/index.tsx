import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAlbums from "../../hooks/useAlbums";
import styled from "@emotion/styled";

export const Favorites = () => {
  const { favoritesAlbumsId, updateFavoritesAlbums, favoritesAlbums } =
    useAlbums();

  console.log("favoritesAlbums", favoritesAlbumsId, favoritesAlbums);

  return (
    <>
      <Grid container spacing={2}>
        {favoritesAlbums?.albums.map((album) => (
          <Grid xs={2}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="194"
                image={album?.images ? album?.images[0]?.url : ""}
                alt="Paella dish"
              />
              <CardContent></CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {
                    updateFavoritesAlbums(album.id);
                  }}
                >
                  <FavoriteIcon color="error" />
                </IconButton>

                <StyledTypography gutterBottom variant="subtitle2">
                  {album.name}
                </StyledTypography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const StyledTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: inline-block;
`;
