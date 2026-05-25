class WarningBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    // Escucha el evento que dispara user-card
    document.addEventListener("usercard:saludar", (e) => {
      this.mostrarMensaje(e.detail.mensaje);
    });
  }

  mostrarMensaje(texto) {
    const msg = this.shadowRoot.querySelector(".mensaje");
    msg.textContent = texto;
    msg.style.maxHeight = "50px";
    msg.style.opacity   = "1";
    msg.style.marginTop = "8px";

    // Oculta el mensaje después de 3 segundos
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      msg.style.maxHeight = "0";
      msg.style.opacity   = "0";
      msg.style.marginTop = "0";
    }, 3000);
  }

  render() {
    const pulsing = this.hasAttribute("pulsing");

    this.shadowRoot.innerHTML = /* html */`
      <style>
        :host { display: block; }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1a1200;
          border: 1px solid #b86a00;
          border-radius: 6px;
          padding: 7px 14px;
          color: #d4a000;
          font-family: monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          ${pulsing ? "animation: pulse 2s ease-in-out infinite;" : ""}
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 6px rgba(200, 140, 0, 0.3); }
          50%       { box-shadow: 0 0 20px rgba(200, 140, 0, 0.7); border-color: #e0b800; }
        }

        .mensaje {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          margin-top: 0;
          padding: 0 10px;
          background: rgb(200, 180, 0);
          border: 1px solid black;
          border-radius: 4px;
          color: black;
          font-family: monospace;
          font-size: 12px;
          line-height: 50px;
          transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease;
        }
      </style>

      <div class="badge">⚠ <slot>Advertencia</slot></div>
      <div class="mensaje"></div>
    `;
  }
}

customElements.define("warning-badge", WarningBadge);