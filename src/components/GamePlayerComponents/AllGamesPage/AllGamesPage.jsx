//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import Theme from '../../_theme/_theme';


//components--------------------------------------------

import GameLink from '../GameLink/GameLink';
import Nav from '../../Nav/Nav';

//material--------------------------------------------
import { Grid } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core';




function AllGamesPage() {

    useEffect(() => {
        dispatch({ type: 'FETCH_GALLERIES' });
        dispatch({ type: 'FETCH_SCORES' });
    }, []);

    const dispatch = useDispatch();
    const history = useHistory();

    const galleries = useSelector(store => store.gallery.galleries);
    const allScores = useSelector(store => store.game.allScores);
    console.log('all scores:', allScores);
    console.log('here are all the galleries', galleries);

    

    return (
        <>
        <Nav/>
        <Container>
            
            <Grid container spacing={2}>
               
               
                {galleries.map((game) => {
                    
                    return(
                        <GameLink key={game.id} game={game} allScores={allScores} />
                    )
               
                })}
                
            </Grid>
        </Container>
        </>
    )
}

export default AllGamesPage