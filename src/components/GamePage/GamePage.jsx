
//react, redux, saga stuff-------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//material stuff-----------------------------------------
import { Button } from '@mui/material';
import { Container } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';


function GamePage(){
    
    const gallery = useSelector(store => store.gallery)


    return(
        
        <Container>
            <Grid>
                <Grid item>
                   <Box component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off">
                       <Typography>Game!</Typography>

                   </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default GamePage