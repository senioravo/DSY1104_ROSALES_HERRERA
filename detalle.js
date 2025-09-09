import { PRODUCTS_PS } from "./productos_pasteleria.js";

function formatoCLP(valor) {
  return `$${valor.toLocaleString("es-CL")}`;
}

function obtenerProductoDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  return PRODUCTS_PS.find(p => p.code === code);
}

function renderizarDetalle(producto) {
  const contenedor = document.getElementById("detalle-container");

  if (!producto) {
    contenedor.innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  const esAgotado = producto.stock === 0;
  const esStockBajo = producto.stock <= 3 && producto.stock > 0;
  const maxMsgChars = producto.maxMsgChars || 50;

  contenedor.innerHTML = `
    <section class="detalle-producto">
      <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}">
      <h2>${producto.nombre}</h2>
      <p><strong>Código:</strong> ${producto.code}</p>
      <p><strong>Precio:</strong> ${formatoCLP(producto.precioCLP)}</p>
      <p><strong>Stock:</strong> ${producto.stock}</p>
      <p>${producto.descripcion}</p>

      <div class="badges">
        ${esAgotado ? `<span class="badge-agotado">Agotado</span>` : ""}
        ${esStockBajo ? `<span class="badge-stock">Últimas unidades</span>` : ""}
        ${producto.etiquetas?.map(tag => `<span class="badge-etiqueta">${tag}</span>`).join("")}
      </div>

      <p><strong>Formas disponibles:</strong> ${producto.tipoForma}</p>
      <p><strong>Tamaños:</strong> ${producto.tamañosDisponibles.join(", ")}</p>

      ${producto.personalizable ? `
        <label for="mensaje-personalizado">Mensaje personalizado:</label>
        <input type="text" id="mensaje-personalizado" maxlength="${maxMsgChars}" placeholder="Escribe tu dedicatoria...">
        <p id="contador-msg">0/${maxMsgChars}</p>
        <div class="preview-msg">
          <strong>Vista previa:</strong>
          <p id="preview-msg"></p>
        </div>
      ` : ""}

      <button class="btn-añadir" data-id="${producto.code}" ${esAgotado ? "disabled" : ""}>Añadir</button>
      ${esAgotado ? `<p class="aviso-agotado">Este producto está agotado.</p>` : ""}
      <a href="productos.html" class="btn-volver">← Volver al catálogo</a>
    </section>
  `;

  // Lógica de personalización (PS-031)
  if (producto.personalizable) {
    const input = document.getElementById("mensaje-personalizado");
    const contador = document.getElementById("contador-msg");
    const preview = document.getElementById("preview-msg");

    input.addEventListener("input", () => {
      let raw = input.value;

      // Validación: solo letras, números, espacios y signos básicos
      const limpio = raw.replace(/[^a-zA-Z0-9 .,!¡¿?]/g, "");

      // Escape básico para prevenir XSS
      const escapado = limpio.replace(/</g, "&lt;").replace(/>/g, "&gt;");

      // Limitar a maxMsgChars
      const final = escapado.slice(0, maxMsgChars);

      input.value = final;
      contador.textContent = `${final.length}/${maxMsgChars}`;
      preview.textContent = final;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const producto = obtenerProductoDesdeURL();
  renderizarDetalle(producto);
});