import {takeLatest} from 'redux-saga/effects';
import {
  REQUEST_AUTHOR_LIST,
  REQUEST_COMMENTS_BY_POST,
  REQUEST_COMMENT_LIST,
  REQUEST_LIKES_LIST,
  REQUEST_POST_LIST,
} from '../action/authorActions';
import {
  authorSaga,
  commentSaga,
  commentsByPostSaga,
  likeSaga,
  postSaga,
} from './autherSaga';

export function* watcherSaga() {
  yield takeLatest(REQUEST_AUTHOR_LIST, authorSaga);
  yield takeLatest(REQUEST_POST_LIST, postSaga);
  yield takeLatest(REQUEST_LIKES_LIST, likeSaga);
  yield takeLatest(REQUEST_COMMENT_LIST, commentSaga);
  yield takeLatest(REQUEST_COMMENTS_BY_POST, commentsByPostSaga);
}
