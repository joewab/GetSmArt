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
    const image = action.payload;
    console.log('to add to gallery:',image);
    try{
            yield axios({
                method: 'POST',
                url: '/api/gallery',
                data: { imageUrl: image.imageUrl, 
                    description: image.description, 
                    artist: image.artist,
                    title: image.title,
                    year: image.year,
                    media: image.medium }
            });
            yield put({type: 'FETCH_GALLERY'})
        }  
    catch{
        console.log('problem with post image saga');
    }
}

function* incrementGallery(){
    try{
        yield put ({
            type: 'NEXT_IMAGE'
        });
    }
    catch{
        console.log('error incrementing to next slide');
    }
}

function* gallerySaga() {
    yield takeLatest('POST_TO_GALLERY', addImageToGallery);
    yield takeLatest('FETCH_GALLERY', fetchGallery);
    yield takeLatest('INCREMENT_GALLERY', incrementGallery);

  }

export default gallerySaga