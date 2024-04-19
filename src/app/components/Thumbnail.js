import {
  Box,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  useIsFocusVisible,
  Dialog,
  DialogTitle
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Team from "../team/page";
import MemberInfo from "../team/MemberInfo";

export default function Thumbnail({
  title,
  image,
  description,
  styling,
  vacationId,
  discussions,
  members,
  admin
}) {
  let [openPreview, setOpen] = useState(false);

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
  if (!members.includes(admin)){
    members.push(admin);
  }

  return (
    <div className="pt-2 pr-2 pb-2 max-sm:w-[50%] h-[20%]">
      <Card sx={styling} className="animate-fade-down" raised>
        <CardActionArea onClick={onClick}>
          <CardMedia
            sx={{ height: 140 }}
            image={image ? image.src : ""}
            title={title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-nowrap"
            >
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
              navigator.clipboard.writeText(`${window.location.href}discussions/${vacationId}`);
              alert("Link copied to clipboard!");
            }}
          >
            Share
          </Button>
        </CardActions>
      </Card>
      <Dialog open={openPreview} onClose={handlePreviewClose}>
        <DialogTitle variant="h4">
          <div class="h-38 grid grid-cols-1 gap-4 content-start ...">
            <Box
              component="img"
              alt={title}
              src={image? image.src : ""}
            />
            <div>
              {title}
            </div>
            <div>
              <p class="text-base">{description}</p>
            </div>
            <div>
              <p class="text-base">Discussion Count: {discussions.length}</p>
            </div>
            <div>
              <p class="text-base">Member Count: {members.length}</p>
            </div>
            <Button
            size="small"
            variant="outlined"
            centerRipple
            onClick={onClick}
          >
            Go to Vacation Discussions
          </Button>
          </div>
        </DialogTitle>
      </Dialog>
    </div>
  );
}
