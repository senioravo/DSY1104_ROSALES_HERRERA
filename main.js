import { PRODUCTS_PS } from "./productos_pasteleria.js";

/**
 * Convierte un número en formato de moneda chilena (CLP).
 */
function formatoCLP(valor) {
  return `$${valor.toLocaleString("es-CL")}`;
}

/**
 * Obtiene los filtros seleccionados por el usuario
 */
function obtenerFiltros() {
  const categoria = document.getElementById("filtro-categoria").value;
  const forma = document.getElementById("filtro-forma").value;
  const tamano = document.getElementById("filtro-tamano").value;
  const etiquetas = Array.from(document.querySelectorAll("input[name='etiquetas']:checked")).map(e => e.value);
  const precioMin = parseInt(document.getElementById("precio-min").value) || 0;
  const precioMax = parseInt(document.getElementById("precio-max").value) || Infinity;

  return { categoria, forma, tamano, etiquetas, precioMin, precioMax };
}

/**
 * Aplica los filtros combinables a la lista de productos
 */
function filtrarProductos(productos, filtros) {
  return productos.filter(p => {
    const coincideCategoria = !filtros.categoria || p.categoriaId === filtros.categoria;
    const coincideForma = !filtros.forma || p.tipoForma === filtros.forma;
    const coincideTamano = !filtros.tamano || p.tamañosDisponibles.includes(filtros.tamano);
    const coincideEtiquetas = filtros.etiquetas.length === 0 || filtros.etiquetas.every(tag => p.etiquetas?.includes(tag));
    const dentroDelRango = p.precioCLP >= filtros.precioMin && p.precioCLP <= filtros.precioMax;

    return coincideCategoria && coincideForma && coincideTamano && coincideEtiquetas && dentroDelRango;
  });
}

/**
 * Actualiza la URL con los filtros activos
 */
function actualizarURL(filtros) {
  const params = new URLSearchParams();

  if (filtros.categoria) params.set("categoria", filtros.categoria);
  if (filtros.forma) params.set("forma", filtros.forma);
  if (filtros.tamano) params.set("tamano", filtros.tamano);
  filtros.etiquetas.forEach(tag => params.append("etiqueta", tag));

  history.replaceState(null, "", "?" + params.toString());
}

/**
 * Lee los filtros desde la URL al cargar la página
 */
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
 * Normaliza texto para búsqueda (sin tildes, minúsculas)
 */
function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Función debounce para evitar múltiples llamadas rápidas
 */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Filtra productos por texto de búsqueda
 */
function filtrarPorBusqueda(productos, texto) {
  const query = normalizarTexto(texto);
  return productos.filter(p => {
    const nombre = normalizarTexto(p.nombre);
    const codigo = normalizarTexto(p.code);
    return nombre.includes(query) || codigo.includes(query);
  });
}

/**
 * Ordena productos por precio
 */
function ordenarPorPrecio(productos, ascendente = true) {
  return [...productos].sort((a, b) => ascendente ? a.precioCLP - b.precioCLP : b.precioCLP - a.precioCLP);
}

/**
 * Crea una tarjeta de producto con botones y badges
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
    <button class="btn-vermas" data-id="${producto.code}">Ver más</button>
  `;

  return card;
}

/**
 * Renderiza la lista de productos con animación de carga
 */
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
    inicializarBotonesVerMas(lista); // ✅ PS-028: activa botón “Ver más”
  }, 600);
}

/**
 * Activa botón “Añadir” en cada card
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

/**
 * Activa botón de favoritos visuales (sin login)
 */
function inicializarBotonesFavorito() {
  document.querySelectorAll(".btn-favorito").forEach(boton => {
    boton.addEventListener("click", () => {
      boton.classList.toggle("activo");
      boton.textContent = boton.classList.contains("activo") ? "❤️" : "🤍";
    });
  });
}

/**
 * Activa botón “Ver más” para abrir el modal (PS-028)
 */
function inicializarBotonesVerMas(lista) {
  document.querySelectorAll(".btn-vermas").forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.id;
      const producto = lista.find(p => p.code === id);
      abrirModal(producto);
    });
  });
}

/**
 * Lógica del carrito
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

/**
 * Actualiza el badge del carrito
 */
function actualizarBadgeCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  document.querySelector(".badge").textContent = total;
}

/**
 * Muestra una notificación simple
 */
function mostrarNotificacion(mensaje) {
  alert(mensaje); // Puedes reemplazar por un toast visual
}

/**
 * Eventos de búsqueda y filtros
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

/**
 * Actualiza el listado con filtros, búsqueda y orden
 */
const actualizarListado = debounce(() => {
  const texto = document.getElementById("busqueda").value;         // 🟡 Captura el texto de búsqueda
  const filtros = obtenerFiltros();                                // 🟡 Obtiene los filtros activos
  const filtrados = filtrarProductos(productos, filtros);          // 🟡 Aplica filtros combinables
  const buscados = filtrarPorBusqueda(filtrados, texto);           // 🟡 Aplica búsqueda por nombre/código
  const ordenados = ordenarPorPrecio(buscados, ordenAscendente);   // 🟡 Aplica orden por precio
  renderizarProductos(ordenados);                                  // 🟢 Renderiza el resultado final
}, 250);


const esAgotado = producto.stock === 0;

card.innerHTML = `
  <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}">
  <h2>${producto.nombre}</h2>
  <p><strong>Precio:</strong> ${formatoCLP(producto.precioCLP)}</p>
  <div class="badges">
    ${esAgotado ? `<span class="badge-agotado">Agotado</span>` : ""}
    ${esStockBajo ? `<span class="badge-stock">Últimas unidades</span>` : ""}
    <span class="badge-categoria">${producto.categoriaId}</span>
    ${producto.etiquetas?.map(tag => `<span class="badge-etiqueta">${tag}</span>`).join("")}
  </div>
  <button class="btn-añadir" data-id="${producto.code}">Añadir</button>
  <button class="btn-favorito" data-id="${producto.code}">🤍</button>
  <button class="btn-vermas" data-id="${producto.code}">Ver más</button>
`;