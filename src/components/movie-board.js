class MovieBoard extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
  }

  set movie(movie) {
    this._movie = movie
    this.render()
  }

  render() {
    this._shadowRoot.innerHTML = ''
    let genreElement = ''

    for (let i = 0; i < this._movie.genres.length; i++) {
      genreElement += `
        <div class="genre-item">
          ${this._movie.genres[i].name}
        </div>
      `
    }

    this._shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          width: 100%;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .sub-container {
          width: 100%;
          height: 98vh;
          background-color: rgba(0, 0, 0, 0.9);
          border-radius: 16px;
          margin: 8px;
          position: relative;
          color: white;
          overflow-y: auto;
          display: flex;
          justify-content: center;
        }

        .content {
          max-width: 1024px;
          width: 100%;
          margin-top: 56px;
          padding: 8px;
        }

        .image {
          width: 100%;
          height: 300px;
          border-radius: 8px;
          object-fit: cover;
        }

        .info-container {
          margin-top: 16px
        }

        .info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .genre-container {
          display: flex;
          align-items: center;
          gap: 4px;
          color: black;
          font-size: 0.75em;
          flex-wrap: wrap;
        }

        .genre-item {
          border-radius: 4px;
          background-color: white;
          border: 1px solid #000;
          padding: 10px;
        }

        .star {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .star-text {
          font-size: 0.75em;
          font-weight: bold;
        }

        .info-title {
          rgba(255, 255, 255, 0.6)
        }

        .info-em {
          font-weight: bold; color: white
        }

        .overview-container {
          margin: 24px 8px 0 8px;
          padding-bottom: 24px;
          max-width: 1024px;
        }

        .close-btn {
          position: fixed;
          top: 24px;
          right: 24px;
          cursor: pointer;
        }

        @media screen and (min-width: 426px) {
          .content {
            display: flex;
            gap: 16px;
          }
        }

        @media screen and (min-width: 769px) {
          .image {
            width: 750px;
            height: 500px;
          }
        }
      </style>
      <div class="container">
        <div class="sub-container">
          <div>
            <div class="content">
              <img
                src="https://image.tmdb.org/t/p/w500${this._movie.poster_path}"
                class="image"
              />
              <div class="info-container">
                <div class="info">
                  <h3>${this._movie.original_title}</h3>
                  <div class="genre-container">${genreElement}</div>
                  <div class="star">
                    <img src="assets/star.svg" />
                    <p class="star-text">${this._movie.vote_average}</p>
                  </div>
                  <p class="info-title">
                    Status:
                    <span class="info-em">${this._movie.status}</span>
                  </p>
                  <p class="info-title">
                    Year:
                    <span class="info-em"
                      >${this._movie.release_date.slice(0, 4)}</span
                    >
                  </p>
                </div>
              </div>
            </div>
            
            <div class="close-btn">
              <img src="assets/x.svg" alt="close" />
            </div>
            
            <div class="overview-container">
              <p class="info-title info-em">Overview:</p>
              <p>
                ${this._movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    `

    this._shadowRoot
      .querySelector('.close-btn')
      .addEventListener('click', () => {
        this._shadowRoot.innerHTML = ``
        document.body.style.overflowY = 'visible'
      })
  }
}

customElements.define('movie-board', MovieBoard)
