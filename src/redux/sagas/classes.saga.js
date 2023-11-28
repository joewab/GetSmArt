import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* createClass(action) {
    const className = action.payload.newClassName;
    const userId = action.payload.userId;
    try {
        yield axios({
            method: 'POST',
            url: 'api/classes',
            data: { className, userId }
        })
        yield put({
            type: 'FETCH_CLASSES',
            payload: userId
        })
    } catch {
        console.log('error in createGallery');
    }
}

function* fetchClasses(action){
    try{
        const userId = action.payload;
        const classes = yield axios.get(`/api/classes/${userId}`);
        yield put ({
            type: 'SET_CLASSES',
            payload: classes.data
        })

    }catch{
        console.log('error in fetch all classes');
    }
}

function* deleteClass(action){
    try{
        const classId = action.payload.classId;
        const userId = action.payload.userId;
        yield axios({
            method: 'DELETE',
            url: 'api/classes',
            data: { classId, userId }
        })
        yield put({
            type: 'FETCH_CLASSES',
            payload: userId
        })

    }catch{
        console.log('error in fetch all classes');
    }
}


function* classesSaga() {
    
    yield takeLatest('CREATE_CLASS', createClass);
    yield takeLatest('FETCH_CLASSES', fetchClasses);
    yield takeLatest('DELETE_CLASS', deleteClass);


}

export default classesSaga;