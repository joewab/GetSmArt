import { useDispatch } from 'react-redux';

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


            <ValidationTextField
                label="Correct!"

                variant="outlined"
                value={artist ? artist : ''}
                defaultValue=''
                id="validation-outlined-input"
            />

        )
    }

    else if (artistAnswerFalse === true) {
        return (
            <>
                <TextField
                    error
                    id="outlined-error-helper-text"
                    label="artist is incorrect!"
                    value={artist ? artist : ''}
                    defaultValue=''
                    onChange={(event) => setArtist(event.target.value)}
                />
                <Button variant='outlined' color='primary' onClick={handleSubmitArtist}>Submit Answer</Button>
            </>
        )
    }


    return (

        <>
            <TextField

                id="outlined-required"
                label="artist"
                value={artist ? artist : ''}
                defaultValue=''
                onChange={(event) => setArtist(event.target.value)}
            />
            <Button variant='outlined' color='primary' onClick={handleSubmitArtist}>Submit Answer</Button>
        </>

    )

}

export default ArtistAnswerForm;