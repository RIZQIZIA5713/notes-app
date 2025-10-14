class NoteItem extends HTMLElement {
  set note(value) {
    this._note = value;
    this.render();
  }

  render() {
    const isArchived = this._note.archived;

    this.innerHTML = `
      <div class="note">
        <div class="note-desc">
          <h3>${this._note.title}</h3>
          <p>${this._note.body}</p>
          <small>${new Date(this._note.createdAt).toLocaleString()}</small>
        </div>
        <div class="note-actions">
          <button class="archive-note-btn">
            <i class="fa-solid ${isArchived ? 'fa-rotate-left' : 'fa-box-archive'}"></i>
            ${isArchived ? 'Pulihkan' : 'Arsipkan'}
          </button>
          <button class="delete-btn">
            <i class="fa-solid fa-trash"></i> Hapus
          </button>
        </div>
      </div>
    `;

    // Event: hapus catatan
    this.querySelector('.delete-btn').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('delete-note', {
          bubbles: true,
          detail: { id: this._note.id },
        })
      );
    });

    // Event: arsip / unarsip
    this.querySelector('.archive-note-btn').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('archive-note', {
          bubbles: true,
          detail: { id: this._note.id, archived: this._note.archived },
        })
      );
    });
  }
}

customElements.define('note-item', NoteItem);
