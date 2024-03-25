import {Card, CardActions, CardActionArea, CardContent, CardMedia, Typography, Button, useIsFocusVisible, Dialog, DialogTitle} from '@mui/material';
import { useState } from 'react';

export default function Thumbnail ({title, image, description, styling, onClick}){
    let [openPreview, setOpen] = useState(false);
    function onFocus(){ 
        
    }
    function handlePreviewClose(){
        setOpen(false);
    }
    return(
        <div className='pt-2 pr-2 pb-2'>
        <Card sx={styling} raised>
            <CardActionArea href={onClick}>
            <CardMedia
                sx={{ height: 140 }}
                image={image.src}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {description}
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" variant='outlined' centerRipple
                    onClick={() => {
                        setOpen(true)
                    }}
                >Preview This Trip</Button>
                <Button size="small" variant='outlined' centerRipple
                    onClick={() => {
                        alert("clicked");
                    }}
                >Share</Button>
            </CardActions>
            
        </Card>
        <Dialog open={openPreview} onClose={handlePreviewClose}>
            <DialogTitle variant='h4'>{title}</DialogTitle>
            
        </Dialog>
        </div>
    );
}