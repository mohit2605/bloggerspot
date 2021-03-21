import {CLEAR_REDUCER_STATE} from '../action/common';
import {REQUEST_AUTHOR_LIST_SUCCESS} from '../action/authorActions';
const initialState = {
  authorList: [],
};

const autherReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTHOR_LIST_SUCCESS:
      return {
        ...state,
        authorList: action.data,
      };
    case CLEAR_REDUCER_STATE:
      return initialState;
    default:
      return state;
  }
};

export default autherReducer;
