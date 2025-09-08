import { PRODUCTS_PS } from "./productos_pasteleria.js";

/**
 * Convierte un número en formato de moneda chilena (CLP).
 */
function formatoCLP(valor) {
  return `$${valor.toLocaleString("es-CL")}`;
}