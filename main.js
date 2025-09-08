import { PRODUCTS_PS } from "./productos_pasteleria.js";

/**
 * Convierte un número en formato de moneda chilena (CLP).
 */
function formatoCLP(valor) {
  return `$${valor.toLocaleString("es-CL")}`;
}


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

document.getElementById("btn-limpiar").addEventListener("click", () => {
  document.getElementById("filtro-categoria").value = "";
  document.getElementById("filtro-forma").value = "";
  document.getElementById("filtro-tamano").value = "";
  document.querySelectorAll("input[name='etiquetas']").forEach(e => e.checked = false);

  actualizarURL({ categoria: "", forma: "", tamano: "", etiquetas: [] });
  renderizarProductos(productos); // Reemplaza con tu función de render
});

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



let ordenAscendente = true;

document.getElementById("btn-orden-precio").addEventListener("click", () => {
  ordenAscendente = !ordenAscendente;
  actualizarListado();
});

const actualizarListado = debounce(() => {
  const texto = document.getElementById("busqueda").value;
  const filtrados = filtrarPorBusqueda(productos, texto);
  const ordenados = ordenarPorPrecio(filtrados, ordenAscendente);
  renderizarProductos(ordenados);
}, 250);

document.getElementById("busqueda").addEventListener("input", actualizarListado);
