import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import TeacherPage from '../TeacherPage/TeacherPage';
import GamePage from '../GamePage/GamePage';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  if(user.admin===true){
    return(
      <TeacherPage/>
    )
  }

  else{

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <GamePage/>
      <LogOutButton className="btn" />
    </div>
  );}
}

// this allows us to use <App /> in index.js
export default UserPage;
