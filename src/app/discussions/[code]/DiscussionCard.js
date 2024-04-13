import { Beenhere } from "@mui/icons-material";
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
        className="animate-fade-down animate-duration-500"
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: {
              xs: "none",
              sm: "50%",
            },
          },
        }}
      >
        {!OverwrittenDialog ? ( // return normal discussion or an OverwrittenDialog
          <Discussion discussion={discussion}></Discussion>
        ) : (
          OverwrittenDialog
        )}
      </Dialog>
      <Card className="mb-2 animate-fade-left">
        <CardActionArea onClick={handleClickOpen}>
          <CardContent>
            <div className="flex flex-row justify-between items-center">
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: theme.palette.fontColor }}
              >
                {discussion ? discussion.title : "Create a new discussion"}
              </Typography>
              {discussion.finalized ? (
                <div className="flex flex-row">
                  <Beenhere style={{ color: "green" }}></Beenhere>
                  <Typography className="ml-2">Finalized</Typography>
                </div>
              ) : null}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default DiscussionCard;
