import { discoverMovies, getMovieDetails, searchMovie } from '../api/index.js'
import './movie-item.js'
import './pagination.js'
import './movie-board.js'

class MovieList extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._selectedPage = 1
    this._loading = false
  }

  set movies(movies) {
    this._movies = movies
  }

  set searchMode(searchMode) {
    this._searchMode = searchMode
  }

  set loading(loading) {
    this._loading = loading
    if (loading) {
      this.renderLoading()
    } else {
      this.render()
    }
  }

  get loading() {
    return this._loading
  }

  set searchText(searchText) {
    this._searchText = searchText
  }

  resetPage() {
    this._shadowRoot.querySelector('custom-pagination').pageValue = 1
  }

  renderLoading() {
    this._shadowRoot.innerHTML = ''
    this._shadowRoot.innerHTML = `
      <style>
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }

      .container {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
      }

      .loader {
        border: 16px solid #EF5B0C;
        border-top: 16px solid #003865;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      </style>
      <div class="container">
        <div class="loader"></div>
      </div>
    `
  }

  render() {
    this._shadowRoot.innerHTML = ''
    this._shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }

        .card-container {
          display: flex;
          width: 100%;
          flex-wrap: wrap;
        }
      </style>
      <movie-board></movie-board>
    `

    if (this._movies?.results?.length) {
      const cardContainer = document.createElement('div')
      cardContainer.classList.add('card-container')

      this._movies.results.forEach(movie => {
        const itemElement = document.createElement('movie-item')
        itemElement.movie = movie
        itemElement.clickEvent = async () => {
          try {
            const { data } = await getMovieDetails(movie.id)
            document.body.style.overflowY = 'hidden'
            document.querySelector('go-top').hidden = true
            const movieBoardElement =
              this._shadowRoot.querySelector('movie-board')
            movieBoardElement.movie = data
          } catch (e) {
            console.log(e)
          }
        }
        itemElement.style.marginBottom = '24px'
        cardContainer.appendChild(itemElement)
      })

      this._shadowRoot.appendChild(cardContainer)
      const pageElement = document.createElement('custom-pagination')
      pageElement.initialData = [this._selectedPage, this._movies.total_pages]
      pageElement.buttonEvent = async () => {
        this.loading = true
        this._selectedPage = pageElement.pageValue
        if (
          this._selectedPage > this._movies.total_pages ||
          this._selectedPage <= 0
        )
          return alert('Out of range!')
        if (!this._searchMode) {
          const { data } = await discoverMovies(Number(this._selectedPage))
          this._movies = data
        } else {
          const { data } = await searchMovie(
            this._searchText,
            Number(this._selectedPage)
          )
          this._movies = data
        }
        this.loading = false
      }

      this._shadowRoot.appendChild(pageElement)
    } else {
      const cardContainer = document.createElement('div')
      cardContainer.classList.add('card-container')

      const p = document.createElement('p')
      p.innerText = 'Not found'

      cardContainer.appendChild(p)
      this._shadowRoot.appendChild(cardContainer)
    }
  }
}

customElements.define('movie-list', MovieList)
