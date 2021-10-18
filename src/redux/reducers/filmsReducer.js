import {GET_FILMS} from '../actions/actions_types';
import {SET_LOADER} from '../actions/actions_types';
import {SET_PAGE} from '../actions/actions_types';
const initialState = {
  films: [],
  loader: false,
  page: 1,
};

function filmReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FILMS:
      return {...state, films: action.payload};
    case SET_LOADER:
      return {...state, loader: action.payload};
    case SET_PAGE:
      return {...state, page: action.payload};
    default:
      return state;
  }
}

export default filmReducer;
