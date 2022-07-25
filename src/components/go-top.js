class GoTop extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._hidden = true
  }

  connectedCallback() {
    this.render()
  }

  set hidden(hidden) {
    this._hidden = hidden
    this.render()
  }

  render() {
    const navbar = document.querySelector('nav-bar')
    this._shadowRoot.innerHTML = `
      <style>
        .arrow-up-container {
          position: fixed;
          right: 8px;
          bottom: 4px;
          display: ${this._hidden ? 'none' : 'block'};
          cursor: pointer;
        }
      </style>
      <div class="arrow-up-container">
        <img src="assets/arrow-up-circle.svg" alt="arrow up" width="44px">
      </div>
    `
    this._shadowRoot.addEventListener('click', () => {
      navbar.scrollIntoView({ behavior: 'smooth' })
    })
  }
}

customElements.define('go-top', GoTop)
