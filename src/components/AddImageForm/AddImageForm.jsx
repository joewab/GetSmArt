//react,redux,saga stuff---------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';

//components---------------------------------------------
import LogOutButton from '../LogOutButton/LogOutButton';
import GalleryList from '../GalleryList/GalleryList';
import MediaPicker from '../MediaPicker/MediaPicker';
import Nav from '../Nav/Nav';


//materialUI----------------------------------------------
import { Button } from '@mui/material';
import { Container } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

const drawerWidth = 300

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
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    console.log('this is params:',params);

    const galleryId = params.id;
    const user = useSelector((store) => store.user);
    const gallery = useSelector(store => store.gallery.gallery)
    const image = useSelector(store => store.image);

    console.log('this is galleryId:', galleryId);

    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    // const [media, setMedia] = useState('');

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


    function handleSubmit(e) {
        e.preventDefault();
        console.log('in handleSubmit, here is data:', imageObject);
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

    return (    
            <div key={user.id} className={classes.root}>
                <Container>
                <Nav/>
                <h2>{user.username}'s gallery: {galleryId}</h2>
                <h2>Add a slide below:</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
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
                                        label="image url required"
                                        defaultValue={imageUrl}
                                        onChange={(event) => setImageUrl(event.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="description required"
                                        defaultValue={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="artist required"
                                        defaultValue={artist}
                                        onChange={(event) => setArtist(event.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="title required"
                                        defaultValue={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="year required"
                                        defaultValue={year}
                                        onChange={(event) => setYear(event.target.value)}
                                    />
                                    <MediaPicker medium={medium} handleChange={handleChange} />
                                </div>
                                <Button onClick={handleSubmit}>submit</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>

                <Drawer
                    className={classes.drawer}
                    variant='permanent'
                    anchor='right'
                    classes={{ paper: classes.drawerPaper }}>
                    <GalleryList galleryId={galleryId}/>
                </Drawer>
            </div>
        

    );
}

// this allows us to use <App /> in index.js
export default AddImageForm;
