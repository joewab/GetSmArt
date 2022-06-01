import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { createTheme, ThemeProvider } from '@material-ui/core';

const drawerWidth = 400


const Theme = createTheme({
    palette: {
        primary: {
            main: '#666666',
            contrastText: '#e1f0e2'
        },
        secondary: {
            main: '#e1f0e2',
            contrastText: '#9fc8a5'
        }
    },

    typography: {
        fontFamily: 'Quicksand'
    },

    MuiTextField: {
        primary: '#86c736',
        secondary: '#c7363e'
    }

})

export default Theme