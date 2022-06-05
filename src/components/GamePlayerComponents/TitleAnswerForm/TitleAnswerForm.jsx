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



function TitleAnswerForm({ title, setTitle, titleAnswerTrue, setTitleAnswerTrue, titleAnswerFalse, setTitleAnswerFalse, gameImage }) {

    const dispatch = useDispatch();

    const handleSubmitTitle = () => {
        console.log('in Submit Title');

        if (title && title === gameImage.title) {
            setTitleAnswerTrue(true);
            dispatch({
                type: 'CORRECT_ANSWER'
            })
        }

        else if (title !== gameImage.title) {
            setTitleAnswerFalse(true);
        }

    }

    if (titleAnswerTrue === true) {

        return (

            <div className='correct-answer'>
                <ValidationTextField
                    label="Correct!"
                    variant="outlined"
                    value={title ? title : ''}
                    defaultValue=''
                    id="validation-outlined-input"
                />
            </div>
        )
    }

    else if (titleAnswerFalse === true) {
        return (
            <>
                <TextField
                    error
                    id="outlined-error-helper-text"
                    label="title is incorrect!"
                    value={title ? title : ''}
                    defaultValue=''
                    onChange={(event) => setTitle(event.target.value)}
                />
                <Button variant='outlined' color='primary' onClick={handleSubmitTitle}>Submit Answer</Button>
            </>
        )
    }


    return (
        <>
            <TextField
                id="outlined-required"
                label="Title required"
                value={title ? title : ''}
                defaultValue=''
                onChange={(event) => setTitle(event.target.value)}
            />
            <Button variant='outlined' color='primary' onClick={handleSubmitTitle}>Submit Answer</Button>
        </>
    )

}

export default TitleAnswerForm;