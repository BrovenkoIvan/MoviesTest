import {GET_FILMS} from './actions_types';
import {SET_LOADER} from './actions_types';
import {SET_PAGE} from './actions_types';

export const getFilms = (films, page) => {
  try {
    return async dispatch => {
      dispatch({
        type: SET_LOADER,
        payload: true,
      });
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=0bb3209701f49c7b6738282c26794276&language=en-US&page=${page}`,
      ).then(response => {
        response
          .json()
          .then(json => {
            dispatch({
              type: GET_FILMS,
              payload: [],
              payload: [...films, ...json.results],
            });
          })
          .then(() =>
            dispatch({
              type: SET_PAGE,
              payload: 1,
              payload: page + 1,
            }),
          )
          .catch(error => console.log(error))
          .finally(() =>
            dispatch({
              type: SET_LOADER,
              payload: false,
            }),
          );
      });
    };
  } catch (error) {
    console.log(error);
  }
};
