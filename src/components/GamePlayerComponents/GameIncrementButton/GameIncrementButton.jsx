import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';


import { Button } from '@material-ui/core';



function GameIncrementButton({setArtistAnswerTrue, 
                              setTitleAnswerTrue, 
                              setYearAnswerTrue, 
                              setMediaAnswerTrue,
                              setArtistAnswerFalse, 
                              setTitleAnswerFalse, 
                              setYearAnswerFalse, 
                              setMediaAnswerFalse, 
                                galleryId}) {

    const dispatch = useDispatch();
    const history = useHistory();

    const gallery = useSelector(store => store.gallery.gallery);
    const gallerySlideNumber = useSelector(store => store.game.galleryCount);
    const gameScore = useSelector(store => store.game.gameScore);
    const user = useSelector(store => store.user);
    const storedScore = useSelector(store => store.game.storedScore)


    const handleGallerySlideIncrement = () => {
        if(gallerySlideNumber < gallery.length){
        dispatch({
            type: 'INCREMENT_GALLERY',
        })
        setArtistAnswerTrue(false);
        setTitleAnswerTrue(false);
        setYearAnswerTrue(false);
        setMediaAnswerTrue(false);
        setArtistAnswerFalse(false);
        setTitleAnswerFalse(false);
        setYearAnswerFalse(false);
        setMediaAnswerFalse(false);}
    }

    const handleFinishGame = () => {
        console.log('game finished!');
        history.push('/allgames');
        dispatch({
            type: 'FINISH_GAME'
        })
        storedScore ? 
        dispatch({
            type: 'UPDATE_SCORE',
            payload: { gameScore, userId: user.id, galleryId }
        })
        
        :
        
        dispatch({
            type: 'CREATE_NEW_SCORE',
            payload: { gameScore, userId: user.id, galleryId }
        })
        

    }


    if(gallerySlideNumber < gallery.length){
    return (
        <Button onClick={handleGallerySlideIncrement}>Skip to next</Button>
    )
    }
    else {
        return(
            <Button onClick={handleFinishGame}>Exit Game</Button>
        )
    }
}

export default GameIncrementButton
