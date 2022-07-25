class MovieItem extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
  }

  set movie(movie) {
    this._movie = movie
  }

  set clickEvent(event) {
    this._clickEvent = event
    this.render()
  }

  get id() {
    return this._shadowRoot.querySelector('input').value
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        :host {
          display: block;
          flex-basis: 100%;
        }

        .card {
          border-radius: 8px;
          padding: 16px;
          background-color: white;
          width: 300px;
          min-height: 525px;
          margin: 0 auto;
          box-shadow: -1px 6px 19px -12px rgba(0, 0, 0, 0.68);
          -webkit-box-shadow: -1px 6px 19px -12px rgba(0, 0, 0, 0.68);
          -moz-box-shadow: -1px 6px 19px -12px rgba(0, 0, 0, 0.68);
          cursor: pointer;
        }

        .card-image {
          object-fit: cover;
          width: 100%;
          height: 350px;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-title {
          height: 3em;
          overflow: hidden;
        }

        .card-vote {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media screen and (min-width: 640px) {
          :host {
            flex-basis: 50%;
          }
        }

        @media screen and (min-width: 900px) {
          :host {
            flex-basis: 33.3%;
          }
        }
      </style>

      <div class="card">
        <input type="hidden" value="${this._movie.id}">
        <div>
          <img
            src="https://image.tmdb.org/t/p/w500${this._movie.poster_path}"
            class="card-image"
          />
        </div>
        <div class="card-content">
          <h3 class="card-title">
            ${
              this._movie.original_title.length > 44
                ? this._movie.original_title.slice(44) + '...'
                : this._movie.original_title
            }
          </h3>
          <p>${this._movie.release_date}</p>
          <div class="card-vote">
            <img src="assets/star.svg" />
            <p>${this._movie.vote_average}</p>
          </div>
        </div>
      </div>
    `

    this._shadowRoot
      .querySelector('.card')
      .addEventListener('click', this._clickEvent)
  }
}

customElements.define('movie-item', MovieItem)
