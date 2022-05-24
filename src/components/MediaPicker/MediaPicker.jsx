import React from 'react';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';

const media = [
    {
        value: 'oil paint',
        label: 'oil paint',
    },
    {
        value: 'ink',
        label: 'ink',
    },
    {
        value: 'tempera',
        label: 'tempera',
    },
    {
        value: 'watercolor',
        label: 'watercolor',
    },
    {
        value: 'acrylic',
        label: 'acrylic',
    },
    {
        value: 'etching',
        label: 'etching',
    },
];

function MediaPicker({medium, handleChange}){

    // const [medium, setMedium] = React.useState('');

    // const handleChange = (event) => {
    //     setMedium(event.target.value);
    // };

    return(
<TextField
id="outlined-select"
select
label="select media"
defaultValue=''
value={medium && medium}
onChange={handleChange}
helperText="Please select media"
>
{media.map((option) => (
    <MenuItem key={option.value} value={option.value}>
        {option.label}
    </MenuItem>
))}
</TextField>
    )

}

export default MediaPicker
