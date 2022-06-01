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
import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';
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

    const [artistAnswerTrue, setArtistAnswerTrue] = useState(false);
    const [titleAnswerTrue, setTitleAnswerTrue] = useState(false);
    const [yearAnswerTrue, setYearAnswerTrue] = useState(false);
    const [mediaAnswerTrue, setMediaAnswerTrue] = useState(false);

    const [artistAnswerFalse, setArtistAnswerFalse] = useState(false);
    const [titleAnswerFalse, setTitleAnswerFalse] = useState(false);
    const [yearAnswerFalse, setYearAnswerFalse] = useState(false);
    const [mediaAnswerFalse, setMediaAnswerFalse] = useState(false);

//other constants-------------------------------------------------------------------
    const gameImage = gallery[gallerySlideNumber-1];



    function handleGoBack(){
        history.push('/allgames')
    }



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
                            <ArtistAnswerForm 
                            artist={artist} setArtist={setArtist} 
                            artistAnswerTrue={artistAnswerTrue} setArtistAnswerTrue={setArtistAnswerTrue} 
                            artistAnswerFalse={artistAnswerFalse} setArtistAnswerFalse={setArtistAnswerFalse} 
                            gameImage={gameImage} />
                        </div>
                        <div>
                            <TitleAnswerForm 
                            title={title} setTitle={setTitle} 
                            titleAnswerTrue={titleAnswerTrue} setTitleAnswerTrue={setTitleAnswerTrue}
                            titleAnswerFalse={titleAnswerFalse} setTitleAnswerFalse={setTitleAnswerFalse} 
                            gameImage={gameImage} />
                        </div>
                        <div>
                            <YearAnswerForm 
                            year={year} setYear={setYear} 
                            yearAnswerTrue={yearAnswerTrue} setYearAnswerTrue={setYearAnswerTrue} 
                            yearAnswerFalse={yearAnswerFalse} setYearAnswerFalse={setYearAnswerFalse} 
                            gameImage={gameImage} />
                        </div>
                        <div>
                            <MediaAnswerForm 
                            media={media} setMedia={setMedia} 
                            mediaAnswerTrue={mediaAnswerTrue} setMediaAnswerTrue={setMediaAnswerTrue}
                            mediaAnswerFalse={mediaAnswerFalse} setMediaAnswerFalse={setMediaAnswerFalse} 
                            gameImage={gameImage}/>
                            {/* <MediaPicker medium={media} /> */}
                            {/* <Button onClick={handleSubmitMedia}>Submit Answer</Button> */}
                        </div>
                        </Box>
                        <Grid item>
                        <GameIncrementButton  setArtistAnswerTrue={setArtistAnswerTrue} 
                                             setTitleAnswerTrue={setTitleAnswerTrue}
                                             setYearAnswerTrue={setYearAnswerTrue}
                                             setMediaAnswerTrue={setMediaAnswerTrue}
                                             setArtistAnswerFalse={setArtistAnswerFalse} 
                                             setTitleAnswerFalse={setTitleAnswerFalse}
                                             setYearAnswerFalse={setYearAnswerFalse}
                                             setMediaAnswerFalse={setMediaAnswerFalse}
                                             galleryId={galleryId} />
                        </Grid>
                        
                        <Button variant='contained' color='primary'onClick={handleGoBack} >Exit Game to Main Menu (score will not be saved)</Button>

                    
                </Grid>
            </Grid>
        </Container>
        </>
    )
}

export default GamePage