//react, redux, sagas-------------------------------------------------
import React from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

// components--------------------------------------------------------
import GamePage from '../GamePlayerComponents/GamePage/GamePage';
import LogOutButton from '../LogOutButton/LogOutButton';
import AllGalleriesPage from '../GameMakerComponents/AllGalleriesPage/AllGalleriesPage';
import AllGamesPage from '../GamePlayerComponents/AllGamesPage/AllGamesPage';

//material------------------------------------------------------

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  if(user.admin===true){
    return(
      <AllGalleriesPage/>
    )
  }

  else{

  return (
    <>
      <AllGamesPage/>
    </>
  );}
}

// this allows us to use <App /> in index.js
export default UserPage;
