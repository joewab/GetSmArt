
//react, redux, saga stuff-------------------------------
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//components---------------------------------------------
import MediaPicker from '../MediaPicker/MediaPicker';
import ArtistAnswerForm from '../ArtistAnswerForm/ArtistAnswerForm';
import TitleAnswerForm from '../TitleAnswerForm/TitleAnswerForm';
import YearAnswerForm from '../YearAnswerForm/YearAnswerForm';
import MediaAnswerForm from '../MediaAnswerForm/MediaAnswerForm';

//material stuff-----------------------------------------
import { Button } from '@mui/material';
import { Container } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';


const useStyles = makeStyles({
    root: {
        display: 'flex'
    },
    img: {
        height: 400
    }

})

function GamePage() {

    useEffect(() => {
        dispatch({ type: 'FETCH_GALLERY', 
                   payload: 1});
    }, []);



    const classes = useStyles();
    const gallery = useSelector(store => store.gallery.gallery);
    const gallerySlideNumber = useSelector(store => store.gallery.galleryCount)
    const dispatch = useDispatch();

    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [media, setMedia] = useState('');

    const [artistAnswer, setArtistAnswer] = useState(false);
    const [titleAnswer, setTitleAnswer] = useState(false);
    const [yearAnswer, setYearAnswer] = useState(false);
    const [mediaAnswer, setMediaAnswer] = useState(false);


    console.log('this is gallery on gamepage:', gallery);
    const gameImage = gallery[gallerySlideNumber];
    console.log('this is the image showing:', gameImage);


    const handleGallerySlideIncrement = () => {
        dispatch({
            type: 'INCREMENT_GALLERY',
        })
        setArtistAnswer(false);
        setTitleAnswer(false);
        setYearAnswer(false);
        setMediaAnswer(false);
    }



    return (

        <Container className={classes.root}>
            <Grid>
                <Grid item xs={6}>
                    <img className={classes.img} src={gameImage && gameImage.url} />
                </Grid>
                <Grid item xs={6}>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <Typography>slide: {gallerySlideNumber+1} / {gallery.length}</Typography>
                        <div>
                            <ArtistAnswerForm artist={artist} setArtist={setArtist} artistAnswer={artistAnswer} setArtistAnswer={setArtistAnswer} gameImage={gameImage} />
                        </div>
                        <div>
                            <TitleAnswerForm title={title} setTitle={setTitle} titleAnswer={titleAnswer} setTitleAnswer={setTitleAnswer} gameImage={gameImage} />
                        </div>
                        <div>
                            <YearAnswerForm year={year} setYear={setYear} yearAnswer={yearAnswer} setYearAnswer={setYearAnswer} gameImage={gameImage} />
                        </div>
                        <div>
                            <MediaAnswerForm media={media} setMedia={setMedia} mediaAnswer={mediaAnswer} setMediaAnswer={setMediaAnswer} gameImage={gameImage}/>
                            {/* <MediaPicker medium={media} /> */}
                            {/* <Button onClick={handleSubmitMedia}>Submit Answer</Button> */}
                        </div>
                        <Button onClick={handleGallerySlideIncrement}>Skip to next</Button>

                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default GamePage