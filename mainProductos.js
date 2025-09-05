import { PRODUCTS_PS } from "./productos_pasteleria.js";

/* --- Utilidades --- */
function formatoCLP(valor) {
  return `$${valor.toLocaleString("es-CL")}`;
}

function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/* --- Validación de producto --- */
function validarProducto(p) {
  if (!p || typeof p !== "object") return false;
  if (typeof p.code !== "string") return false;
  if (typeof p.nombre !== "string") return false;
  if (typeof p.categoriaId !== "string") return false;
  if (!Array.isArray(p.tamanosDisponibles) || p.tamanosDisponibles.length === 0) return false;
  if (typeof p.precioCLP !== "number" || p.precioCLP < 0) return false;
  if (!Number.isInteger(p.stock) || p.stock < 0) return false;
  if (typeof p.descripcion !== "string") return false;
  if (typeof p.imagen !== "string") return false;
  if ("personalizable" in p && typeof p.personalizable !== "boolean") return false;
  if ("maxMsgChars" in p && (!Number.isInteger(p.maxMsgChars) || p.maxMsgChars < 0 || p.maxMsgChars > 50)) return false;
  return true;
}

/* --- Renderizado de tarjeta --- */
function renderCard(producto) {
  const card = document.createElement("div");
  card.className = "producto";

  const etiquetasHTML = producto.etiquetas?.map(etiqueta =>
    `<span class="badge-etiqueta">${etiqueta}</span>`
  ).join(" ") || "";

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

/* --- Diccionario de categorías --- */
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

/* --- Animaciones scroll --- */
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

/* --- Filtros y orden --- */
const selectCategoria = document.getElementById("filtro-categoria");
const selectForma = document.getElementById("filtro-forma");
const selectEtiqueta = document.getElementById("filtro-etiqueta");
const btnLimpiar = document.getElementById("btn-limpiar");
const inputBusqueda = document.getElementById("busqueda");
const btnOrdenPrecio = document.getElementById("orden-precio");

btnOrdenPrecio.dataset.direccion = "none"; // Estado inicial

btnOrdenPrecio.addEventListener("click", () => {
  const estadoActual = btnOrdenPrecio.dataset.direccion;
  let nuevoEstado, nuevoTexto;

  if (estadoActual === "none") {
    nuevoEstado = "asc";
    nuevoTexto = "⬆️ Ascendente";
  } else if (estadoActual === "asc") {
    nuevoEstado = "desc";
    nuevoTexto = "⬇️ Descendente";
  } else {
    nuevoEstado = "none";
    nuevoTexto = "Ordenar por precio";
  }

  btnOrdenPrecio.dataset.direccion = nuevoEstado;
  btnOrdenPrecio.textContent = nuevoTexto;

  renderizarProductosFiltrados();
});

/* --- Aplicar filtros y orden --- */
function aplicarFiltros(productos, filtros, direccionOrden) {
  let resultado = productos.filter(p => {
    const cumpleCategoria = !filtros.categoria || p.categoriaId === filtros.categoria;
    const cumpleForma = !filtros.forma || p.tipoForma === filtros.forma;
    const cumpleEtiqueta = !filtros.etiqueta || p.etiquetas?.includes(filtros.etiqueta);
    const cumpleBusqueda = !filtros.busqueda || (
      normalizarTexto(p.nombre).includes(normalizarTexto(filtros.busqueda)) ||
      normalizarTexto(p.code).includes(normalizarTexto(filtros.busqueda))
    );
    return cumpleCategoria && cumpleForma && cumpleEtiqueta && cumpleBusqueda;
  });

  if (direccionOrden === "asc") {
    resultado.sort((a, b) => a.precioCLP - b.precioCLP);
  } else if (direccionOrden === "desc") {
    resultado.sort((a, b) => b.precioCLP - a.precioCLP);
  }

  return resultado;
}

/* --- URL dinámica --- */
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
    etiqueta: params.get("etiqueta") || "",
    busqueda: inputBusqueda.value || ""
  };
}

/* --- Renderizado principal --- */
function renderizarProductosFiltrados() {
  const filtros = {
    categoria: selectCategoria.value,
    forma: selectForma.value,
    etiqueta: selectEtiqueta.value,
    busqueda: inputBusqueda.value
  };

  actualizarURL(filtros);

  const direccionOrden = btnOrdenPrecio.dataset.direccion;
  const filtrados = aplicarFiltros(PRODUCTS_PS, filtros, direccionOrden);

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
    if (!validarProducto(producto)) {
      console.warn("Producto inválido:", producto);
      return;
    }

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

    const card = renderCard(producto);
    gridActual.appendChild(card);
  });

  activarAnimacionesScroll();
}

/* --- Eventos --- */
selectCategoria.addEventListener("change", renderizarProductosFiltrados);
selectForma.addEventListener("change", renderizarProductosFiltrados);
selectEtiqueta.addEventListener("change", renderizarProductosFiltrados);

btnLimpiar.addEventListener("click", () => {
  selectCategoria.value = "";
  selectForma.value = "";
  selectEtiqueta.value = "";
  inputBusqueda.value = "";
  btnOrdenPrecio.dataset.direccion = "none";
  btnOrdenPrecio.textContent = "Ordenar por precio";
  renderizarProductosFiltrados();
});

inputBusqueda.addEventListener("input", debounce(() => {
  renderizarProductosFiltrados();
}, 250));

document.getElementById("btn-toggle-filtros").addEventListener("click", () => {
  const filtrosDiv = document.getElementById("filtros-opciones");
  const estaVisible = filtrosDiv.style.display === "block";
  filtrosDiv.style.display = estaVisible ? "none" : "block";
});


window.addEventListener("load", () => {
  // Cargar filtros desde URL si existen
  const filtros = obtenerFiltrosDesdeURL();

  // Asignar valores a los inputs
  selectCategoria.value = filtros.categoria;
  selectForma.value = filtros.forma;
  selectEtiqueta.value = filtros.etiqueta;
  inputBusqueda.value = filtros.busqueda;

  // ✅ Si no hay filtros activos, renderizar todo
  const hayFiltrosActivos = filtros.categoria || filtros.forma || filtros.etiqueta || filtros.busqueda;
  if (!hayFiltrosActivos) {
    btnOrdenPrecio.dataset.direccion = "none";
    btnOrdenPrecio.textContent = "Ordenar por precio";
  }

  renderizarProductosFiltrados();
});

/* --- Fin del script --- */