import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import "./WarningBadge.js";

describe("WarningBadge", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("warning-badge");
    document.body.append(el);
  });

  afterEach(() => {
    el.remove();
    vi.restoreAllMocks();
  });

  describe("Registro", () => {
    it("se registra como custom element", () => {
      expect(customElements.get("warning-badge")).toBeDefined();
    });
  });

  describe("Renderizado", () => {
    it("renderiza el .badge", () => {
      expect(el.shadowRoot.querySelector(".badge")).not.toBeNull();
    });

    it("renderiza el .mensaje (oculto al inicio)", () => {
      const msg = el.shadowRoot.querySelector(".mensaje");
      expect(msg).not.toBeNull();
      expect(msg.textContent).toBe("");
    });

    it("sin atributo pulsing no aplica animación", () => {
      const badge = el.shadowRoot.querySelector(".badge");
      expect(badge.style.animation).toBe("");
    });
  });

  describe("mostrarMensaje()", () => {
    it("muestra el texto en .mensaje", () => {
      el.mostrarMensaje("Hola desde test");
      expect(el.shadowRoot.querySelector(".mensaje").textContent)
        .toBe("Hola desde test");
    });

    it("hace visible el mensaje (opacity 1)", () => {
      el.mostrarMensaje("Visible");
      expect(el.shadowRoot.querySelector(".mensaje").style.opacity).toBe("1");
    });

    it("oculta el mensaje tras 3 segundos", () => {
      vi.useFakeTimers();
      el.mostrarMensaje("Temporal");
      vi.advanceTimersByTime(3000);
      expect(el.shadowRoot.querySelector(".mensaje").style.opacity).toBe("0");
    });
  });

  describe("Reacción al evento usercard:saludar", () => {
    it("muestra el mensaje del evento", () => {
      const spy = vi.spyOn(el, "mostrarMensaje");
      document.dispatchEvent(new CustomEvent("usercard:saludar", {
        detail: { mensaje: "Hola! Soy Alonso — Profesor" }
      }));
      expect(spy).toHaveBeenCalledWith("Hola! Soy Alonso — Profesor");
    });
  });
});