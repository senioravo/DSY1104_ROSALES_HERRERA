import { PRODUCTS_PS } from "./productos_pasteleria.js";

/**
 * Convierte un número en formato de moneda chilena (CLP).
 */
function formatoCLP(valor) {
  return `$${valor.toLocaleString("es-CL")}`;
}

/**
 * Filtros combinables
 */
function obtenerFiltros() {
  const categoria = document.getElementById("filtro-categoria").value;
  const forma = document.getElementById("filtro-forma").value;
  const tamano = document.getElementById("filtro-tamano").value;
  const etiquetas = Array.from(document.querySelectorAll("input[name='etiquetas']:checked")).map(e => e.value);

  return { categoria, forma, tamano, etiquetas };
}

function filtrarProductos(productos, filtros) {
  return productos.filter(p => {
    const coincideCategoria = !filtros.categoria || p.categoriaId === filtros.categoria;
    const coincideForma = !filtros.forma || p.tipoForma === filtros.forma;
    const coincideTamano = !filtros.tamano || p.tamañosDisponibles.includes(filtros.tamano);
    const coincideEtiquetas = filtros.etiquetas.length === 0 || filtros.etiquetas.every(tag => p.etiquetas?.includes(tag));

    return coincideCategoria && coincideForma && coincideTamano && coincideEtiquetas;
  });
}

function actualizarURL(filtros) {
  const params = new URLSearchParams();

  if (filtros.categoria) params.set("categoria", filtros.categoria);
  if (filtros.forma) params.set("forma", filtros.forma);
  if (filtros.tamano) params.set("tamano", filtros.tamano);
  filtros.etiquetas.forEach(tag => params.append("etiqueta", tag));

  history.replaceState(null, "", "?" + params.toString());
}

function leerFiltrosDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  return {
    categoria: params.get("categoria") || "",
    forma: params.get("forma") || "",
    tamano: params.get("tamano") || "",
    etiquetas: params.getAll("etiqueta")
  };
}

/**
 * Búsqueda y orden
 */
function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function filtrarPorBusqueda(productos, texto) {
  const query = normalizarTexto(texto);
  return productos.filter(p => {
    const nombre = normalizarTexto(p.nombre);
    const codigo = normalizarTexto(p.code);
    return nombre.includes(query) || codigo.includes(query);
  });
}

function ordenarPorPrecio(productos, ascendente = true) {
  return [...productos].sort((a, b) => ascendente ? a.precioCLP - b.precioCLP : b.precioCLP - a.precioCLP);
}

/**
 * Renderizado de cards
 */
function crearCard(producto) {
  const card = document.createElement("div");
  card.classList.add("producto");

  const esStockBajo = producto.stock <= 3 && producto.stock > 0;

  card.innerHTML = `
    <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}">
    <h2>${producto.nombre}</h2>
    <p><strong>Precio:</strong> ${formatoCLP(producto.precioCLP)}</p>
    <div class="badges">
      ${esStockBajo ? `<span class="badge-stock">Últimas unidades</span>` : ""}
      <span class="badge-categoria">${producto.categoriaId}</span>
      ${producto.etiquetas?.map(tag => `<span class="badge-etiqueta">${tag}</span>`).join("")}
    </div>
    <button class="btn-añadir" data-id="${producto.code}">Añadir</button>
    <button class="btn-favorito" data-id="${producto.code}">🤍</button>
  `;

  return card;
}

function renderizarProductos(lista) {
  const contenedor = document.getElementById("productos-container");
  const loader = document.getElementById("loader");

  contenedor.style.display = "none";
  loader.style.display = "grid";

  setTimeout(() => {
    loader.style.display = "none";
    contenedor.innerHTML = "";

    lista.forEach(producto => {
      const card = crearCard(producto);
      contenedor.appendChild(card);
    });

    contenedor.style.display = "grid";
    inicializarBotonesAñadir();
    inicializarBotonesFavorito();
  }, 600);
}

/**
 * Eventos de botones
 */
function inicializarBotonesAñadir() {
  document.querySelectorAll(".btn-añadir").forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.id;
      agregarAlCarrito(id);
      mostrarNotificacion("Producto añadido al carrito");
      actualizarBadgeCarrito();
    });
  });
}

function inicializarBotonesFavorito() {
  document.querySelectorAll(".btn-favorito").forEach(boton => {
    boton.addEventListener("click", () => {
      boton.classList.toggle("activo");
      boton.textContent = boton.classList.contains("activo") ? "❤️" : "🤍";
    });
  });
}

/**
 * Carrito
 */
function agregarAlCarrito(idProducto) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productoExistente = carrito.find(p => p.id === idProducto);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ id: idProducto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarBadgeCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  document.querySelector(".badge").textContent = total;
}

function mostrarNotificacion(mensaje) {
  alert(mensaje); // Puedes reemplazar por un toast visual
}

/**
 * Filtros y búsqueda
 */
let ordenAscendente = true;
const productos = PRODUCTS_PS;

document.getElementById("btn-orden-precio").addEventListener("click", () => {
  ordenAscendente = !ordenAscendente;
  actualizarListado();
});

document.getElementById("busqueda").addEventListener("input", actualizarListado);

document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("filtro-categoria").value = "";
  document.getElementById("filtro-forma").value = "";
  document.getElementById("filtro-tamano").value = "";
  document.querySelectorAll("input[name='etiquetas']").forEach(e => e.checked = false);

  actualizarURL({ categoria: "", forma: "", tamano: "", etiquetas: [] });
  renderizarProductos(productos);
});

const actualizarListado = debounce(() => {
  const texto = document.getElementById("busqueda").value;
  const filtros = obtenerFiltros();
  const filtrados = filtrarProductos(productos, filtros);
  const buscados = filtrarPorBusqueda(filtrados, texto);
  const ordenados = ordenarPorPrecio(buscados, ordenAscendente);
  renderizarProductos(ordenados);
}, 250);

/**
 * Inicialización
 */
document.addEventListener("DOMContentLoaded", () => {
  const filtrosIniciales = leerFiltrosDesdeURL();
  const filtrados = filtrarProductos(productos, filtrosIniciales);
  const ordenados = ordenarPorPrecio(filtrados, ordenAscendente);
  renderizarProductos(ordenados);
  actualizarBadgeCarrito();
});