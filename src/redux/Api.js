import axios from 'axios';
import {
  GET_AUTHORS,
  GET_POSTS,
  DEFAULT_ERROR_RESPONSE,
} from '../const/ApiConst';
import {
  DEFAULT_PAGINATION_DATA,
  SORTING_TYPE,
  TOP_COMMENTS_LIMIT,
  TOP_LIKES_LIMIT,
} from '../const/AppConst';
import idx from 'idx';
import Toast from 'react-native-simple-toast';

export const getAuthors = (data) => {
  const pagesToLoad = idx(data, (_) => _.page) || DEFAULT_PAGINATION_DATA.PAGE;
  const pageLimit = idx(data, (_) => _.limit) || DEFAULT_PAGINATION_DATA.LIMIT;
  return axios
    .get(`${GET_AUTHORS}?_page=${pagesToLoad}&_limit=${pageLimit}`, {
      headers: {},
    })
    .then((res) => {
      const responseData = idx(res, (_) => _.data);
      const status = idx(res, (_) => _.status);
      if (pagesToLoad > 1 && responseData.length === 0) {
        Toast.show('No more data found!');
      } else {
        return {status, data: responseData};
      }
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const eData =
        idx(error, (_) => _.response.data) || DEFAULT_ERROR_RESPONSE;
      return {status, data: eData};
    });
};

export const getPosts = (data) => {
  const pagesToLoad = idx(data, (_) => _.page) || DEFAULT_PAGINATION_DATA.PAGE;
  const authorID = idx(data, (_) => _.authorID) || '';
  const pageLimit = idx(data, (_) => _.limit) || DEFAULT_PAGINATION_DATA.LIMIT;
  return axios
    .get(
      `${GET_POSTS}?authorId=${authorID}&_page=${pagesToLoad}&_limit=${pageLimit}`,
      {
        headers: {},
      },
    )
    .then((res) => {
      const responseData = idx(res, (_) => _.data);
      const status = idx(res, (_) => _.status);
      if (pagesToLoad > 1 && responseData.length === 0) {
        Toast.show('No more data found!');
      } else {
        return {status, data: responseData};
      }
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const eData =
        idx(error, (_) => _.response.data) || DEFAULT_ERROR_RESPONSE;
      return {status, data: eData};
    });
};

export const getTopLikedPost = () => {
  return axios
    .get(
      `${GET_POSTS}?_sort=${SORTING_TYPE.NO_OF_LIKES_PARAM}&_order${SORTING_TYPE.DESCENDING}&_limit=${TOP_LIKES_LIMIT}`,
      {
        headers: {},
      },
    )
    .then((res) => {
      const responseData = idx(res, (_) => _.data);
      const status = idx(res, (_) => _.status);
      return {status, data: responseData};
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const eData =
        idx(error, (_) => _.response.data) || DEFAULT_ERROR_RESPONSE;
      return {status, data: eData};
    });
};

export const getTopCommentedPost = () => {
  return axios
    .get(
      `${GET_POSTS}?_sort=${SORTING_TYPE.NO_OF_COMMENTS_PARAM}&_order${SORTING_TYPE.DESCENDING}&_limit=${TOP_COMMENTS_LIMIT}`,
      {
        headers: {},
      },
    )
    .then((res) => {
      const responseData = idx(res, (_) => _.data);
      const status = idx(res, (_) => _.status);
      return {status, data: responseData};
    })
    .catch((error) => {
      const status = idx(error, (_) => _.response.status);
      const eData =
        idx(error, (_) => _.response.data) || DEFAULT_ERROR_RESPONSE;
      return {status, data: eData};
    });
};
