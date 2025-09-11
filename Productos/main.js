import { PRODUCTS_PS } from "./productos_pasteleria.js";

/** Formatea precio en CLP */
function formatoCLP(valor) {
    return `$${valor.toLocaleString("es-CL")}`;
}

/** Crea tarjeta de producto */
function crearCard(producto) {
    const card = document.createElement("div");
    card.classList.add("producto-card");

    const esStockBajo = producto.stock <= 3 && producto.stock > 0;
    const esAgotado = producto.stock === 0;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const estaEnCarrito = carrito.some(p => p.id === producto.code);

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
        <a href="detalle.html?code=${producto.code}" class="link-detalle">Ver detalle completo</a>
        ${estaEnCarrito ? `<button class="btn-eliminar" data-id="${producto.code}">Eliminar</button>` : ""}
      </div>
    </div>
  `;

  return card;
}

/** Renderiza productos */
function renderizarProductos(lista) {
  const contenedor = document.getElementById("productos-container");
  const loader = document.getElementById("loader");
  const mensajeVacio = document.getElementById("mensaje-vacio");

  contenedor.style.display = "none";
  loader.style.display = "grid";
  mensajeVacio.style.display = "none";

  setTimeout(() => {
    loader.style.display = "none";
    contenedor.innerHTML = "";

    if (lista.length === 0) {
      mensajeVacio.style.display = "block";
      contenedor.style.display = "none";
      return;
    }

    lista.forEach(producto => {
      const card = crearCard(producto);
      contenedor.appendChild(card);
    });

    contenedor.style.display = "grid";
    mensajeVacio.style.display = "none";
    inicializarBotonesAñadir();
    inicializarBotonesFavorito();
    inicializarBotonesEliminar();
    animarTarjetas();
  }, 600);
}

/** Animación al entrar en pantalla */
function animarTarjetas() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll(".producto-card").forEach(card => {
    observer.observe(card);
  });
}

/** Ordena productos por precio */
function ordenarPorPrecio(lista, ascendente = true) {
  return lista.slice().sort((a, b) => ascendente ? a.precioCLP - b.precioCLP : b.precioCLP - a.precioCLP);
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
  if (!texto) return "";
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function filtrarPorBusqueda(productos, texto) {
  if (!texto) return productos;
  const query = normalizarTexto(texto);
  return productos.filter(p => {
    const nombre = normalizarTexto(p.nombre);
    const codigo = normalizarTexto(p.code);
    return nombre.includes(query) || codigo.includes(query);
  });
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
  actualizarURL();
}, 250);

/** Botones */
function inicializarBotonesAñadir() {
  document.querySelectorAll(".btn-agregar").forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.id;
      agregarAlCarrito(id);
      mostrarNotificacion("Producto añadido al carrito");
      actualizarBadgeCarrito();

      const acciones = boton.closest(".acciones-producto");
      if (acciones && !acciones.querySelector(".btn-eliminar")) {
        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.dataset.id = id;
        btnEliminar.textContent = "Eliminar";
        acciones.appendChild(btnEliminar);

        btnEliminar.addEventListener("click", () => {
          eliminarDelCarrito(id);
          mostrarNotificacion("Producto eliminado del carrito");
          actualizarBadgeCarrito();
          btnEliminar.remove();
        });
      }
    });
  });
}

function inicializarBotonesEliminar() {
  document.querySelectorAll(".btn-eliminar").forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.id;
      eliminarDelCarrito(id);
      mostrarNotificacion("Producto eliminado del carrito");
      actualizarBadgeCarrito();
      boton.remove();
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

function eliminarDelCarrito(idProducto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter(p => p.id !== idProducto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarBadgeCarrito();
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
  // Render inicial
  renderizarProductos(PRODUCTS_PS);
  actualizarBadgeCarrito();

  // Ocultar filtros al cargar
  document.getElementById("filtros-opciones").style.display = "none";

  // Mostrar/ocultar filtros al hacer clic
  document.getElementById("btn-toggle-filtros").addEventListener("click", () => {
    const filtrosDiv = document.getElementById("filtros-opciones");
    const visible = filtrosDiv.style.display === "block";
    filtrosDiv.style.display = visible ? "none" : "block";
  });

  // Ordenar por precio con flecha
  document.getElementById("btn-orden-precio").addEventListener("click", () => {
    ordenAscendente = !ordenAscendente;
    const flecha = document.getElementById("flecha-precio");
    flecha.textContent = ordenAscendente ? "⬇️" : "⬆️";
    actualizarListado();
  });

  // Búsqueda en tiempo real
  document.getElementById("busqueda").addEventListener("input", actualizarListado);

  // Botón para limpiar filtros
  document.getElementById("btn-limpiar").addEventListener("click", () => {
    document.getElementById("filtro-categoria").value = "";
    document.getElementById("filtro-forma").value = "";
    document.getElementById("filtro-tamano").value = "";
    document.querySelectorAll("input[name='etiquetas']").forEach(e => e.checked = false);
    document.getElementById("precio-min").value = "";
    document.getElementById("precio-max").value = "";
    actualizarListado();
  });

  // Actualizar al cambiar filtros
  ["filtro-categoria", "filtro-forma", "filtro-tamano", "precio-min", "precio-max"].forEach(id => {
    document.getElementById(id).addEventListener("input", actualizarListado);
  });

  // Actualizar al cambiar etiquetas
  document.querySelectorAll("input[name='etiquetas']").forEach(checkbox => {
    checkbox.addEventListener("change", actualizarListado);
  });
});

/** Actualiza la URL con filtros activos */
function actualizarURL() {
  const filtros = obtenerFiltros();
  const texto = document.getElementById("busqueda").value;
  const params = new URLSearchParams();

  if (texto) params.set("q", texto);
  if (filtros.categoria) params.set("categoria", filtros.categoria);
  if (filtros.forma) params.set("forma", filtros.forma);
  if (filtros.tamano) params.set("tamano", filtros.tamano);
  if (filtros.etiquetas.length) params.set("etiquetas", filtros.etiquetas.join(","));
  if (filtros.precioMin) params.set("min", filtros.precioMin);
  if (filtros.precioMax !== Infinity) params.set("max", filtros.precioMax);
  params.set("orden", ordenAscendente ? "asc" : "desc");

  history.replaceState(null, "", `?${params.toString()}`);
}