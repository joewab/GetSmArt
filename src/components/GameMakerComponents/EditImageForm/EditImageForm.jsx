//react,redux,saga stuff---------------------------------
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

//components---------------------------------------------
import LogOutButton from '../../LogOutButton/LogOutButton';
import GalleryList from '../GalleryList/GalleryList';
import MediaPicker from '../MediaPicker/MediaPicker';
import Nav from '../../Nav/Nav';
import UserPage from '../../UserPage/UserPage';
import Theme from '../../_theme/_theme';


//materialUI----------------------------------------------
import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Alert from '@mui/material/Alert';


const drawerWidth = 400

const useStyles = makeStyles({
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    root: {
        display: 'flex',
        fontFamily: 'Quicksand'

    },
    img: {
        width: 400
    },

})



function EditImageForm() {


    //on load, GET the gallery with the matching id-------------------
    useEffect(() => {
        dispatch({
            type: 'EDIT_IMAGE',
            payload: imageId
        });
        dispatch({
            type: 'FETCH_GALLERY',
            payload: galleryId
        });

    }, [])

    const theme = createTheme({
        typography: {
            fontFamily: 'Quicksand'
        }
    })

    //variables that are react functions--------------------------------
    const params = useParams();
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    //variables that evaluate to something specific from the store or params---------
    const galleryId = params.galleryId;
    const imageId = params.imageId;
    const galleryName = params.galleryName;
    const user = useSelector((store) => store.user);
    const gallery = useSelector(store => store.gallery.gallery);
    const imageToEdit = useSelector(store => store.gallery.editImage);
    console.log('imageId in EditImageForm:', imageId);



    //local state--------------------------------------------------------------
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [medium, setMedium] = useState('');

    const handleChange = (event) => {
        setMedium(event.target.value);
    };

    let imageObject = {
        imageUrl,
        description,
        artist,
        title,
        year,
        media: medium
    }


    function handleSubmit(e) {
        e.preventDefault();
        console.log('in handleSubmit, here is data:', imageObject);
        dispatch({
            type: 'UPDATE_IMAGE',
            payload: imageToEdit
        });
        setImageUrl('');
        setDescription('');
        setArtist('');
        setTitle('');
        setYear('');
    }

    function backToAddSlide() {
        history.push(`/addgallery/${galleryId}/${galleryName}`)
    }


    return (user.admin ?
        <>
        <Box mr={50}>
        <Nav />
        </Box>
        <Container spacing={2}>
            <Grid>
                <Grid item xs={7} >
                    <h2>{user.username}'s gallery: {galleryName}</h2>
                    <GalleryList galleryId={galleryId} galleryName={galleryName} imageId={imageId} />
                </Grid>
                <Grid item>
                    <Drawer
                        className={classes.drawer}
                        variant='permanent'
                        anchor='right'
                        classes={{ paper: classes.drawerPaper }}>
                        <Container>
                            <h2>Edit slide below:</h2>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>  <img src={imageToEdit.url} />
                                </Grid>
                                <Grid item key={user.id} xs={8}>
                                    <TextField
                                        label="image url"
                                        value={imageToEdit.url}
                                        onChange={(e) => {
                                            dispatch({
                                                type: 'EDIT_IMAGE_URL',
                                                payload: e.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item key={user.id} xs={8}>
                                    <TextField
                                        label="artist"
                                        value={imageToEdit.artist}
                                        onChange={(e) => {
                                            dispatch({
                                                type: 'EDIT_IMAGE_ARTIST',
                                                payload: e.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item key={user.id} xs={8}>
                                    <TextField
                                        label="title"
                                        value={imageToEdit.title}
                                        onChange={(e) => {
                                            dispatch({
                                                type: 'EDIT_IMAGE_TITLE',
                                                payload: e.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item key={user.id} xs={8}>
                                    <TextField
                                        label="year"
                                        value={imageToEdit.year}
                                        onChange={(e) => {
                                            dispatch({
                                                type: 'EDIT_IMAGE_YEAR',
                                                payload: e.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item key={user.id} xs={8}>
                                    {/* <MediaPicker medium={imageToEdit.media} handleChange={handleChange} */}
                                    <TextField
                                        label="media"
                                        value={imageToEdit.media}
                                        onChange={(e) => {
                                            dispatch({
                                                type: 'EDIT_IMAGE_MEDIA',
                                                payload: e.target.value
                                            })
                                        }} />
                                </Grid>
                                <Grid item key={user.id} xs={8}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="description"
                                        multiline
                                        minRows={4}
                                        value={imageToEdit.description}
                                        variant="outlined"
                                        onChange={(e) => {
                                            dispatch({
                                                type: 'EDIT_IMAGE_DESCRIPTION',
                                                payload: e.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item key={user.id} xs={8}>
                                    <Button variant='contained' color='primary' onClick={handleSubmit}>update slide</Button>
                                </Grid>
                                <Grid item xs={8}>
                                    <Button variant='contained' color='primary' onClick={backToAddSlide}>exit edit mode</Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </Drawer>
                </Grid>
            </Grid>
        </Container>
        </>
        :
        <UserPage />

    );
}

// this allows us to use <App /> in index.js
export default EditImageForm;
