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
import Theme from '../../_theme/_theme';

//material stuff-----------------------------------------
import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@material-ui/core';



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


//constants that are react functions--------------------------------------------------
    const params = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();


//constants that evaluate to specific values using react functions----------------
    const galleryId = params.galleryId;
    const gallery = useSelector(store => store.gallery.gallery);
    const gallerySlideNumber = useSelector(store => store.game.galleryCount);
    const gameScore = useSelector(store => store.game.gameScore);
    const user = useSelector(store => store.user);
    const storedScore = useSelector(store => store.game.storedScore)

   
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



    function handleGoBack(){
        history.push('/allgames')
    }



    return (
        <>
        <Nav/>
        <ThemeProvider>
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
                        </Box>
                        <Grid item>
                        <GameIncrementButton  setArtistAnswer={setArtistAnswer} 
                                             setTitleAnswer={setTitleAnswer}
                                             setYearAnswer={setYearAnswer}
                                             setMediaAnswer={setMediaAnswer}
                                             galleryId={galleryId} />
                        </Grid>
                        
                        <Button variant='contained' color='primary'onClick={handleGoBack} >Exit Game to Main Menu (score will not be saved)</Button>

                    
                </Grid>
            </Grid>
        </Container>
        </ThemeProvider>
        </>
    )
}

export default GamePage