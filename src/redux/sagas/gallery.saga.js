import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGallery(action) {
    let galleryName = action.payload;
    console.log('this is the galleryName:', galleryName);
    try {
        const gallery = yield axios.get(`/api/gallery/${galleryName}`);
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

function* createGallery(action) {
    const galleryName = action.payload;
    console.log('this is galleryName in createGallery:',galleryName);
    try{
        yield axios({
            method: 'POST',
            url: 'api/galleries',
            data: {galleryName}
        })
        yield put({
            type:'FETCH_GALLERY',
            payload: galleryName
        })
    } catch{
        console.log('error in createGallery');
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
                    payload: action.payload.galleryName})
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
    yield takeLatest('CREATE_GALLERY', createGallery);




  }

export default gallerySaga