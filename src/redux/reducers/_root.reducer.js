import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import gallery from './gallery.reducer';
import game from './game.reducer';
import classes from './classes.reducer'

// rootReducer is the primary reducer for the entire project
// It bundles up all of the other reducers so the project can use them.
// This is imported in index.js as rootSaga

const rootReducer = combineReducers({
  errors,
  user,
  gallery,
  game,
  classes
});

export default rootReducer;
