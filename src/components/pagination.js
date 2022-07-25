import './movie-item.js'

class Pagination extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
  }

  set initialData(data) {
    this._selectedPage = data[0]
    this._numberOfPages = data[1]
    this.render()
  }

  get pageValue() {
    return this._shadowRoot.querySelector('input').value
  }

  set pageValue(value) {
    this._shadowRoot.querySelector('input').value = value
  }

  set buttonEvent(event) {
    this._buttonEvent = this._shadowRoot.querySelector('button')
    this._buttonEvent.addEventListener('click', event)
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

        .container {
          width: 100%
        }

        .page-input-container {
          width: fit-content;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        input {
          width: 70%;
          padding: 8px;
        }

        button {
          border: 0;
          background-color: #EF5B0C;
          padding: 8px;
          border-radius: 4px;
          color: white;
          cursor: pointer;
        }

        .max-page-text {
          text-align: center;
          margin-bottom: 8px;
        }
      </style>
      <div class="container">
      <p class="max-page-text">Max page: ${this._numberOfPages}</p>
        <div class="page-input-container">
          <input type="number" value="${this._selectedPage}" min=1 max=${this._numberOfPages}>
          <button>Change</button>
        </div>
      </div>
    `
  }
}

customElements.define('custom-pagination', Pagination)
