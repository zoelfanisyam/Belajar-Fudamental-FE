class AddNotes extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
    :host{
      background-color: #f4f4f4;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

     form {
      display: grid;
      grid-gap: 10px;
    }

        input,
     button,
     textarea#body {
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

      button {
        background-color: #333;
        color: white;
        cursor: pointer;
      }
    `;
  }

  render() {
    this.updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div class="add-notes">
        <form action="">
          <div class="title">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title of the note"
              required
            />
          </div>
          <div class="body">
            <label for="body">Description</label>
            <textarea
              rows="5"
              name="body"
              id="body"
              placeholder="Write your note here"
              required
            ></textarea>
          </div>
          <button id="addNoteButton">Add Note</button>
        </form>
      </div>
    `;

    this._shadowRoot
      .querySelector('#addNoteButton')
      .addEventListener('click', () => {
        const title = this._shadowRoot.querySelector('#title').value;
        const body = this._shadowRoot.querySelector('#body').value;

        if (title && body) {
          this.dispatchEvent(
            new CustomEvent('note-added', {
              detail: { title, body },
              bubbles: true,
              composed: true,
            })
          );
        }
      });
  }
}

customElements.define('add-notes', AddNotes);
