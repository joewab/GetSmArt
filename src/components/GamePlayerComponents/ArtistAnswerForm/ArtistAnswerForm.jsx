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



function ArtistAnswerForm({ artist, setArtist, artistAnswerTrue, setArtistAnswerTrue, artistAnswerFalse, setArtistAnswerFalse, gameImage }) {

    const dispatch = useDispatch();

    const handleSubmitArtist = () => {
        console.log('in Submit Artist');

        if (artist && artist === gameImage.artist) {
            setArtistAnswerTrue(true);
            dispatch({
                type: 'CORRECT_ANSWER'
            })
        }

        else if (artist !== gameImage.artist) {
            setArtistAnswerFalse(true);
        }

        console.log(artistAnswerTrue);
    }

    if (artistAnswerTrue === true) {

        return (

            <div className='correct-answer'>
                <ValidationTextField
                    label="Correct!"
                    required
                    variant="outlined"
                    defaultValue={artist}
                    id="validation-outlined-input"
                />
            </div>
        )
    }

    else if (artistAnswerFalse === true) {
        return (
            <div className='correct-answer'>
                <TextField
                    error
                    id="outlined-error-helper-text"
                    label="incorrect!"
                    defaultValue={artist}
                    onChange={(event) => setArtist(event.target.value)}
                />
                <Button variant='contained' color='primary' onClick={handleSubmitArtist}>Submit Answer</Button>
            </div>
        )
    }


    return (
        <div className='correct-answer'>
            <TextField
                required
                id="outlined-required"
                label="artist required"
                defaultValue=''
                onChange={(event) => setArtist(event.target.value)}
            />
            <Button variant='contained' color='primary' onClick={handleSubmitArtist}>Submit Answer</Button>
        </div>
    )

}

export default ArtistAnswerForm;