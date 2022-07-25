import 'regenerator-runtime'
import './styles/style.css'

//components
import './components/nav-bar.js'
import './components/custom-footer.js'
import './components/movie-list.js'
import './components/go-top.js'

// apis
import { discoverMovies, searchMovie } from './api'

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('nav-bar')
  const movieList = document.querySelector('movie-list')
  const goTopElement = document.querySelector('go-top')

  window.addEventListener('scroll', e => {
    const scrollTop = e.currentTarget.scrollY

    if (scrollTop > 64) {
      goTopElement.hidden = false
    } else {
      goTopElement.hidden = true
    }
  })

  const initialRenderPage = async () => {
    movieList.loading = true
    const { data } = await discoverMovies()
    movieList.movies = data
    movieList.loading = false
    movieList.resetPage()
  }

  const onSearch = async () => {
    if (navbar.searchValue === '') {
      movieList.searchMode = false
      initialRenderPage()
    } else {
      movieList.loading = true
      const { data } = await searchMovie(navbar.searchValue)
      movieList.searchText = navbar.searchValue
      movieList.searchMode = true
      movieList.movies = data
      movieList.loading = false
      movieList.resetPage()
    }
  }

  navbar.searchEvent = onSearch

  initialRenderPage()
})
