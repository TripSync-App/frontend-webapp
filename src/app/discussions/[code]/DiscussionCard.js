import {
  Card,
  CardContent,
  Typography,
  useTheme,
  CardActionArea,
  Dialog,
} from "@mui/material";
import React, { useState } from "react";
import Discussion from "./Discussion";

const DiscussionCard = ({ discussion = false, OverwrittenDialog }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "50% !important",
          },
        }}
      >
        {!OverwrittenDialog ? ( // return normal discussion or an OverwrittenDialog
          <Discussion discussion={discussion}></Discussion>
        ) : (
          OverwrittenDialog
        )}
      </Dialog>
      <Card>
        <CardActionArea onClick={handleClickOpen}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: theme.palette.fontColor }}
            >
              {discussion ? discussion.title : "Create a new discussion"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default DiscussionCard;
