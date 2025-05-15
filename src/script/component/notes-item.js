class NotesItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  set note(note) {
    this._note = note;
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        .note {
          background-color: #ffffff;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h3 {
          margin: 0;
        }

        p {
          margin: 5px 0;
        }

        p#createId {
          font-size: 0.9rem;
          color: gray;
          text-align: right;
        }
        
        .delete-button {
          background-color: #333;
          color: white;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 5px;
        }`;
  }

  render() {
    this.updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="note">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>
        <p id="createId"><span>created at : </span>${this._note.createdAt}</p>
        <button class="delete-button" data-id="${this._note.id}">Hapus</button>
      </div>
    `;

    // Event Delete Note
    this._shadowRoot
      .querySelector('.delete-button')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('note-deleted', {
            detail: { id: this._note.id },
            bubbles: true,
            composed: true,
          })
        );
      });
  }
}

customElements.define('notes-item', NotesItem);
