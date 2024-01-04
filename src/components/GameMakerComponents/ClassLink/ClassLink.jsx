//react, redux, saga -------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory } from 'react-router-dom';

//materialUI--------------------------------------------
import { Button, Typography } from '@material-ui/core';
import { Card, CardContent, CardHeader, CardActions } from '@material-ui/core';


function ClassLink({ thisClass }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const placeholder= require('./image-placeholder.png');


    function goToClassGalleries() {
        history.push(`/gallery/${thisClass.class_name}/${thisClass.id}`);
    }

    function deleteClass() {
        const classId = thisClass.id;
        const userId = user.id;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Class!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch({
                        type: 'DELETE_CLASS',
                        payload: {classId, userId}
                    })
                    swal("The Class has been deleted", {
                        icon: "success",
                    });
                } else {
                    swal("Your Class is safe");
                }
            });
    }

    return (
        <>
            <Card key={0} xs={4} elevation={5}>
                <CardHeader
                    disableTypography={true}
                    title={thisClass.class_name}
                />
                <CardContent>
                    <Typography>
                        Class information goes here
                    </Typography>
                </CardContent>
                
                <CardActions disableSpacing>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={goToClassGalleries}
                    >
                    go to Class Galleries
                </Button>
                <Button 
                    style={ !user.admin ? {display: "none"} : null}
                    onClick={deleteClass}
                    variant='outlined'>
                    delete Class
                </Button>
                </CardActions>
            </Card>
        </>
    )
}

export default ClassLink