class CustomAlert extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="alert-overlay">
        <div class="alert-box">
          <p class="alert-message"></p>
          <div class="alert-buttons"></div>
        </div>
      </div>
    `;
    this.style.display = 'none';
  }

  showAlert(message, options = {}) {
    const overlay = this.querySelector('.alert-overlay');
    const messageBox = this.querySelector('.alert-message');
    const buttons = this.querySelector('.alert-buttons');

    messageBox.textContent = message;
    buttons.innerHTML = '';

    if (options.confirm) {
      buttons.innerHTML = `
        <button class="btn-cancel">Batal</button>
        <button class="btn-confirm">Ya</button>
      `;
      buttons.querySelector('.btn-cancel').addEventListener('click', () => this.hideAlert());
      buttons.querySelector('.btn-confirm').addEventListener('click', () => {
        if (typeof options.onConfirm === 'function') options.onConfirm();
        this.hideAlert();
      });
    } else {
      buttons.innerHTML = `<button class="btn-ok">OK</button>`;
      buttons.querySelector('.btn-ok').addEventListener('click', () => this.hideAlert());
    }

    this.style.display = 'flex';
    setTimeout(() => overlay.classList.add('show'), 10);
  }

  hideAlert() {
    const overlay = this.querySelector('.alert-overlay');
    overlay.classList.remove('show');
    setTimeout(() => (this.style.display = 'none'), 300);
  }
}

customElements.define('custom-alert', CustomAlert);
