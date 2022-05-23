import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGallery() {
    try {
        const gallery = yield axios.get('/api/gallery');
        console.log('get all:', gallery.data);
        yield put({ type: 'SET_GALLERY', payload: gallery.data });

    } catch {
        console.log('get gallery error');
    }
        
}

function* addImageToGallery(action){
    try{
        const imagePost = yield axios.post('/api/gallery');
        console.log('in post route, posting:', action.payload);
        yield put({type: 'ADD_IMAGE', payload: action.payload})
    }
    catch{

    }
}

function* gallerySaga() {
    yield takeLatest('POST_TO_GALLERY', addImageToGallery);
    yield takeLatest('FETCH_GALLERY', fetchGallery);
  }

export default gallerySaga