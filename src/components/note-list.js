class NoteList extends HTMLElement {
  setNotes(notes, isArchived = false) {
    this.innerHTML = '';

    if (!notes || notes.length === 0) {
      this.innerHTML = `
        <div class="empty-message">
          <i class="fa-solid ${isArchived ? 'fa-box-open' : 'fa-note-sticky'}"></i>
          <p>${isArchived ? 'Tidak ada catatan di arsip.' : 'Belum ada catatan yang dibuat.'}</p>
        </div>
      `;
      return;
    }

    notes.forEach(note => {
      const noteItem = document.createElement('note-item');
      noteItem.note = note;
      this.appendChild(noteItem);
    });
  }
}

customElements.define('note-list', NoteList);
