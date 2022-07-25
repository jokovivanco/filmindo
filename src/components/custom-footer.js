class CustomFooter extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
  }

  // connectedCallback() {
  //   this.render()
  // }

  // render() {
  //   this._shadowRoot.innerHTML = `
  //     <h1>Aku shadowRoot dari Navbar</h1>
  //   `
  // }
}

customElements.define('custom-footer', CustomFooter)
