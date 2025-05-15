class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  set notes(notes) {
    this._notes = notes;
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
    .notes-container {
          display: grid;
        grid-template-columns: repeat(auto-fit);
        gap: 20px;
    `;
  }

  render() {
    this.updateStyle();

    this._shadowRoot.innerHTML = '';
    this._shadowRoot.appendChild(this._style);

    const container = document.createElement('div');
    container.classList.add('notes-container');

    if (this._notes === undefined || this._notes === null) {
      container.innerHTML = '<p>Loading...</p>';
    } else if (this._notes.length > 0) {
      this._notes.forEach((note) => {
        const noteItem = document.createElement('notes-item');
        noteItem.note = note;

        noteItem.addEventListener('note-deleted', (event) => {
          this.dispatchEvent(
            new CustomEvent('note-deleted', {
              detail: { id: event.detail.id },
              bubbles: true,
              composed: true,
            })
          );
        });

        container.appendChild(noteItem);
      });
    } else {
      container.innerHTML = '<p>Tidak ada catatan.</p>';
    }

    this._shadowRoot.appendChild(container);
  }
}

customElements.define('notes-list', NotesList);
