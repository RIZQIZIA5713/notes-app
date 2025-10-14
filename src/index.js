import './style/style.css';
import './components/note-item.js';
import './components/note-list.js';
import './components/note-form.js';
import './components/custom-alert.js'
import './components/loading-indicator.js';

function main() {
  const API_URL = 'https://noteapi-zia.onrender.com';

  document.addEventListener('DOMContentLoaded', () => {
    const loading = document.querySelector('loading-indicator');
    const noteList = document.querySelector('note-list');
    const archiveBtn = document.querySelector('.archive-btn');
    const customAlert = document.querySelector('custom-alert')
    let isArchivedView = false;

    // // ========== OVERLAY LOADING HANDLER ==========
    const showLoading = () => {
      loading.style.opacity = '1';
      loading.style.display = 'flex';
    };

    const hideLoading = () => {
      loading.style.opacity = '0';
      setTimeout(() => {
        loading.style.display = 'none';
      }, 600);
    };

    // ========== FETCH: ACTIVE NOTES ==========
    const getNotes = async () => {
      showLoading();
      try {
        const response = await fetch(`${API_URL}/notes`);
        const responseJson = await response.json();

        // Simulasi Loading (Jika merasa loading tidak muncul)
        // await new Promise(r => setTimeout(r, 2000));

        if (responseJson.status !== 'success') {
          customAlert.showAlert(responseJson.message);
        } else {
          noteList.setNotes(responseJson.data, false);
        }

      } catch (error) {
        customAlert.showAlert('Gagal memuat catatan.');
      } finally {
        hideLoading();
      }
    };

    // ========== FETCH: ARCHIVED NOTES ==========
    const getArchivedNotes = async () => {
      showLoading();
      try {
        const response = await fetch(`${API_URL}/notes/archived`);
        const responseJson = await response.json();

        if (responseJson.status !== 'success') {
          customAlert.showAlert(responseJson.message);
        } else {
          noteList.setNotes(responseJson.data, true);
        }
      } catch (error) {
        customAlert.showAlert('Gagal memuat catatan arsip.');
      } finally {
        hideLoading();
      }
    };

    // ========== TOGGLE BUTTON (ACTIVE / ARCHIVE) ==========
    archiveBtn.addEventListener('click', () => {
      if (isArchivedView) {
        getNotes();
        archiveBtn.innerHTML = `<i class="fa-solid fa-box-archive"></i> Catatan Arsip`;
        isArchivedView = false;
      } else {
        getArchivedNotes();
        archiveBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Catatan Aktif`;
        isArchivedView = true;
      }
    });

    // ========== INSERT NOTE ==========
    const insertNote = async (note) => {
      showLoading();
      try {
        const response = await fetch(`${API_URL}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note),
        });

        customAlert.showAlert('Catatan berhasil ditambahkan!');
        getNotes();
      } catch (error) {
        customAlert.showAlert('Gagal menambahkan catatan.');
      } finally {
        hideLoading();
      }
    };

    // ========== REMOVE NOTE ==========
    const removeNote = async (noteId) => {
      showLoading();
      try {
        await fetch(`${API_URL}/notes/${noteId}`, { method: 'DELETE' });
        
        if (isArchivedView) {
          getArchivedNotes();
        } else {
          getNotes();
        }

      } catch (error) {
        customAlert.showAlert('Gagal menghapus catatan.')
      } finally {
        hideLoading();
      }
    };

    // ========== ARCHIVE / UNARCHIVE NOTE ==========
    const toggleArchiveNote = async (noteId, isArchived) => {
      showLoading();
      try {
        const url = `${API_URL}/notes/${noteId}/${isArchived ? 'unarchive' : 'archive'}`;
        await fetch(url, { method: 'POST' });

        if (isArchivedView) {
          getArchivedNotes();
          customAlert.showAlert('Catatan berhasil dipulihkan.');
        } else {
          getNotes();
          customAlert.showAlert('Catatan berhasil diarsipkan.');
        }

      } catch (error) {
        customAlert.showAlert('Gagal memperbarui status catatan.')
      } finally {
        hideLoading();
      }
    };

    // ========== EVENT LISTENERS ==========
    document.addEventListener('add-note', (event) => { insertNote(event.detail); });
    document.addEventListener('archive-note', (event) =>
      toggleArchiveNote(event.detail.id, event.detail.archived)
    );

    document.addEventListener('delete-note', (event) => {
      const noteId = event.detail.id;
      customAlert.showAlert('Yakin ingin menghapus catatan ini?', {
        confirm: true,
        onConfirm: () => removeNote(noteId),
      });
    });

    document.addEventListener('click', (event) => {
      const note = event.target.closest('.note');
      if (!note) return;

      if (event.target.closest('button')) return;
      console.log(`Note diklik`);
    });

    getNotes();
  });
}

main();
export default main;