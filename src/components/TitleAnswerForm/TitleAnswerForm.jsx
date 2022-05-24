import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';


function TitleAnswerForm({title, setTitle, titleAnswer, setTitleAnswer, gameImage}) {

    const handleSubmitTitle = () => {
        console.log('in Submit Title');
        if(title && title === gameImage.title){
            setTitleAnswer(true);
        }
        console.log(titleAnswer);
    }

    if(titleAnswer===true){
        return(
            <Card sx={{minHeight: 50,
                       background: '#66b266',
                       textAlign: 'center',
                       }}>
            <Typography sx={{margin: 2,
                             color: '#dbefdc'}}>
                {gameImage.title} is correct!</Typography>
            </Card>
        )
    }


    return (
        <div>
            <TextField
                required
                id="outlined-required"
                label="title required"
                defaultValue=''
                onChange={(event) => setTitle(event.target.value)}
            />
            <Button onClick={handleSubmitTitle}>Submit Answer</Button>
        </div>
    )

}

export default TitleAnswerForm;