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

  //variables that are react functions--------------------------------
  const dispatch = useDispatch();
  const history = useHistory();

  //variables that evaluate to something specific from the store or params---------
  const user = useSelector((store) => store.user);
  const classes = useSelector((store) => store.classes.classes);

  //local state--------------------------------------------------------------
  const [newClassName, setNewClassName] = useState("");
  const [newClass, setNewClass] = React.useState("");

  function createClass() {
    console.log("in createClass");
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
        <Grid>
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
