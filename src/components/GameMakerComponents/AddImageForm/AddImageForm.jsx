//react,redux,saga stuff---------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';

//components---------------------------------------------
import LogOutButton from '../../LogOutButton/LogOutButton';
import GalleryList from '../GalleryList/GalleryList';
import MediaPicker from '../MediaPicker/MediaPicker';
import Nav from '../../Nav/Nav';
import UserPage from '../../UserPage/UserPage';


//materialUI----------------------------------------------
import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import {Grid} from '@material-ui/core';
import {Drawer} from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { SwipeableDrawer } from '@material-ui/core';


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



function AddImageForm() {
    useEffect(() => {
        dispatch({
            type: 'FETCH_GALLERY',
            payload: galleryId
        })
    }, [])



    const params = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();


    const galleryId = params.galleryId;
    const galleryName = params.galleryName;
    const user = useSelector((store) => store.user);


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
        media: medium,
        galleryId
    }

    function populateFields(){
        setImageUrl('http://joeanthonybrown.com/02-large-images/studio-1/studio1-20.jpg');
        setDescription('A promising young artist!');
        setArtist('Joe Anthony-Brown');
        setTitle('The Excited One');
        setYear('2015');
        setMedium('oil on panel');
    }


    function handleSubmit(e) {
        e.preventDefault();
        dispatch({
            type: 'POST_TO_GALLERY',
            payload: imageObject
        });
        setImageUrl('');
        setDescription('');
        setArtist('');
        setTitle('');
        setYear('');
        setMedium('');
    }

    return (user.admin ?
        <>
        <Box mr={50}>
        <Nav/>
        </Box>
        <Container spacing={2}>
            <Grid >
                <Grid item xs={7}>
                    
                </Grid>
                <Grid item xs={7} >
                <h2>{user.username}'s gallery: {galleryName}</h2>
                <GalleryList galleryId={galleryId} galleryName={galleryName} />
                </Grid>
                <Grid item xs={6}>
                <Drawer
                    className={classes.drawer}
                    variant='permanent'
                    anchor='right'
                    classes={{ paper: classes.drawerPaper }}>
                    <Container>
                        <h2 onClick = {populateFields}>Add a slide to the gallery:</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={8} >
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="image url required"
                                        value={imageUrl}
                                        defaultValue=''
                                        onChange={(event) => setImageUrl(event.target.value)}
                                        
                                    />
                                   </Grid>
                                   <Grid item xs={8}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="artist required"
                                        value={artist}
                                        defaultValue=''
                                        onChange={(event) => setArtist(event.target.value)}
                                    />
                                    </Grid>
                                    <Grid item xs={8}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="title required"
                                        value={title}
                                        defaultValue=''
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                    </Grid>
                                    <Grid item xs={8}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="year required"
                                        value={year}
                                        defaultValue=''
                                        onChange={(event) => setYear(event.target.value)}
                                    />
                                    </Grid>
                                    <Grid item xs={8}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="media required"
                                        value={medium}
                                        defaultValue=''
                                        onChange={(event) => setMedium(event.target.value)}
                                    />
                                    </Grid>
                                    <Grid item xs={8}>
                                     <TextField
                                        id="outlined-multiline-static"
                                        label="description required"
                                        multiline
                                        minRows={4}
                                        value={description}
                                        defaultValue=''
                                        variant="outlined"
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    </Grid>
                                    <Grid item xs={8}>
                                <Button variant='contained' onClick={handleSubmit}>submit</Button>

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
export default AddImageForm;
