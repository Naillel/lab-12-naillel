import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import "./UserCard.js";

describe("UserCard", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("user-card");
    document.body.append(el);
  });

  afterEach(() => el.remove());

  describe("Registro", () => {
    it("se registra como custom element", () => {
      expect(customElements.get("user-card")).toBeDefined();
    });
  });

  describe("Valores por defecto (sin atributos)", () => {
    it("muestra 'Usuario' por defecto", () => {
      expect(el.shadowRoot.querySelector(".name").textContent).toBe("Usuario");
    });

    it("muestra 'Estudiante' por defecto", () => {
      expect(el.shadowRoot.querySelector(".role").textContent).toBe("Estudiante");
    });

    it("muestra '👤' como avatar por defecto", () => {
      expect(el.shadowRoot.querySelector(".avatar").textContent).toBe("👤");
    });
  });

  describe("Atributos personalizados", () => {
    beforeEach(() => {
      el.remove();
      el = document.createElement("user-card");
      el.setAttribute("name", "Alonso");
      el.setAttribute("role", "Profesor");
      el.setAttribute("avatar", "🧑‍🏫");
      document.body.append(el);
    });

    it("muestra el name del atributo", () => {
      expect(el.shadowRoot.querySelector(".name").textContent).toBe("Alonso");
    });

    it("muestra el role del atributo", () => {
      expect(el.shadowRoot.querySelector(".role").textContent).toBe("Profesor");
    });

    it("muestra el avatar del atributo", () => {
      expect(el.shadowRoot.querySelector(".avatar").textContent).toBe("🧑‍🏫");
    });
  });

  describe("Botón Saludar", () => {
    it("renderiza el botón", () => {
      expect(el.shadowRoot.querySelector(".btn")).not.toBeNull();
    });

    it("el botón dice 'Saludar'", () => {
      expect(el.shadowRoot.querySelector(".btn").textContent).toBe("Saludar");
    });

    it("dispara el evento 'usercard:saludar' al hacer click", () => {
      const handler = vi.fn();
      el.addEventListener("usercard:saludar", handler);
      el.shadowRoot.querySelector(".btn").click();
      expect(handler).toHaveBeenCalledOnce();
    });

    it("el evento incluye el mensaje en detail", () => {
      let detail = null;
      el.addEventListener("usercard:saludar", (e) => { detail = e.detail; });
      el.shadowRoot.querySelector(".btn").click();
      expect(detail.mensaje).toContain("Hola");
      expect(detail.mensaje).toContain("Usuario");
    });
  });
});