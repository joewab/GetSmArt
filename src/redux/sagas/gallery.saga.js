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
    console.log(image);
    try{
            yield axios({
                method: 'POST',
                url: '/api/gallery',
                data: { imageUrl: image.imageUrl, 
                    description: image.description, 
                    artist: image.artist,
                    title: image.title,
                    year: image.year,
                    media: image.media }
            });
            yield put({type: 'FETCH_GALLERY'})

        }
    
    catch{
        console.log('problem with post image saga');
    }

    //imageUrl: 'Portrait of a man with a Book', description: 'Portrait of a man with a Book', artist: 'Portrait of a man with a Book', title: 'Portrait of a man with a Book', year: 'Portrait of a man with a Book', …}
}

function* gallerySaga() {
    yield takeLatest('POST_TO_GALLERY', addImageToGallery);
    yield takeLatest('FETCH_GALLERY', fetchGallery);
  }

export default gallerySaga