const URL_API = "https://goweather.xyz/v2/weather/liberia+guanacaste";

class WeatherTime extends HTMLElement {
  #data = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render(); // muestra loading
    this.#cargarDatos();
  }

  async #cargarDatos() {
    try {
      const response = await fetch(URL_API);
      this.#data = await response.json();
    } catch (e) {
      this.#data = { temperature: "N/A", description: "Sin datos" };
    }
    this.render();
  }

  render() {
    const temp = this.#data?.temperature;
    const desc = this.#data?.description ?? "";

    if (!temp) {
      // Estado de carga
      this.shadowRoot.innerHTML = /* html */`
        <style>
          :host { display: block; }
          .loading { display: flex; gap: 6px; padding: 12px 0; align-items: center; }
          .dot {
            width: 8px; height: 8px; border-radius: 50%;
            background: green;
            animation: bounce 1s infinite alternate;
          }
          .dot:nth-child(2) { animation-delay: 0.2s; }
          .dot:nth-child(3) { animation-delay: 0.4s; }
          @keyframes bounce {
            from { transform: translateY(0);  opacity: 0.3; }
            to   { transform: translateY(-7px); opacity: 1; }
          }
        </style>
        <div class="loading">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      `;
      return;
    }

    // Elige ícono según descripción
    const icono = desc.toLowerCase().includes("sun")   ? ""
                : desc.toLowerCase().includes("cloud") ? ""
                : desc.toLowerCase().includes("rain")  ? ""
                : "";

    this.shadowRoot.innerHTML = /* html */`
      <style>
        :host { display: block; }
        .widget {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #40826D;
          border: 1px solid #30363d;
          border-radius: 10px;
          padding: 12px 16px;
        }
        .icono { font-size: 2rem; }
        .lugar {
          margin: 0;
          font-family: sans-serif;
          font-size: 11px;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .temp {
          margin: 0;
          font-family: sans-serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #e6edf3;
        }
        .desc {
          margin: 0;
          font-family: sans-serif;
          font-size: 11px;
          color: white;
        }
      </style>

      <div class="widget">
        <span class="icono">${icono}</span>
        <div>
          <p class="lugar">Liberia, Guanacaste</p>
          <p class="temp">${temp}</p>
          <p class="desc">${desc}</p>
        </div>
      </div>
    `;
  }
}

customElements.define("weather-time", WeatherTime);