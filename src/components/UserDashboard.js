class UserDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
      <style>
        :host { display: block; }

        .dashboard {
          background: salmon;
          border: 1px solid black;
          border-radius: 14px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .fila {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .etiqueta {
          font-family: monospace;
          font-size: 10px;
          color: black;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 5px 0;
        }
      </style>

      <div class="dashboard">
        <div class="fila">
          <div>
            <p class="etiqueta">user-card</p>
            <slot name="user-card"></slot>
          </div>
          <div>
            <p class="etiqueta">weather-time</p>
            <slot name="weather"></slot>
          </div>
        </div>
        <div>
          <p class="etiqueta">warning-badge</p>
          <slot name="warning"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("user-dashboard", UserDashboard);