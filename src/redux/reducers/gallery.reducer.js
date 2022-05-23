import { combineReducers } from 'redux';


const image = (state = {}, action) => {
    if(action.type==='ADD_IMAGE'){
        return action.payload;
    }
    return state;
}

const gallery = (state = [], action) => {
    switch (action.type) {
        case 'SET_GALLERY':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    image,
    gallery,
  });