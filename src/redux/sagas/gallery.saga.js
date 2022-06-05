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
    try {
        const galleries = yield axios.get('/api/galleries');
        console.log('get all galleries:', galleries.data);

        let filteredGalleries = []

        let currentId = 0

        function filterGalleries(array) {
            for(let i=0; i<array.length; i++){
                if(array[i].id !== currentId){
                    filteredGalleries.push(array[i]);
                    currentId = array[i].id
                }
            }
            return true
        }

        filterGalleries(galleries.data);

        console.log('Filtered Gallery from fetch galleries:', filteredGalleries);

        yield put({
            type: 'SET_GALLERIES',
            payload: filteredGalleries
        })
    } catch {
        console.log('get all galleries error');
    }
}

function* addImageToGallery(action) {
    const image = action.payload;
    console.log('to add to gallery:', image);
    try {
        yield axios({
            method: 'POST',
            url: '/api/gallery',
            data: image
        });
        yield put({
            type: 'FETCH_GALLERY',
            payload: image.galleryId
        })
    }
    catch {
        console.log('problem with post image saga');
    }
}

function* createGallery(action) {
    const galleryName = action.payload;
    console.log('this is galleryName in createGallery:', galleryName);
    try {
        yield axios({
            method: 'POST',
            url: 'api/galleries',
            data: { galleryName }
        })
        yield put({
            type: 'FETCH_GALLERIES'
        })
    } catch {
        console.log('error in createGallery');
    }
}

function* deleteImage(action) {
    console.log('in deleteImage', action);
    try {
        yield axios({
            method: 'DELETE',
            url: `api/gallery/${action.payload.imageId}`,
            data: action.payload
        });
        yield put({
            type: 'FETCH_GALLERY',
            payload: action.payload.galleryId
        })
    }
    catch {
        console.log('error in deleteImage');
    }
}

function* deleteGallery(action) {
    try {
        yield axios({
            method: 'DELETE',
            url: `api/galleries/${action.payload}`
        })
        yield put({
            type: 'FETCH_GALLERIES'
        })

    } catch {
        console.log('error in deleteGallery');
    }

}

function* editImage(action) {
    try {

        const imageId = action.payload
        console.log('payload from edit image:', action.payload);
        const oneImage = yield axios.get(`/api/image/${imageId}`);
        console.log('data for one image from edit button:', oneImage.data);
        yield put({
            type: 'GET_ONE_IMAGE',
            payload: oneImage.data
        })


    } catch {
        console.log('error in editImage');
    }
}
function* updateImage(action) {
    try {
        const imageToEdit = action.payload;
        console.log('payload from update image:', imageToEdit);
        console.log('image to edit id:', imageToEdit.id);
        yield axios({
            method: 'PUT',
            url: `/api/image/${imageToEdit.id}`,
            data: imageToEdit
        })

        yield put({
            type: 'GET_ONE_IMAGE',
            payload: imageToEdit
        })


    } catch {
        console.log('error in editImage');
    }
}

function* gallerySaga() {
    yield takeLatest('POST_TO_GALLERY', addImageToGallery);
    yield takeLatest('FETCH_GALLERY', fetchGallery);
    yield takeLatest('DELETE_IMAGE', deleteImage);
    yield takeLatest('FETCH_GALLERIES', fetchGalleries);
    yield takeLatest('CREATE_GALLERY', createGallery);
    yield takeLatest('DELETE_GALLERY', deleteGallery);
    yield takeLatest('EDIT_IMAGE', editImage);
    yield takeLatest('UPDATE_IMAGE', updateImage);
}

export default gallerySaga