// Impor CSS
import css from './style/style.css';

// Import Web Component
import './script/component/add-notes.js';
import './script/component/notes-list.js';
import './script/component/notes-item.js';

// Import sweatAlert2
import Swal from 'sweetalert2';

// Link API DICODING
const BASE_URL = 'https://notes-api.dicoding.dev/v2';

// Get Elemen from DOM
const addNotesElement = document.querySelector('add-notes');
const notesListElement = document.querySelector('notes-list');

// Function get Note
async function getNotes() {
  try {
    notesListElement.notes = null;

    const response = await fetch(`${BASE_URL}/notes`);
    const data = await response.json();

    if (data.status === 'success') {
      notesListElement.notes = data.data;
    }

    console.log('Daftar Catatan:', data);
  } catch (error) {
    console.error('Gagal mendapatkan catatan:', error);
  }
}

// Function Add Note
async function addNote(title, body) {
  try {
    Swal.fire({
      title: 'Menyimpan...',
      text: 'Catatan sedang ditambahkan',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    const data = await response.json();

    Swal.close();

    if (data.status === 'success') {
      console.log('Catatan berhasil ditambahkan:', data);
      Swal.fire({
        title: 'Done',
        text: 'Catatan berhasil ditambahkan !!!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
      });
      getNotes();
    }
  } catch (error) {
    Swal.close();
    console.error('Gagal menambahkan catatan:', error);
  }
}

// Function Remove Note with ID
async function deleteNote(noteId) {
  try {
    Swal.fire({
      title: 'Menghapus...',
      text: 'Catatan sedang dihapus',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    Swal.close();

    if (data.status === 'success') {
      console.log('Catatan berhasil dihapus:', data);
      Swal.fire({
        title: 'Deleted',
        text: 'Catatan berhasil dihapus!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      getNotes();
    }
  } catch (error) {
    Swal.close();
    console.error('Gagal menghapus catatan:', error);
  }
}

// Event add-note
addNotesElement.addEventListener('note-added', (event) => {
  const { title, body } = event.detail;
  addNote(title, body);
});

// Event remove note
notesListElement.addEventListener('note-deleted', (event) => {
  const noteId = event.detail.id;
  deleteNote(noteId);
});

// Get Data
getNotes();
