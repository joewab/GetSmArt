//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';


//components--------------------------------------------
import Theme from '../../_theme/_theme';

//material--------------------------------------------
import { Grid } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';



function GameLink({ game, allScores }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const storedScore = useSelector(store => store.game.storedScore.score)

    console.log('this is game', game);
    console.log('all scores in gamelink:', allScores);

    function goToGame() {
        history.push(`/game/${game.id}/${game.name}`)
    }

    const placeholder = require('./image-placeholder.png');


    return (
        <>

            <Card key={game.id} xs={4} elevation={5}>
                <CardHeader
                    disableTypography={true}
                    
                    title={game.name}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={game.url ? game.url : placeholder}
                    alt={game.title}
                />
                <CardActions disableSpacing>
                    <Button onClick={goToGame}
                        variant='contained'
                        color='primary'>
                        go to game</Button>
                    {allScores.map((score) => {
                        if (game.id === score.gallery_id) {
                            return (
                                <Typography key={score.id} > Current Score: {score.score}</Typography>
                            )
                        }
                    })}
                </CardActions>
            </Card>

        </>


    )
}

export default GameLink