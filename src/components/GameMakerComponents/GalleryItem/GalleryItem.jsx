import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import {Card} from '@material-ui/core';
import {CardHeader} from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CardActions } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';

const useStyles = makeStyles({

    root: {
        fontFamily: 'Quicksand'
    },
})


function GalleryItem({ image, galleryId, galleryName }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('galleryName in GalleryItem component:', galleryName);

    const theme = createTheme({
        typography: {
            fontFamily: 'Quicksand'
        }
    })

    const editImage = () => {
        dispatch({
            type: 'EDIT_IMAGE',
            payload: image.id
        });
        history.push(`/editimage/${galleryId}/${image.id}/${galleryName}`);
    }

    const deleteImage = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this slide!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch({
                    type: 'DELETE_IMAGE',
                    payload: {imageId: image.id, galleryId}
                })
              swal("The slide has been deleted", {
                icon: "success",
              });
            } else {
              swal("Your slide is safe");
            }
          });
    }

    return (
        <Card elevation={5}>
            <CardHeader
                subheader={image.title}
            />
            <CardMedia
                component="img"
                height="194"
                image={image.url}
                alt={image.title}
                onClick={editImage}
            />
            <CardActions disableSpacing>       
                <IconButton onClick={deleteImage} aria-label="delete">
                    <DeleteForeverIcon  />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default GalleryItem