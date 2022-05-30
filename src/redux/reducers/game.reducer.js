import { combineReducers } from 'redux';


const galleryCount = (state = 1, action) => {
    switch (action.type) {
        case 'NEXT_IMAGE':
            return state + 1;
        case 'FINISH_GAME':
            return state = 1;
        default:
            return state;
    }
}

const gameScore = (state = 0, action) => {
    switch (action.type) {
        case 'CORRECT_ANSWER':
            return state + 1;
        case 'FINISH_GAME':
            return state = 0;
        default:
            return state;
    }
}

const storedScore = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SCORE':
            return action.payload
        default:
            return state;
    }
}


export default combineReducers({
    galleryCount,
    gameScore,
    storedScore
});