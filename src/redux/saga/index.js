import {takeLatest} from 'redux-saga/effects';
import {REQUEST_AUTHOR_LIST} from '../action/authorActions';
import {authorSaga} from './autherSaga';

export function* watcherSaga() {
  yield takeLatest(REQUEST_AUTHOR_LIST, authorSaga);
}
