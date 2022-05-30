//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

//components--------------------------------------------

//material--------------------------------------------
import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Card } from '@material-ui/core';



function GameLink({ game }) {
    const history = useHistory();
    const dispatch = useDispatch();

    console.log('this is game', game);

    function goToGame() {
        history.push(`/game/${game.id}/${game.name}`)
    }

    return (
        <>
            <Grid item key={game.id} xs={4}>
                <Card>
                    <Typography>{game.name}</Typography>
                    <Button onClick={goToGame}
                        variant='filled'>
                        go to game</Button>
            
                </Card>
            </Grid>
        </>
    )
}

export default GameLink