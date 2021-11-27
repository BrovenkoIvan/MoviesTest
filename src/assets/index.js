export const img = 'https://image.tmdb.org/t/p/original';
export const apiKey = 'api_key=0bb3209701f49c7b6738282c26794276';
export const videosUrl = (id) =>
   `https://api.themoviedb.org/3/movie/${id}/videos?${apiKey}&language=en-US`;
export const filmInfoUrl = (id) =>
   `https://api.themoviedb.org/3/movie/${id}?${apiKey}&language=en-US`;
