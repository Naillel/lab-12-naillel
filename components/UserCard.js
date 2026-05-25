class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.name   = this.getAttribute("name")   ?? "Usuario";
    this.role   = this.getAttribute("role")   ?? "Estudiante";
    this.avatar = this.getAttribute("avatar") ?? "👤";
    this.render();

    
    this.shadowRoot.querySelector(".btn").addEventListener("click", () => {
      const evento = new CustomEvent("usercard:saludar", {
        bubbles: true,   
        composed: true,  
        detail: {
          mensaje: ` Hola! Soy ${this.name} — ${this.role}`
        }
      });
      this.dispatchEvent(evento);
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
      <style>
        :host { display: block; }

        .card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #B2FFFF;
          border: 1px solid black;
          border-radius: 10px;
          padding: 12px 16px;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #B2FFFF;
          border: 1px solid black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .info { flex: 1; }

        .name {
          margin: 0;
          font-family: sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: black;
        }

        .role {
          margin: 0;
          font-family: sans-serif;
          font-size: 12px;
          color: black;
        }

        .btn {
          background: transparent;
          border: 1px solid black;
          color: black;
          font-family: sans-serif;
          font-size: 12px;
          padding: 5px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .btn:hover {
          border-color: #black;
          color: black;
        }
      </style>

      <div class="card">
        <div class="avatar">${this.avatar}</div>
        <div class="info">
          <p class="name">${this.name}</p>
          <p class="role">${this.role}</p>
        </div>
        <button class="btn">Saludar</button>
      </div>
    `;
  }
}

customElements.define("user-card", UserCard);