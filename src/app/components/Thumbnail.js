import {Card, CardActions, CardActionArea, CardContent, CardMedia, Typography, Button, useIsFocusVisible} from '@mui/material';

export default function Thumbnail ({title, image, description, styling}){
    function onFocus(){ 
        
    }
    return(
        <div className='pt-2 pr-2 pb-2'>
        <Card sx={styling} raised>
            <CardActionArea  >
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
                        alert("clicked");
                    }}
                >Browse This Trip</Button>
                <Button size="small" variant='outlined' centerRipple
                    onClick={() => {
                        alert("clicked");
                    }}
                >Share</Button>
            </CardActions>
            
        </Card>
        </div>
    );
}