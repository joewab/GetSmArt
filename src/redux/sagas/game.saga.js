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

function* updateScore(action) {
    try {
        console.log('action payload in update score saga:', action.payload);
        const gameScore = action.payload;
        yield axios({
            method: 'PUT',
            url: `api/game/${gameScore.gameScore}/${gameScore.userId}/${gameScore.galleryId}`,
        })

    } catch {
        console.log('error updating the score');
    }
}

function* fetchScore(action) {
    try {
        const userId = action.payload.userId;
        const galleryId = action.payload.galleryId;
        const score = yield axios.get(`api/game/${userId}/${galleryId}`);
        yield put({
            type: 'SET_SCORE',
            payload: score.data
        })

    } catch {
        console.log('error in fetchScore in game.saga');
    }
}

function* createNewScore(action) {
    try {
        console.log('action payload in post new score saga:', action.payload);
        const gameScore = action.payload;
        yield axios({
            method: 'POST',
            url: `api/game/${gameScore.gameScore}/${gameScore.userId}/${gameScore.galleryId}`,
        })

    } catch {
        console.log('error posting new score');
    }
}


function* gameSaga() {

    yield takeLatest('INCREMENT_GALLERY', incrementGallery);
    yield takeLatest('UPDATE_SCORE', updateScore);
    yield takeLatest('FETCH_SCORE', fetchScore);
    yield takeLatest('CREATE_NEW_SCORE', createNewScore);



}

export default gameSaga