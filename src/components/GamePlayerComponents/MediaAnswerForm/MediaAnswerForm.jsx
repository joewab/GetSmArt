import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';


function MediaAnswerForm({media, setMedia, mediaAnswer, setMediaAnswer, gameImage}) {

    const dispatch = useDispatch();

    const handleSubmitMedia = () => {
        console.log('in Submit Media');
        if(media && media === gameImage.media){
            setMediaAnswer(true);
            dispatch({
                type: 'CORRECT_ANSWER'
            });
        }
        console.log(mediaAnswer);
    }

    if(mediaAnswer===true){
        return(
            <Card sx={{minHeight: 50,
                       background: '#66b266',
                       textAlign: 'center',
                       }}>
            <Typography sx={{margin: 2,
                             color: '#dbefdc'}}>
                {gameImage.media} is correct!</Typography>
            </Card>
        )
    }


    return (
        <div>
            <TextField
                required
                id="outlined-required"
                label="Media required"
                defaultValue=''
                onChange={(event) => setMedia(event.target.value)}
            />
            <Button onClick={handleSubmitMedia}>Submit Answer</Button>
        </div>
    )

}

export default MediaAnswerForm;