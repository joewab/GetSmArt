import { combineReducers } from 'redux';


const image = (state = {}, action) => {
    if (action.type === 'ADD_IMAGE') {
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

const galleries = (state = [], action) => {
    switch (action.type) {
        case 'SET_GALLERIES':
            return action.payload;
        default:
            return state;
    }
}

const editImage = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ONE_IMAGE':
            return action.payload;
        case 'EDIT_IMAGE_ARTIST':
            return (
                { ...state, artist: action.payload }
            )
        case 'EDIT_IMAGE_TITLE':
            return (
                { ...state, title: action.payload }
            )
        case 'EDIT_IMAGE_YEAR':
            return (
                { ...state, year: action.payload }
            )
        case 'EDIT_IMAGE_MEDIA':
            return (
                { ...state, media: action.payload }
            )
        case 'EDIT_IMAGE_DESCRIPTION':
            return (
                { ...state, description: action.payload }
            )
        default:
            return state;
    }
}


export default combineReducers({
    image,
    gallery,
    galleryCount,
    galleries,
    editImage
});