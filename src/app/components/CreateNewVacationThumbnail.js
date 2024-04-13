import {
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import CreateNewVacationDialog from "../discussions/[code]/CreateNewVacationDialog";

export default function CreateNewVacationThumbnail({}) {
  const theme = useTheme();
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
          <CardContent>
            <Typography>Create a New Vacation</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog open={openPreview} onClose={handlePreviewClose}>
        <CreateNewVacationDialog></CreateNewVacationDialog>
      </Dialog>
    </div>
  );
}
