//react, redux, saga----------------------------------------------
import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//componenets----------------------------------------------------
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AllGalleriesPage from '../GameMakerComponents/AllGalleriesPage/AllGalleriesPage';
import AddImageForm from '../GameMakerComponents/AddImageForm/AddImageForm';
import EditImageForm from '../GameMakerComponents/EditImageForm/EditImageForm';
import AllGamesPage from '../GamePlayerComponents/AllGamesPage/AllGamesPage';
import GamePage from '../GamePlayerComponents/GamePage/GamePage';
import Theme from '../_theme/_theme';
import swal from 'sweetalert';

import './App.css';

import { ThemeProvider } from '@material-ui/core';

function App() {
  const dispatch = useDispatch();

  

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);


  return (
    <ThemeProvider theme={Theme}>
    <Router>
      <div>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>


          <Route
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </Route>

          <ProtectedRoute
            // logged in shows all galleries page
            exact
            path="/gallery/:className/:classId"
          >
            <AllGalleriesPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows all galleries page
            exact
            path="/addgallery/:galleryId/:galleryName"
          >
            <AddImageForm />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows all galleries page
            exact
            path="/editimage/:galleryId/:imageId/:galleryName"
          >
            <EditImageForm />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows all galleries page
            exact
            path="/game/:galleryId/:galleryName"
          >
            <GamePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows all galleries page
            exact
            path="/allgames"
          >
            <AllGamesPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
               <LoginPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
