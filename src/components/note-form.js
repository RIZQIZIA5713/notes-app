class NoteForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <form id="noteForm">
        <input type="text" id="title" placeholder="Judul catatan" required />
        <textarea id="body" placeholder="Isi catatan" required></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;

    this.querySelector('#noteForm').addEventListener('submit', (e) => {
      e.preventDefault();

      const title = this.querySelector('#title').value;
      const body = this.querySelector('#body').value;

      const newNote = {
        title,
        body,
      };

      this.dispatchEvent(
        new CustomEvent('add-note', {
          bubbles: true,
          detail: newNote,
        })
      );

      e.target.reset();
    });
  }
}

customElements.define('note-form', NoteForm);
