import {call, put} from 'redux-saga/effects';
import {
  REQUEST_AUTHOR_LIST_ERROR,
  REQUEST_AUTHOR_LIST_SUCCESS,
} from '../action/authorActions';
import {getAuthors} from '../Api';

export function* authorSaga(action) {
  try {
    const res = yield call(getAuthors, action.data);
    const status = res.status;
    const data = res.data;
    if (status === 200) {
      yield put({type: REQUEST_AUTHOR_LIST_SUCCESS, data,});
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
