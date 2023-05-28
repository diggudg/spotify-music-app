import { Item } from "../../contexts/albums/interface";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "@emotion/styled";
import useAlbums from "../../hooks/useAlbums";

interface AlbumCardProps {
  album: Item;
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  const { updateFavoritesAlbums, favoritesAlbumsId } = useAlbums();

  const isLiked = () => {
    return favoritesAlbumsId?.includes(album.id) ? "error" : "inherit";
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={album.images[0].url}
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
          <FavoriteIcon color={isLiked()} />
        </IconButton>

        <StyledTypography gutterBottom variant="subtitle2">
          {album.name}
        </StyledTypography>
      </CardActions>
    </Card>
  );
};

const StyledTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: inline-block;
`;
