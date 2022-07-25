import './search-bar.js'

class NavBar extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
  }

  set searchEvent(event) {
    const searchBar = this._shadowRoot.querySelector('search-bar')
    searchBar.clickEvent = event
  }

  get searchValue() {
    return this._shadowRoot.querySelector('search-bar').value
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }

        header {
          width: 100%;
          height: 56px;
          background-color: #003865;
          color: white;
          padding: 0 16px;
        }

        nav {
          width: 100%;
          height: 100%;
          padding: 3px 0;
          display: flex;
          align-items: center;
        }

        div, search-bar {
          flex: 1
        }

        search-bar {
          display: flex;
          justify-content: flex-end;
        }
      </style>
      <header>
        <nav>
          <div>
            <img src="assets/logo-white.svg" alt="logo">
          </div>
          <search-bar></search-bar>
        </nav>
      </header>
    `
  }
}

customElements.define('nav-bar', NavBar)
