import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGallery(action) {
    let galleryId = action.payload;
    try {
        const gallery = yield axios.get(`/api/gallery/${galleryId}`);
        yield put({ type: 'SET_GALLERY', payload: gallery.data });

    } catch {
        console.log('get gallery error');
    }

}

function* fetchGalleries(action) {
    try {
        const className = action.payload.className;
        const classId = action.payload.classId;
        const galleries = yield axios.get(`/api/galleries/${className}/${classId}`);
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
    const galleryName = action.payload.newGalleryName;
    const classId = action.payload.classId;
    try {
        yield axios({
            method: 'POST',
            url: 'api/galleries',
            data: { galleryName, classId }
        })
        yield put({
            type: 'FETCH_GALLERIES'
        })
    } catch {
        console.log('error in createGallery');
    }
}

function* deleteImage(action) {
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
        });
        yield put({
            type: 'FETCH_GALLERIES'
        });
    } catch {
        console.log('error in deleteGallery');
    }
}

function* editImage(action) {
    try {
        const imageId = action.payload
        const oneImage = yield axios.get(`/api/image/${imageId}`);
        yield put({
            type: 'GET_ONE_IMAGE',
            payload: oneImage.data
        });
    } catch {
        console.log('error in editImage');
    }
}

function* updateImage(action) {
    try {
        const imageToEdit = action.payload;
        yield axios({
            method: 'PUT',
            url: `/api/image/${imageToEdit.id}`,
            data: imageToEdit
        });
        yield put({
            type: 'GET_ONE_IMAGE',
            payload: imageToEdit
        });
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