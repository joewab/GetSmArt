import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGallery(action) {
    let galleryId = action.payload;
    console.log('this is the galleryId:', galleryId);
    try {
        const gallery = yield axios.get(`/api/gallery/${galleryId}`);
        console.log('got this gallery:', gallery.data);
        yield put({ type: 'SET_GALLERY', payload: gallery.data });

    } catch {
        console.log('get gallery error');
    }
        
}

function* fetchGalleries() {
    try{
        const galleries = yield axios.get('/api/galleries');
        console.log('get all galleries:', galleries.data);
        yield put ({
            type: 'SET_GALLERIES',
            payload: galleries.data
        })
    } catch{
        console.log('get all galleries error');
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

function* deleteImage(action){
    try{
        yield axios ({
            method: 'DELETE',
            url: `api/gallery/${action.payload.imageId}`
        });
        yield put({type: 'FETCH_GALLERY',
                    payload: action.payload.galleryId})
    }
    catch{
        console.log('error in deleteImage');
    }
}

function* gallerySaga() {
    yield takeLatest('POST_TO_GALLERY', addImageToGallery);
    yield takeLatest('FETCH_GALLERY', fetchGallery);
    yield takeLatest('INCREMENT_GALLERY', incrementGallery);
    yield takeLatest('DELETE_IMAGE', deleteImage);
    yield takeLatest('FETCH_GALLERIES', fetchGalleries);



  }

export default gallerySaga