import axios from 'axios'

export const discoverMovies = async (page = 1) => {
  const response = await axios.get(
    // eslint-disable-next-line no-undef
    `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrat`
  )

  return response
}

export const searchMovie = async (searchText, page = 1) => {
  const response = await axios.get(
    // eslint-disable-next-line no-undef
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
  )

  return response
}

export const getMovieDetails = async id => {
  const response = await axios.get(
    // eslint-disable-next-line no-undef
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
  )

  return response
}
