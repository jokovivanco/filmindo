import { searchMovie, discoverMovies } from '../api'

class SearchBar extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._movieList = document.querySelector('movie-list')
  }

  set clickEvent(event) {
    this._clickEvent = event
    this.render()
  }

  get value() {
    return this._shadowRoot.getElementById('search-input').value
  }

  get valueBurger() {
    return this._shadowRoot.getElementById('search-input-burger').value
  }

  connectedCallback() {
    this.render()
  }

  async initialRenderPage() {
    this._movieList.loading = true
    const { data } = await discoverMovies()
    this._movieList.movies = data
    this._movieList.loading = false
    this._movieList.resetPage()
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        div#search-container {
          position: relative;
          width: 100%;
          display: none;
          justify-content: flex-end;
        }

        input {
          height: 32px;
          width: 100%;
          padding: 4px 32px 4px 12px;
          border: 0;
          border-radius: 16px;
        }

        input:focus {
          outline: none;
        }

        button {
          position: absolute;
          right: 8px;
          border: 0;
          top: 50%;
          transform: translateY(-50%);
          background-color: transparent;
          cursor: pointer;
        }

        .burger-input {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 60px;
          box-shadow: 1px 1px 8px 0 rgba(0,0,0,0.25);
          -webkit-box-shadow: 1px 1px 8px 0 rgba(0,0,0,0.25);
          -moz-box-shadow: 1px 1px 8px 0 rgba(0,0,0,0.25);
          width: 80%;
        }

        @media screen and (min-width: 426px) {
          div#search-container {
            display: flex;
          }

          div#burger {
            display: none;
          }
        }

        @media screen and (min-width: 769px) {
          input {
            width: 80%;
          }
        }

        @media screen and (min-width: 1441px) {
          input {
            width: 60%;
          }
        }
      </style>
      <div id="burger">
        <img src="assets/search-white.svg" alt="menu" id="search-burger">
        <input type="text" id="search-input-burger" placeholder="Search for any movies..." autoComplete="off" class="burger-input">
      </div>
      <div id="search-container">
        <input type="text" id="search-input" placeholder="Search for any movies..." autoComplete="off">
        <button id="search-button" type="submit">
          <img src="assets/search.svg" alt="search icon">
        <button>
      </div>
    `
    this._shadowRoot
      .getElementById('search-button')
      .addEventListener('click', this._clickEvent)

    const burgerInput = this._shadowRoot.querySelector('.burger-input')
    burgerInput.style.display = 'none'

    burgerInput.addEventListener('keypress', async e => {
      if (e.keyCode === 13 || e.which === 13) {
        if (this.valueBurger === '') {
          this._movieList.searchMode = false
          this.initialRenderPage()
        } else {
          this._movieList.loading = true
          const { data } = await searchMovie(this.valueBurger)
          this._movieList.searchText = this.valueBurger
          this._movieList.searchMode = true
          this._movieList.movies = data
          this._movieList.loading = false
          this._movieList.resetPage()
        }

        burgerInput.style.display = 'none'
      }
    })

    this._shadowRoot
      .getElementById('search-burger')
      .addEventListener('click', () => {
        const hidden = burgerInput.style.display === 'none'
        if (hidden) {
          burgerInput.style.display = 'block'
        } else {
          burgerInput.style.display = 'none'
        }
      })
  }
}

customElements.define('search-bar', SearchBar)
