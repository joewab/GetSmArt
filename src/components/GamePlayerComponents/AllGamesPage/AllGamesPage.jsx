//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';


//components--------------------------------------------

import GameLink from '../GameLink/GameLink';
import Nav from '../../Nav/Nav';

//material--------------------------------------------
import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { Button } from '@material-ui/core';
import { TextField } from '@mui/material';



function AllGamesPage() {

    useEffect(() => {
        dispatch({ type: 'FETCH_GALLERIES' });
    }, []);

    const dispatch = useDispatch();
    const history = useHistory();

    const galleries = useSelector(store => store.gallery.galleries)
    console.log('here are all the galleries', galleries);

    

    return (
        <Container>
            <Nav/>
            <Grid container spacing={2}>
               
                {galleries.map((game) => {
                    return(
                        <GameLink key={game.id} game={game} />
                    )
                })}
                
            </Grid>
        </Container>
    )
}

export default AllGamesPage