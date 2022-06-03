import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import { Typography } from '@material-ui/core';


function PreviousScore(){

const storedScore = useSelector(store => store.game.storedScore.score);

console.log('stored score on previous score component:',storedScore);

    return (
        storedScore ?
        <Typography>Your previous score for this gallery: {storedScore}</Typography>

        :

        <Typography>Good Luck!</Typography>
        )
    }

    

    

    
       
    


export default PreviousScore;