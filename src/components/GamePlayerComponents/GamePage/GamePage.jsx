//react, redux, saga stuff-------------------------------
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';


//components---------------------------------------------
import MediaPicker from '../../GameMakerComponents/MediaPicker/MediaPicker';
import ArtistAnswerForm from '../ArtistAnswerForm/ArtistAnswerForm';
import TitleAnswerForm from '../TitleAnswerForm/TitleAnswerForm';
import YearAnswerForm from '../YearAnswerForm/YearAnswerForm';
import MediaAnswerForm from '../MediaAnswerForm/MediaAnswerForm';
import Nav from '../../Nav/Nav';
import GameIncrementButton from '../GameIncrementButton/GameIncrementButton';
import PreviousScore from '../PreviousScore/PreviousScore';

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
                   payload: galleryId});
        dispatch({
            type: 'FETCH_SCORE',
            payload: {galleryId, userId: user.id}
        })
    }, []);

    console.log('stored score:', storedScore);

//constants that are react functions--------------------------------------------------
    const params = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();

    console.log('params on game page:', params);

//constants that evaluate to specific values using react functions----------------
    const galleryId = params.galleryId;
    const gallery = useSelector(store => store.gallery.gallery);
    const gallerySlideNumber = useSelector(store => store.game.galleryCount);
    const gameScore = useSelector(store => store.game.gameScore);
    const user = useSelector(store => store.user);
    const storedScore = useSelector(store => store.game.storedScore)

    console.log('storedScore on gamepage:', storedScore);


   
//local state----------------------------------------------------------------
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [media, setMedia] = useState('');

    const [artistAnswer, setArtistAnswer] = useState(false);
    const [titleAnswer, setTitleAnswer] = useState(false);
    const [yearAnswer, setYearAnswer] = useState(false);
    const [mediaAnswer, setMediaAnswer] = useState(false);

//other constants-------------------------------------------------------------------
    const gameImage = gallery[gallerySlideNumber-1];


   



    return (
        <>
        <Nav/>
        <Container className={classes.root}>
            <Grid>
                <PreviousScore/>
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
                        <Typography> score: {gameScore}</Typography>
                        <Typography>slide: {gallerySlideNumber} / {gallery.length}</Typography>
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
                        <GameIncrementButton  setArtistAnswer={setArtistAnswer} 
                                             setTitleAnswer={setTitleAnswer}
                                             setYearAnswer={setYearAnswer}
                                             setMediaAnswer={setMediaAnswer}
                                             galleryId={galleryId} />

                    </Box>
                </Grid>
            </Grid>
        </Container>
        </>
    )
}

export default GamePage