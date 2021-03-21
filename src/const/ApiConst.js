import {COMMON_STRINGS} from '../const/Strings';
export const BASE_URL = 'http://localhost:8081';

export const GET_AUTHORS = `${BASE_URL}/authors`;
export const GET_POSTS = `${BASE_URL}/posts`;
export const GET_COMMENTS = `${BASE_URL}/comments`;
export const GET_LIKES = `${BASE_URL}/likes`;

export const DEFAULT_ERROR_RESPONSE = {
  status: 500,
  error: 'common_error',
  error_description: COMMON_STRINGS.DEFAULT_ERROR_MESSAGE,
};
