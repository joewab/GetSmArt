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



function MediaAnswerForm({ media, setMedia, mediaAnswerTrue, setMediaAnswerTrue, mediaAnswerFalse, setMediaAnswerFalse, gameImage }) {

    const dispatch = useDispatch();

    const handleSubmitMedia = () => {
        console.log('in Submit Media');

        if (media && media === gameImage.media) {
            setMediaAnswerTrue(true);
            dispatch({
                type: 'CORRECT_ANSWER'
            })
        }

        else if (media !== gameImage.media) {
            setMediaAnswerFalse(true);
        }

        console.log(mediaAnswerTrue);
    }

    if (mediaAnswerTrue === true) {

        return (

            <div className='correct-answer'>
                <ValidationTextField
                    label="Correct!"
                    required
                    variant="outlined"
                    defaultValue={media}
                    id="validation-outlined-input"
                />
            </div>
        )
    }

    else if (mediaAnswerFalse === true) {
        return (
            <div className='correct-answer'>
                <TextField
                    error
                    id="outlined-error-helper-text"
                    label="incorrect!"
                    defaultValue={media}
                    onChange={(event) => setMedia(event.target.value)}
                />
                <Button variant='contained' color='primary' onClick={handleSubmitMedia}>Submit Answer</Button>
            </div>
        )
    }


    return (
        <div className='correct-answer'>
            <TextField
                required
                id="outlined-required"
                label="Media required"
                defaultValue=''
                onChange={(event) => setMedia(event.target.value)}
            />
            <Button variant='contained' color='primary' onClick={handleSubmitMedia}>Submit Answer</Button>
        </div>
    )

}

export default MediaAnswerForm;