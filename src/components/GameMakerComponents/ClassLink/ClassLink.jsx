//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory } from 'react-router-dom';

//components--------------------------------------------

//material--------------------------------------------
import { Button } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';



function ClassLink({ thisClass }) {


    const history = useHistory();
    const dispatch = useDispatch();

    function goToClassGalleries() {
        console.log('classes:', thisClass);
        //history.push(`/gallery/${newClass}`);
    }

    // function goToClass() {
    //     history.push(`/addClass/${gal.id}/${gal.name}`)
    // }

    // function deleteClass() {
    //     console.log('in deleteClass');
    //     swal({
    //         title: "Are you sure?",
    //         text: "Once deleted, you will not be able to recover this Class!",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //     })
    //         .then((willDelete) => {
    //             if (willDelete) {
    //                 dispatch({
    //                     type: 'DELETE_Class',
    //                     payload: gal.id
    //                 })
    //                 swal("The Class has been deleted", {
    //                     icon: "success",
    //                 });
    //             } else {
    //                 swal("Your Class is safe");
    //             }
    //         });

    // }

    const placeholder = require('./image-placeholder.png');

    return (
        <>

            <Card key={0} xs={4} elevation={5}>
                <CardHeader
                    disableTypography={true}
                    title={thisClass.class_name}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={placeholder}
                    alt={thisClass.name}
                />
                <CardActions disableSpacing>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={goToClassGalleries}
                    >
                    go to Class</Button>

                <Button 
                    //onClick={deleteClass}
                    variant='outlined'>
                    delete Class</Button>
                </CardActions>
            </Card>

        </>
    )
}

export default ClassLink