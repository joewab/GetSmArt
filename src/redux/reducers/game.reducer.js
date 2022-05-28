import { combineReducers } from 'redux';


const galleryCount = (state = 0, action) => {
    switch (action.type) {
        case 'NEXT_IMAGE':
            return state + 1;
        default:
            return state;
    }
}


export default combineReducers({
    galleryCount
});