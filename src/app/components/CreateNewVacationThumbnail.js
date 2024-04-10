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
import CreateNewVacationDialog from "../discussions/[code]/CreateNewVacationDialog";

export default function CreateNewVacationThumbnail({}) {
  let [openPreview, setOpen] = useState(false);

  function onClick() {
    setOpen(true);
  }

  function handlePreviewClose() {
    setOpen(false);
  }

  return (
    <div className="pt-2 pr-2 pb-2">
      <Card className="h-full animate-fade-down" raised>
        <CardActionArea className="h-full" onClick={onClick}>
          <CardContent>Create a New Vacation</CardContent>
        </CardActionArea>
      </Card>
      <Dialog open={openPreview} onClose={handlePreviewClose}>
        <CreateNewVacationDialog></CreateNewVacationDialog>
      </Dialog>
    </div>
  );
}
