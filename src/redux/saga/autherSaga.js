import {call, put} from 'redux-saga/effects';
import {
  REQUEST_AUTHOR_LIST_ERROR,
  REQUEST_AUTHOR_LIST_SUCCESS,
  REQUEST_COMMENT_LIST_ERROR,
  REQUEST_COMMENT_LIST_SUCCESS,
  REQUEST_LIKES_LIST_ERROR,
  REQUEST_LIKES_LIST_SUCCESS,
  REQUEST_POST_LIST_ERROR,
  REQUEST_POST_LIST_SUCCESS,
} from '../action/authorActions';
import {
  getAuthors,
  getTopCommentedPost,
  getTopLikedPost,
  getPosts,
} from '../Api';

export function* authorSaga(action) {
  try {
    const res = yield call(getAuthors, action.data);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({type: REQUEST_AUTHOR_LIST_SUCCESS, data});
      action.callBack(data);
    } else {
      yield put({type: REQUEST_AUTHOR_LIST_ERROR, data});
      action.callBack(data);
    }
  } catch (error) {
    yield put({type: REQUEST_AUTHOR_LIST_ERROR, error});
    action.callBack(error);
  }
}

export function* postSaga(action) {
  try {
    const res = yield call(getPosts, action.data);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({type: REQUEST_POST_LIST_SUCCESS, data});
      action.callBack(data);
    } else {
      yield put({type: REQUEST_POST_LIST_ERROR, data});
      action.callBack(data);
    }
  } catch (error) {
    yield put({type: REQUEST_POST_LIST_ERROR, error});
    action.callBack(error);
  }
}

export function* likeSaga(action) {
  try {
    const res = yield call(getTopLikedPost, action.data);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({type: REQUEST_LIKES_LIST_SUCCESS, data});
      action.callBack(data);
    } else {
      yield put({type: REQUEST_LIKES_LIST_ERROR, data});
      action.callBack(data);
    }
  } catch (error) {
    yield put({type: REQUEST_LIKES_LIST_ERROR, error});
    action.callBack(error);
  }
}

export function* commentSaga(action) {
  try {
    const res = yield call(getTopCommentedPost, action.data);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({type: REQUEST_COMMENT_LIST_SUCCESS, data});
      action.callBack(data);
    } else {
      yield put({type: REQUEST_COMMENT_LIST_ERROR, data});
      action.callBack(data);
    }
  } catch (error) {
    yield put({type: REQUEST_COMMENT_LIST_ERROR, error});
    action.callBack(error);
  }
}
