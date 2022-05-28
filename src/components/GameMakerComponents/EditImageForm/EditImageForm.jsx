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


//materialUI----------------------------------------------
import { Button } from '@mui/material';
import { Container } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

const drawerWidth = 400

const useStyles = makeStyles({
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    root: {
        display: 'flex'
    },
    img: {
        width: 400
    }

})



function EditImageForm() {


    //on load, GET the gallery with the matching id-------------------
    useEffect(() => {
        dispatch({
            type: 'FETCH_GALLERY',
            payload: galleryId
        });
        dispatch({
            type: 'EDIT_IMAGE',
            payload: {imageId, galleryId}
        });
    }, [])

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
    const imageToEdit = useSelector(store => store.gallery.editImage)
    console.log('image to edit:', imageToEdit);



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

    function backToAddSlide(){
        history.push(`/addgallery/${galleryId}/${galleryName}`)
    }


    return ( imageToEdit ? 
        <div key={user.id} className={classes.root}>
            <Container>
                <Nav />
                <h2>{user.username}'s gallery: {galleryName}</h2>
                <h2>Edit slide below:</h2>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <img src = {imageToEdit.url} />
                    </Grid>
                    <Grid item key={user.id} xs={6}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                               
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="artist"
                                    defaultValue={imageToEdit.artist}
                                    onChange={(e) => {
                                        dispatch({
                                          type: 'EDIT_IMAGE_ARTIST',
                                          payload: e.target.value
                                        })
                                      }}
                                
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="title"
                                    defaultValue={imageToEdit.title}
                                    onChange={(e) => {
                                        dispatch({
                                          type: 'EDIT_IMAGE_TITLE',
                                          payload: e.target.value
                                        })
                                      }}
                                    
                                
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="year"
                                    defaultValue={imageToEdit.year}
                                    onChange={(e) => {
                                        dispatch({
                                          type: 'EDIT_IMAGE_YEAR',
                                          payload: e.target.value
                                        })
                                      }}
                                    
                                />
                                {/* <MediaPicker medium={imageToEdit.media} handleChange={handleChange} */}
                                 <TextField
                                 required
                                 id="outlined-required"
                                 label="media"
                                 defaultValue={imageToEdit.media}
                                onChange={(e) => {
                                    dispatch({
                                      type: 'EDIT_IMAGE_MEDIA',
                                      payload: e.target.value
                                    })
                                  }} />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="description"
                                    defaultValue={imageToEdit.description}
                                    onChange={(e) => {
                                        dispatch({
                                          type: 'EDIT_IMAGE_DESCRIPTION',
                                          payload: e.target.value
                                        })
                                      }}

                                />
                            </div>
                            <Button onClick={handleSubmit}>update slide</Button>
                            <Button onClick={backToAddSlide}>back to add a new slide</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            


            <Drawer
                className={classes.drawer}
                variant='permanent'
                anchor='right'
                classes={{ paper: classes.drawerPaper }}>
                <GalleryList galleryId={galleryId} galleryName={galleryName}/>
            </Drawer>
        </div>
    :<>fail</>

    );
}

// this allows us to use <App /> in index.js
export default EditImageForm;