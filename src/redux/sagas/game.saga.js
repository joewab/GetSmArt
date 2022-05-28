import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* incrementGallery() {
    try {
        yield put({
            type: 'NEXT_IMAGE'
        });
    }
    catch {
        console.log('error incrementing to next slide');
    }
}



function* gameSaga() {
   
    yield takeLatest('INCREMENT_GALLERY', incrementGallery);
}

export default gameSaga