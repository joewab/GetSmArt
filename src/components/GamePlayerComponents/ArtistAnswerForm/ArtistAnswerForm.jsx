import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';


function ArtistAnswerForm({artist, setArtist, artistAnswer, setArtistAnswer, gameImage}) {

    const dispatch = useDispatch();

    const handleSubmitArtist = () => {
        console.log('in Submit Artist');
        if(artist && artist === gameImage.artist){
            setArtistAnswer(true);
            dispatch({
                type: 'CORRECT_ANSWER'
            })
        }
        console.log(artistAnswer);
    }

    if(artistAnswer===true){

        return(
            <Card sx={{minHeight: 50,
                       background: '#66b266',
                       textAlign: 'center',
                       }}>
            <Typography sx={{margin: 2,
                             color: '#dbefdc'}}>
                {gameImage.artist} is correct!</Typography>
            </Card>
        )
    }


    return (
        <div>
            <TextField
                required
                id="outlined-required"
                label="artist required"
                defaultValue=''
                onChange={(event) => setArtist(event.target.value)}
            />
            <Button onClick={handleSubmitArtist}>Submit Answer</Button>
        </div>
    )

}

export default ArtistAnswerForm;