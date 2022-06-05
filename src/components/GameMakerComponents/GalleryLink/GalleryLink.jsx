//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory } from 'react-router-dom';

//components--------------------------------------------

//material--------------------------------------------
import { Button } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';



function GalleryLink({ gal }) {

    useEffect(() => {
        dispatch({
            type: 'FETCH_GALLERY',
            payload: gal.id
        });

    }, [])


    const history = useHistory();
    const dispatch = useDispatch();

    const galleryImages = useSelector(store => store.gallery.gallery);

    function goToGallery() {
        history.push(`/addgallery/${gal.id}/${gal.name}`)
    }

    function deleteGallery() {
        console.log('in deleteGallery');
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this gallery!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch({
                        type: 'DELETE_GALLERY',
                        payload: gal.id
                    })
                    swal("The gallery has been deleted", {
                        icon: "success",
                    });
                } else {
                    swal("Your gallery is safe");
                }
            });

    }

    const placeholder = require('./image-placeholder.png');

    return (
        <>

            <Card key={gal.id} xs={4} elevation={5}>
                <CardHeader
                    disableTypography={true}
                    title={gal.name}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={gal.url ? gal.url : placeholder}
                    alt={gal.title}
                />
                <CardActions disableSpacing>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={goToGallery}>
                    go to gallery</Button>

                <Button onClick={deleteGallery}
                    variant='outlined'>
                    delete gallery</Button>
                </CardActions>
            </Card>

        </>
    )
}

export default GalleryLink