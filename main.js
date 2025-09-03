// Importamos los productos desde el módulo
import { PRODUCTS_PS } from "./productos_pasteleria.js";

/**
 * Convierte un número en formato de moneda chilena (CLP).
 * Ejemplo: 12990 → "$12.990"
 * 
 * @param {number} valor - El precio en número entero.
 * @returns {string} - El precio formateado como string con símbolo $ y separadores de miles.
 */
function formatoCLP(valor) {
  return `$${valor.toLocaleString("es-CL")}`;
}

/**
 * Valida que un objeto producto cumpla con todos los campos requeridos
 * y que cada campo tenga el tipo y valor correcto según las reglas del proyecto.
 * 
 * @param {object} p - El producto a validar.
 * @returns {boolean} - true si el producto es válido, false si tiene errores.
 */
function validarProducto(p) {
  const campos = [
    "code", "nombre", "categoriaId", "tipoForma", "tamanosDisponibles",
    "precioCLP", "stock", "descripcion", "personalizable", "maxMsgChars", "imagen"
  ];

  for (const campo of campos) {
    if (!(campo in p)) return false;
  }

  if (typeof p.code !== "string") return false;
  if (typeof p.nombre !== "string") return false;
  if (typeof p.categoriaId !== "string") return false;
  if (!["cuadrada", "circular", null].includes(p.tipoForma)) return false;
  if (!Array.isArray(p.tamanosDisponibles) || p.tamanosDisponibles.length === 0) return false;
  if (typeof p.precioCLP !== "number" || p.precioCLP < 0) return false;
  if (!Number.isInteger(p.stock) || p.stock < 0) return false;
  if (typeof p.descripcion !== "string") return false;
  if (typeof p.personalizable !== "boolean") return false;
  if (!Number.isInteger(p.maxMsgChars) || p.maxMsgChars < 0 || p.maxMsgChars > 50) return false;
  if (typeof p.imagen !== "string") return false;

  return true;
}

/**
 * Crea una tarjeta visual para el producto y la devuelve.
 * No la inserta directamente en el DOM.
 * 
 * @param {object} producto - El producto a mostrar.
 * @returns {HTMLElement} - La tarjeta lista para insertar.
 */
function renderCard(producto) {
  const card = document.createElement("div");
  card.className = "producto";

  const etiquetasHTML = producto.etiquetas?.map(etiqueta =>
    `<span class="badge-etiqueta">${etiqueta}</span>`
  ).join(" ");

  const personalizableHTML = producto.personalizable
    ? `<p><em>Personalizable: hasta ${producto.maxMsgChars} caracteres</em></p>`
    : "";

  card.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h2>${producto.nombre}</h2>
    <p><strong>Precio:</strong> ${formatoCLP(producto.precioCLP)}</p>
    <p><strong>Stock:</strong> ${producto.stock} disponibles</p>
    <p><strong>Tamaños:</strong> ${producto.tamanosDisponibles.join(", ")}</p>
    <p>${producto.descripcion}</p>
    ${personalizableHTML}
    <div>${etiquetasHTML}</div>
  `;

  return card;
}

/**
 * Diccionario que traduce los códigos de categoría a nombres visibles
 */
const nombresCategoria = {
  TC: "Tortas Cuadradas",
  TT: "Tortas Circulares",
  PI: "Postres Individuales",
  PSA: "Sin Azúcar",
  PT: "Pastelería Tradicional",
  PG: "Sin Gluten",
  PV: "Veganos",
  TE: "Tortas Especiales"
};

/**
 * Recorre todos los productos y los agrupa por categoría.
 * Cada grupo se muestra con su título y sus tarjetas.
 */
let categoriaActual = null;
let seccionContainer = null;
let gridActual = null;

PRODUCTS_PS.forEach(producto => {
  // Si la categoría cambió, creamos una nueva sección
  if (producto.categoriaId !== categoriaActual) {
    categoriaActual = producto.categoriaId;

    const container = document.getElementById("productos-container");

    // Crear contenedor de sección
    seccionContainer = document.createElement("section");
    seccionContainer.className = "categoria-seccion";

    // Crear título
    const titulo = document.createElement("h2");
    titulo.textContent = nombresCategoria[categoriaActual] || categoriaActual;
    titulo.className = "seccion-titulo";
    seccionContainer.appendChild(titulo);

    // Crear grid para productos
    gridActual = document.createElement("div");
    gridActual.className = "productos-grid";
    seccionContainer.appendChild(gridActual);

    // Insertar sección en el contenedor principal
    container.appendChild(seccionContainer);
  }

  // Validamos el producto
  if (validarProducto(producto)) {
    const card = renderCard(producto); // Creamos la tarjeta
    gridActual.appendChild(card);      // La insertamos en el grid actual
  } else {
    console.warn("Producto inválido:", producto.code);

    const errorMsg = document.createElement("p");
    errorMsg.textContent = `⚠️ Error al cargar el producto ${producto.code}`;
    errorMsg.className = "error-producto";
    gridActual.appendChild(errorMsg);
  }
});
