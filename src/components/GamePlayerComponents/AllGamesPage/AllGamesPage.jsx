//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//components--------------------------------------------

import GameLink from '../GameLink/GameLink';
import Nav from '../../Nav/Nav';

//material--------------------------------------------
import { Grid } from '@material-ui/core';
import { Container } from '@material-ui/core';

function AllGamesPage() {

    useEffect(() => {
        dispatch({ 
            type: 'FETCH_GALLERIES',
            //TBD give students a class landing page so the className and id can be passed in
            payload: {className: 'Art 101', classId: '1'}
         });
        dispatch({ type: 'FETCH_SCORES' });
    }, []);

    const dispatch = useDispatch();
    const history = useHistory();

    const galleries = useSelector(store => store.gallery.galleries);
    const allScores = useSelector(store => store.game.allScores);

    return (
        <>
        <Nav/>
        <Container>
            <Grid container spacing={2}>
                {galleries.map((game) => {
                    return(
                        <Grid item key={game.id} spacing={2} xs={4}>
                        <GameLink key={game.id} game={game} allScores={allScores} />
                        </Grid>
                        )
                    }
                )}
            </Grid>
        </Container>
        </>
    )
}

export default AllGamesPage