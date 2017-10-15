import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {

    case DELETE_POST:
      return _.omit(state, action.payload);

    case FETCH_POST:
      //  take all of ur existing state, make new key, set value, receive new posts
      return { ...state, [action.payload.data.id]: action.payload.data };

      // treat state object as object, not an array
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');

    default:
    return state;
  }
}
