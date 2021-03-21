import {CLEAR_REDUCER_STATE} from '../action/common';
import {
  REQUEST_AUTHOR_LIST_SUCCESS,
  REQUEST_COMMENTS_BY_POST_SUCCESS,
  REQUEST_COMMENT_LIST_SUCCESS,
  REQUEST_LIKES_LIST_SUCCESS,
  REQUEST_POST_LIST_SUCCESS,
} from '../action/authorActions';
const initialState = {
  authorList: [],
  likesList: [],
  commentList: [],
  postList: [],
  commentsByPost: [],
};

const autherReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTHOR_LIST_SUCCESS:
      return {
        ...state,
        authorList: action.data,
      };
    case REQUEST_LIKES_LIST_SUCCESS:
      return {
        ...state,
        likesList: action.data,
      };
    case REQUEST_COMMENT_LIST_SUCCESS:
      return {
        ...state,
        commentList: action.data,
      };
    case REQUEST_POST_LIST_SUCCESS:
      return {
        ...state,
        postList: action.data,
      };
    case REQUEST_COMMENTS_BY_POST_SUCCESS:
      return {
        ...state,
        commentsByPost: action.data,
      };
    case CLEAR_REDUCER_STATE:
      return initialState;
    default:
      return state;
  }
};

export default autherReducer;
