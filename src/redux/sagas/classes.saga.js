import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* createClass(action) {
    const className = action.payload;
    console.log('this is className in createClass:', className);
    try {
        yield axios({
            method: 'POST',
            url: 'api/classes',
            data: { className }
        })
        yield put({
            type: 'FETCH_CLASSES'
        })
    } catch {
        console.log('error in createGallery');
    }
}

function* fetchClasses(){
    try{
        const classes = yield axios.get('/api/classes');
        yield put ({
            type: 'SET_CLASSES',
            payload: classes.data
        })

    }catch{
        console.log('error in fetch all classes');
    }
}


function* classesSaga() {
    
    yield takeLatest('CREATE_CLASS', createClass);
    yield takeLatest('FETCH_CLASSES', fetchClasses);

}

export default classesSaga;