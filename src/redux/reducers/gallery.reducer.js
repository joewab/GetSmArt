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

const galleryCount = (state = 0, action) => {
    switch (action.type) {
        case 'NEXT_IMAGE':
            return state + 1;
        default:
            return state;
    }
}

export default combineReducers({
    image,
    gallery,
    galleryCount
  });