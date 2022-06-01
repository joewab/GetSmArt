import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
})(TextField);



function YearAnswerForm({ year, setYear, yearAnswerTrue, setYearAnswerTrue, yearAnswerFalse, setYearAnswerFalse, gameImage }) {

    const dispatch = useDispatch();

    const handleSubmitYear = () => {
        console.log('in Submit Year');

        if (year && year === gameImage.year) {
            setYearAnswerTrue(true);
            dispatch({
                type: 'CORRECT_ANSWER'
            })
        }

        else if (year !== gameImage.year) {
            setYearAnswerFalse(true);
        }

    }

    if (yearAnswerTrue === true) {

        return (

            <div className='correct-answer'>
                <ValidationTextField
                    label="Correct!"
                    required
                    variant="outlined"
                    defaultValue={year}
                    id="validation-outlined-input"
                />
            </div>
        )
    }

    else if (yearAnswerFalse === true) {
        return (
            <div className='correct-answer'>
                <TextField
                    error
                    id="outlined-error-helper-text"
                    label="incorrect!"
                    defaultValue={year}
                    onChange={(event) => setYear(event.target.value)}
                />
                <Button variant='contained' color='primary' onClick={handleSubmitYear}>Submit Answer</Button>
            </div>
        )
    }


    return (
        <div className='correct-answer'>
            <TextField
                required
                id="outlined-required"
                label="Year required"
                defaultValue=''
                onChange={(event) => setYear(event.target.value)}
            />
            <Button variant='contained' color='primary' onClick={handleSubmitYear}>Submit Answer</Button>
        </div>
    )

}

export default YearAnswerForm;