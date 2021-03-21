import axios from 'axios';
import {
  GET_AUTHORS,
  GET_COMMENTS,
  GET_LIKES,
  GET_POSTS,
  DEFAU,
  DEFAULT_ERROR_RESPONSE,
} from '../const/ApiConst';
import {DEFAULT_PAGINATION_DATA} from '../const/AppConst';
import idx from 'idx';

export const getAuthors = (data) => {
  const pagesToLoad = idx(data, (_) => _.page) || DEFAULT_PAGINATION_DATA.PAGE;
  const pageLimit = idx(data, (_) => _.limit) || DEFAULT_PAGINATION_DATA.LIMIT;
  return axios
    .get(`${GET_AUTHORS}?_page=${pagesToLoad}&_limit=${pageLimit}`, {
      headers: {},
    })
    .then((res) => {
      console.log(res.status);
      const responseData = idx(res, (_) => _.data);
      const status = idx(res, (_) => _.status);
      return {status, data: responseData};
    })
    .catch((error) => {
      console.log(error);
      const status = idx(error, (_) => _.response.status);
      const eData =
        idx(error, (_) => _.response.data) || DEFAULT_ERROR_RESPONSE;
      return {status, data: eData};
    });
};

export const getPosts = (data) => {
  const pagesToLoad = idx(data, (_) => _.page) || DEFAULT_PAGINATION_DATA.PAGE;
  const pageLimit = idx(data, (_) => _.limit) || DEFAULT_PAGINATION_DATA.LIMIT;
  return axios
    .get(`${GET_POSTS}?_page=${pagesToLoad}&_limit=${pageLimit}`, {
      headers: {},
    })
    .then((res) => {
      console.log(res.status);
      const responseData = idx(res, (_) => _.data);
      const status = idx(res, (_) => _.status);
      return {status, data: responseData};
    })
    .catch((error) => {
      console.log(error);
      const status = idx(error, (_) => _.response.status);
      const eData =
        idx(error, (_) => _.response.data) || DEFAULT_ERROR_RESPONSE;
      return {status, data: eData};
    });
};

export const getLikes = (data) => {
  const pagesToLoad = idx(data, (_) => _.page) || DEFAULT_PAGINATION_DATA.PAGE;
  const pageLimit = idx(data, (_) => _.limit) || DEFAULT_PAGINATION_DATA.LIMIT;
  return axios
    .get(`${GET_LIKES}?_page=${pagesToLoad}&_limit=${pageLimit}`, {
      headers: {},
    })
    .then((res) => {
      console.log(res.status);
      const responseData = idx(res, (_) => _.data);
      const status = idx(res, (_) => _.status);
      return {status, data: responseData};
    })
    .catch((error) => {
      console.log(error);
      const status = idx(error, (_) => _.response.status);
      const eData =
        idx(error, (_) => _.response.data) || DEFAULT_ERROR_RESPONSE;
      return {status, data: eData};
    });
};

export const getComments = (data) => {
  const pagesToLoad = idx(data, (_) => _.page) || DEFAULT_PAGINATION_DATA.PAGE;
  const pageLimit = idx(data, (_) => _.limit) || DEFAULT_PAGINATION_DATA.LIMIT;
  return axios
    .get(`${GET_COMMENTS}?_page=${pagesToLoad}&_limit=${pageLimit}`, {
      headers: {},
    })
    .then((res) => {
      console.log(res.status);
      const responseData = idx(res, (_) => _.data);
      const status = idx(res, (_) => _.status);
      return {status, data: responseData};
    })
    .catch((error) => {
      console.log(error);
      const status = idx(error, (_) => _.response.status);
      const eData =
        idx(error, (_) => _.response.data) || DEFAULT_ERROR_RESPONSE;
      return {status, data: eData};
    });
};
