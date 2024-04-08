import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  useIsFocusVisible,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Thumbnail({
  title,
  image,
  description,
  styling,
  vacationId,
}) {
  let [openPreview, setOpen] = useState(false);
  const [thumbnailImage, setThumbnailImage] = "";

  const discussionRouter = useRouter();
  let discussionQuery = {
    href: `/discussions/${vacationId}`,
  };
  function onClick() {
    discussionRouter.push(discussionQuery.href);
  }
  function onFocus() {}
  function handlePreviewClose() {
    setOpen(false);
  }

  return (
    <div className="pt-2 pr-2 pb-2">
      <Card sx={styling} className="animate-fade-down" raised>
        <CardActionArea onClick={onClick}>
          <CardMedia
            sx={{ height: 140 }}
            image={image ? image.src : ""}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="palette.text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            centerRipple
            onClick={() => {
              setOpen(true);
            }}
          >
            Preview This Trip
          </Button>
          <Button
            size="small"
            variant="outlined"
            centerRipple
            onClick={() => {
              alert("clicked");
            }}
          >
            Share
          </Button>
        </CardActions>
      </Card>
      <Dialog open={openPreview} onClose={handlePreviewClose}>
        <DialogTitle variant="h4">{title}</DialogTitle>
      </Dialog>
    </div>
  );
}
