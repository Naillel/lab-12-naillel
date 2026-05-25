import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import "./WeatherTime.js";

describe("WeatherTime", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("weather-time");
  });

  afterEach(() => {
    el.remove();
    vi.restoreAllMocks();
  });

  describe("Registro", () => {
    it("se registra como custom element", () => {
      expect(customElements.get("weather-time")).toBeDefined();
    });
  });

  describe("Estado de carga (loading)", () => {
    it("muestra los dots de carga antes de recibir datos", () => {
      // No añadimos al DOM aún → render() sin datos
      el.render?.();
      document.body.append(el);
      expect(el.shadowRoot.querySelector(".loading")).not.toBeNull();
      expect(el.shadowRoot.querySelectorAll(".dot").length).toBe(3);
    });
  });

  describe("Con datos de la API (fetch mockeado)", () => {
    beforeEach(async () => {
      // Mockear fetch antes de conectar el elemento
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
        json: async () => ({
          temperature: "31 °C",
          description: "Sunny"
        })
      }));
      document.body.append(el);
      // Esperamos que el fetch interno termine
      await vi.waitFor(() =>
        el.shadowRoot.querySelector(".widget") !== null
      );
    });

    it("renderiza el .widget con datos", () => {
      expect(el.shadowRoot.querySelector(".widget")).not.toBeNull();
    });

    it("muestra la temperatura", () => {
      expect(el.shadowRoot.querySelector(".temp").textContent).toBe("31 °C");
    });

    it("muestra la descripción", () => {
      expect(el.shadowRoot.querySelector(".desc").textContent).toBe("Sunny");
    });

    it("muestra 'Liberia, Guanacaste'", () => {
      expect(el.shadowRoot.querySelector(".lugar").textContent)
        .toBe("Liberia, Guanacaste");
    });
  });

  describe("Cuando la API falla", () => {
    beforeEach(async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Sin red")));
      document.body.append(el);
      await vi.waitFor(() =>
        el.shadowRoot.querySelector(".widget") !== null
      );
    });

    it("muestra 'N/A' como temperatura", () => {
      expect(el.shadowRoot.querySelector(".temp").textContent).toBe("N/A");
    });

    it("muestra 'Sin datos' como descripción", () => {
      expect(el.shadowRoot.querySelector(".desc").textContent).toBe("Sin datos");
    });
  });
});