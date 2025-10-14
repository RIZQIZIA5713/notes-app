class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="overlay-loading">
        <div class="spinner"></div>
        <p>Memuat catatan...</p>
      </div>
    `;
  }

  show() {
    this.style.display = 'flex';
  }
  
  hide() {
    this.style.display = 'none';
  }
}

customElements.define('loading-indicator', LoadingIndicator);
