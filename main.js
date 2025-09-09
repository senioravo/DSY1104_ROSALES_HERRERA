import { PRODUCTS_PS } from "./productos_pasteleria.js";

/** Formato CLP */
function formatoCLP(valor) {
  return `$${valor.toLocaleString("es-CL")}`;
}

/** Crea tarjeta de producto */
function crearCard(producto) {
  const card = document.createElement("div");
  card.classList.add("producto-card");

  const esStockBajo = producto.stock <= 3 && producto.stock > 0;
  const esAgotado = producto.stock === 0;

  card.innerHTML = `
    <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}" class="producto-imagen">
    <div class="producto-info">
      <h3>${producto.nombre}</h3>
      <p class="precio">${formatoCLP(producto.precioCLP)}</p>
      <p class="codigo">Código: ${producto.code}</p>
      <p class="stock">Stock: ${producto.stock}</p>
      <p class="tamanos">Tamaños: ${producto.tamanosDisponibles.join(", ")}</p>
      <div class="etiquetas">
        ${producto.etiquetas?.map(tag => `<span class="etiqueta">${tag}</span>`).join("")}
      </div>
      <div class="acciones-producto">
        <button class="btn-agregar" data-id="${producto.code}" ${esAgotado ? "disabled" : ""}>Añadir</button>
        <button class="btn-favorito" data-id="${producto.code}">🤍</button>
        <button class="btn-vermas" data-id="${producto.code}">Vista rápida</button>
        <a href="detalle.html?code=${producto.code}" class="link-detalle">Ver detalle completo</a>
      </div>
    </div>
  `;

  return card;
}

/** Renderiza productos */
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
    inicializarBotonesVerMas(lista);
  }, 600);
}

/** Filtros activos */
function obtenerFiltros() {
  const categoria = document.getElementById("filtro-categoria").value;
  const forma = document.getElementById("filtro-forma").value;
  const tamano = document.getElementById("filtro-tamano").value;
  const etiquetas = Array.from(document.querySelectorAll("input[name='etiquetas']:checked")).map(e => e.value);
  const precioMin = parseInt(document.getElementById("precio-min").value) || 0;
  const precioMax = parseInt(document.getElementById("precio-max").value) || Infinity;
  return { categoria, forma, tamano, etiquetas, precioMin, precioMax };
}

/** Filtrado combinable */
function filtrarProductos(productos, filtros) {
  return productos.filter(p => {
    const coincideCategoria = !filtros.categoria || p.categoriaId === filtros.categoria;
    const coincideForma = !filtros.forma || p.tipoForma === filtros.forma;
    const coincideTamano = !filtros.tamano || p.tamanosDisponibles.includes(filtros.tamano);
    const coincideEtiquetas = filtros.etiquetas.length === 0 || filtros.etiquetas.every(tag => p.etiquetas?.includes(tag));
    const dentroDelRango = p.precioCLP >= filtros.precioMin && p.precioCLP <= filtros.precioMax;
    return coincideCategoria && coincideForma && coincideTamano && coincideEtiquetas && dentroDelRango;
  });
}

/** Búsqueda por texto */
function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filtrarPorBusqueda(productos, texto) {
  const query = normalizarTexto(texto);
  return productos.filter(p => {
    const nombre = normalizarTexto(p.nombre);
    const codigo = normalizarTexto(p.code);
    return nombre.includes(query) || codigo.includes(query);
  });
}

/** Orden por precio */
function ordenarPorPrecio(productos, ascendente = true) {
  return [...productos].sort((a, b) => ascendente ? a.precioCLP - b.precioCLP : b.precioCLP - a.precioCLP);
}

/** Debounce */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/** Actualiza listado */
const actualizarListado = debounce(() => {
  const texto = document.getElementById("busqueda").value;
  const filtros = obtenerFiltros();
  const filtrados = filtrarProductos(PRODUCTS_PS, filtros);
  const buscados = filtrarPorBusqueda(filtrados, texto);
  const ordenados = ordenarPorPrecio(buscados, ordenAscendente);
  renderizarProductos(ordenados);
}, 250);

/** Botones */
function inicializarBotonesAñadir() {
  document.querySelectorAll(".btn-agregar").forEach(boton => {
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

function inicializarBotonesVerMas(lista) {
  document.querySelectorAll(".btn-vermas").forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.id;
      const producto = lista.find(p => p.code === id);
      abrirModal(producto);
    });
  });
}

/** Carrito */
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

/** Notificación */
function mostrarNotificacion(mensaje) {
  alert(mensaje); // Puedes reemplazar por toast visual
}

/** Eventos */
let ordenAscendente = true;

document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos(PRODUCTS_PS);
  actualizarBadgeCarrito();

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
    document.getElementById("precio-min").value = "";
    document.getElementById("precio-max").value = "";
    actualizarListado();
  });

  ["filtro-categoria", "filtro-forma", "filtro-tamano", "precio-min", "precio-max"].forEach(id => {
    document.getElementById(id).addEventListener("input", actualizarListado);
  });

  document.querySelectorAll("input[name='etiquetas']").forEach(checkbox => {
    checkbox.addEventListener("change", actualizarListado);
  });
});
