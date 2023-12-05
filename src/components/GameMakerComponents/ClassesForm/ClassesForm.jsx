import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

//components---------------------------------------------
import Nav from "../../Nav/Nav";
import ClassLink from "../ClassLink/ClassLink";

//materialUI----------------------------------------------
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { TextField } from "@material-ui/core";
import { Box } from "@material-ui/core";

function ClassesForm() {
  useEffect(() => {
    dispatch({ type: "FETCH_CLASSES", payload: user.id });
  }, []);

  //react methods---------------------------------------------------------
  const dispatch = useDispatch();
  const history = useHistory();

  //from the redux store------------------------------------------------
  const user = useSelector((store) => store.user);
  const classes = useSelector((store) => store.classes.classes);

  //local state--------------------------------------------------------------
  const [newClassName, setNewClassName] = useState("");

  function createClass() {
    if (newClassName === "") {
      swal("Please enter a class name!");
      return false;
    }
    dispatch({
      type: "CREATE_CLASS",
      payload: {newClassName, userId: user.id},
    });
  }

  return (
    <>
      <Nav />
      <Container className="all-classes-view">
        <Grid style={ !user.admin ? {display: "none"} : null}>
          <Grid item>
            <Typography>{user.username}</Typography>
          </Grid>
          <Grid item>
            <Typography>create new class:</Typography>
          </Grid>
          <Grid>
            <TextField
              required
              id="outlined-required"
              label="new class name"
              defaultValue={newClassName}
              onChange={(event) => setNewClassName(event.target.value)}
            />
            <Button variant="outlined" onClick={createClass}>
              create new class
            </Button>
          </Grid>
        </Grid>
        <Box pt={1} mb={5}>
          {" "}
        </Box>
        <Grid container spacing={5}>
          {classes.map((thisClass) => {
            return (
              <Grid item key={thisClass.id} xs={4} sx={{ m: 200 }}>
                <ClassLink thisClass={thisClass} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default ClassesForm;
