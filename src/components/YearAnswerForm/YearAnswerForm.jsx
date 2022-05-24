import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';


function YearAnswerForm({year, setYear, yearAnswer, setYearAnswer, gameImage}) {

    const handleSubmitYear = () => {
        console.log('in Submit Year');
        if(year && year === gameImage.year){
            setYearAnswer(true);
        }
        console.log(yearAnswer);
    }

    if(yearAnswer===true){
        return(
            <Card sx={{minHeight: 50,
                       background: '#66b266',
                       textAlign: 'center',
                       }}>
            <Typography sx={{margin: 2,
                             color: '#dbefdc'}}>
                {gameImage.year} is correct!</Typography>
            </Card>
        )
    }


    return (
        <div>
            <TextField
                required
                id="outlined-required"
                label="Year required"
                defaultValue=''
                onChange={(event) => setYear(event.target.value)}
            />
            <Button onClick={handleSubmitYear}>Submit Answer</Button>
        </div>
    )

}

export default YearAnswerForm;