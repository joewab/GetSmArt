import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { CardContent } from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CardActions } from '@mui/material';



function GalleryItem({ image, galleryId, galleryName }) {

    const dispatch = useDispatch();
    const history = useHistory();
    console.log('galleryName in GalleryItem component:', galleryName);

    const editImage = () => {
        history.push(`/editimage/${galleryId}/${image.id}/${galleryName}`)
    }

    const deleteImage = () => {
        dispatch({
            type: 'DELETE_IMAGE',
            payload: {imageId: image.id, galleryId}
        })
    }

    return (
        <Card key={image.id} elevation={10}>
            <CardHeader
                title={image.title}
            />
            <CardMedia
                component="img"
                height="194"
                image={image.url}
                alt={image.title}
            />
            <CardActions disableSpacing>
                <IconButton onClick= {editImage} aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={deleteImage} aria-label="delete">
                    <DeleteForeverIcon  />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default GalleryItem