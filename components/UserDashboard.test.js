import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./UserDashboard.js";

describe("UserDashboard", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("user-dashboard");
    document.body.append(el);
  });

  afterEach(() => el.remove());

  describe("Registro", () => {
    it("se registra como custom element", () => {
      expect(customElements.get("user-dashboard")).toBeDefined();
    });
  });

  describe("Renderizado", () => {
    it("renderiza el contenedor .dashboard", () => {
      expect(el.shadowRoot.querySelector(".dashboard")).not.toBeNull();
    });

    it("tiene slot para user-card", () => {
      const slots = el.shadowRoot.querySelectorAll("slot");
      const nombres = [...slots].map(s => s.getAttribute("name"));
      expect(nombres).toContain("user-card");
    });

    it("tiene slot para weather", () => {
      const slots = el.shadowRoot.querySelectorAll("slot");
      const nombres = [...slots].map(s => s.getAttribute("name"));
      expect(nombres).toContain("weather");
    });

    it("tiene slot para warning", () => {
      const slots = el.shadowRoot.querySelectorAll("slot");
      const nombres = [...slots].map(s => s.getAttribute("name"));
      expect(nombres).toContain("warning");
    });

    it("tiene exactamente 3 slots", () => {
      expect(el.shadowRoot.querySelectorAll("slot").length).toBe(3);
    });
  });

  describe("Etiquetas descriptivas", () => {
    it("tiene etiqueta 'user-card'", () => {
      const textos = [...el.shadowRoot.querySelectorAll(".etiqueta")]
        .map(e => e.textContent);
      expect(textos).toContain("user-card");
    });

    it("tiene etiqueta 'weather-time'", () => {
      const textos = [...el.shadowRoot.querySelectorAll(".etiqueta")]
        .map(e => e.textContent);
      expect(textos).toContain("weather-time");
    });

    it("tiene etiqueta 'warning-badge'", () => {
      const textos = [...el.shadowRoot.querySelectorAll(".etiqueta")]
        .map(e => e.textContent);
      expect(textos).toContain("warning-badge");
    });
  });
});