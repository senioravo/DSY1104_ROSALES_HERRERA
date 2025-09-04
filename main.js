import { PRODUCTS_PS } from "./productos_pasteleria.js";

/**
 * Convierte un número en formato de moneda chilena (CLP).
 */
function formatoCLP(valor) {
  return `$${valor.toLocaleString("es-CL")}`;
}

/**
 * Valida que un objeto producto cumpla con todos los campos requeridos.
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
 * Crea una tarjeta visual para el producto.
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
 * Diccionario de nombres de categoría.
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
 * Animaciones al hacer scroll.
 */
function estaVisible(elemento) {
  const rect = elemento.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function activarAnimacionesScroll() {
  const productos = document.querySelectorAll('.producto');
  productos.forEach(producto => {
    if (estaVisible(producto)) {
      producto.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', activarAnimacionesScroll);
window.addEventListener('load', activarAnimacionesScroll);

/**
 * Filtros y renderizado
 */
const selectCategoria = document.getElementById("filtro-categoria");
const selectForma = document.getElementById("filtro-forma");
const selectEtiqueta = document.getElementById("filtro-etiqueta");
const btnLimpiar = document.getElementById("btn-limpiar");

function renderizarProductosFiltrados() {
  const filtros = {
    categoria: selectCategoria.value,
    forma: selectForma.value,
    etiqueta: selectEtiqueta.value
  };
  actualizarURL(filtros);

  const filtrados = aplicarFiltros(PRODUCTS_PS, filtros);
  const container = document.getElementById("productos-container");
  const mensaje = document.getElementById("mensaje-sin-resultados");

  container.innerHTML = "";

  if (filtrados.length === 0) {
    mensaje.style.display = "block";
    return;
  } else {
    mensaje.style.display = "none";
  }

  let categoriaActual = null;
  let gridActual = null;

  filtrados.forEach(producto => {
    if (producto.categoriaId !== categoriaActual) {
      categoriaActual = producto.categoriaId;
      const seccion = document.createElement("section");
      seccion.className = "categoria-seccion";

      const titulo = document.createElement("h2");
      titulo.textContent = nombresCategoria[categoriaActual] || categoriaActual;
      titulo.className = "seccion-titulo";
      seccion.appendChild(titulo);

      gridActual = document.createElement("div");
      gridActual.className = "productos-grid";
      seccion.appendChild(gridActual);

      container.appendChild(seccion);
    }

    if (validarProducto(producto)) {
      const card = renderCard(producto);
      gridActual.appendChild(card);
    }
  });

  activarAnimacionesScroll();
}

selectCategoria.addEventListener("change", renderizarProductosFiltrados);
selectForma.addEventListener("change", renderizarProductosFiltrados);
selectEtiqueta.addEventListener("change", renderizarProductosFiltrados);

btnLimpiar.addEventListener("click", () => {
  selectCategoria.value = "";
  selectForma.value = "";
  selectEtiqueta.value = "";
  renderizarProductosFiltrados();
});

function actualizarURL(filtros) {
  const params = new URLSearchParams();
  if (filtros.categoria) params.set("categoria", filtros.categoria);
  if (filtros.forma) params.set("forma", filtros.forma);
  if (filtros.etiqueta) params.set("etiqueta", filtros.etiqueta);
  history.replaceState(null, "", `?${params.toString()}`);
}

function obtenerFiltrosDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  return {
    categoria: params.get("categoria") || "",
    forma: params.get("forma") || "",
    etiqueta: params.get("etiqueta") || ""
  };
}

function aplicarFiltros(productos, filtros) {
  return productos.filter(p => {
    const cumpleCategoria = !filtros.categoria || p.categoriaId === filtros.categoria;
    const cumpleForma = !filtros.forma || p.tipoForma === filtros.forma;
    const cumpleEtiqueta = !filtros.etiqueta || p.etiquetas?.includes(filtros.etiqueta);
    return cumpleCategoria && cumpleForma && cumpleEtiqueta;
  });
}

document.getElementById("btn-toggle-filtros").addEventListener("click", () => {
  const filtrosDiv = document.getElementById("filtros-opciones");
  filtrosDiv.style.display = filtrosDiv.style.display === "none" ? "block" : "none";
});

window.addEventListener("load", () => {
  const filtros = obtenerFiltrosDesdeURL();
  selectCategoria.value = filtros.categoria;
  selectForma.value = filtros.forma;
  selectEtiqueta.value = filtros.etiqueta;
  renderizarProductosFiltrados();
});



