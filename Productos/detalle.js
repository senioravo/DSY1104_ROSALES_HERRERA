import { PRODUCTS_PS } from "./productos_pasteleria.js";

/** Formatea precio en CLP */
function formatoCLP(valor) {
  return `$${valor.toLocaleString("es-CL")}`;
}

/** Obtiene el producto según el parámetro ?code */
function obtenerProductoDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  return PRODUCTS_PS.find(p => p.code === code);
}

/** Renderiza el detalle del producto */
function renderizarDetalle(producto) {
  const contenedor = document.getElementById("detalle-container");

  if (!producto) {
    contenedor.innerHTML = `
      <p class="error-msg">Producto no encontrado 😢</p>
      <a href="productos.html" class="btn-volver">← Volver al catálogo</a>
    `;
    return;
  }

  const esAgotado = producto.stock === 0;
  const esStockBajo = producto.stock <= 3 && producto.stock > 0;
  const maxMsgChars = producto.maxMsgChars || 50;

  contenedor.innerHTML = `
    <section class="detalle-producto">
      <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}">
      <div class="detalle-info">
        <h2>${producto.nombre}</h2>
        <p><strong>Código:</strong> ${producto.code}</p>
        <p class="precio"><strong>Precio:</strong> ${formatoCLP(producto.precioCLP)}</p>
        <p><strong>Stock:</strong> ${producto.stock}</p>
        <p>${producto.descripcion}</p>

        <div class="badges">
          ${esAgotado ? `<span class="badge-agotado">Agotado</span>` : ""}
          ${esStockBajo ? `<span class="badge-stock">Últimas unidades</span>` : ""}
          ${producto.etiquetas?.map(tag => `<span class="badge-etiqueta">${tag}</span>`).join("")}
        </div>

        <p><strong>Forma:</strong> ${producto.tipoForma}</p>
        <p><strong>Tamaños disponibles:</strong> ${producto.tamanosDisponibles.join(", ")}</p>

        <label for="selector-tamano"><strong>Selecciona tamaño:</strong></label>
        <select id="selector-tamano">
          <option value="">-- Selecciona --</option>
          ${producto.tamanosDisponibles.map(t => `<option value="${t}">${t}</option>`).join("")}
        </select>

        <label for="selector-cantidad"><strong>Cantidad:</strong></label>
        <input type="number" id="selector-cantidad" min="1" max="${producto.stock}" value="1">

        <p id="error-detalle" class="error-msg"></p>

        ${producto.personalizable ? `
          <label for="mensaje-personalizado"><strong>Mensaje personalizado:</strong></label>
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
      </div>
    </section>
  `;

  // Validación de dedicatoria (PS-031)
  if (producto.personalizable) {
    const input = document.getElementById("mensaje-personalizado");
    const contador = document.getElementById("contador-msg");
    const preview = document.getElementById("preview-msg");

    input.addEventListener("input", () => {
      let raw = input.value;
      const limpio = raw.replace(/[^a-zA-Z0-9 .,!¡¿?]/g, "");
      const escapado = limpio.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const final = escapado.slice(0, maxMsgChars);

      input.value = final;
      contador.textContent = `${final.length}/${maxMsgChars}`;
      preview.textContent = final;
    });
  }

  // Validación de tamaño y cantidad (PS-032)
  const btnAñadir = document.querySelector(".btn-añadir");
  const selectorTamano = document.getElementById("selector-tamano");
  const selectorCantidad = document.getElementById("selector-cantidad");
  const errorMsg = document.getElementById("error-detalle");

  btnAñadir.addEventListener("click", () => {
    const tamano = selectorTamano.value;
    const cantidad = parseInt(selectorCantidad.value);

    errorMsg.textContent = "";

    if (!tamano) {
      errorMsg.textContent = "Debes seleccionar un tamaño.";
      return;
    }

    if (isNaN(cantidad) || cantidad <= 0) {
      errorMsg.textContent = "La cantidad debe ser mayor a 0.";
      return;
    }

    if (cantidad > producto.stock) {
      errorMsg.textContent = `Solo hay ${producto.stock} unidades disponibles.`;
      return;
    }

    // Aquí podrías guardar en el carrito si avanzas con PS-040
    const dedicatoria = producto.personalizable ? document.getElementById("mensaje-personalizado").value : "";
    const item = {
      id: producto.code,
      tamano,
      cantidad,
      dedicatoria
    };

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`Añadido ${cantidad} ${tamano} al carrito`);
  });
}

/** Inicializa la vista */
document.addEventListener("DOMContentLoaded", () => {
  const producto = obtenerProductoDesdeURL();
  console.log("Producto encontrado:", producto);
  renderizarDetalle(producto);
});
