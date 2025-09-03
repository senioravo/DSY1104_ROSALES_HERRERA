# DSY1104_ROSALES_HERRERA


# Mil Sabores - Catálogo de Pastelería


# INTEGRANTES:
# Diego Herrera
# Luis Rosales

Aplicación web que muestra productos de pastelería con estructura validada en JavaScript. Incluye renderizado dinámico, etiquetas visuales y control de stock.

# ID PS20: Estructura de productos

En este requerimiento se definio y se valido la estructura de datos para los productos de la pastelería, asegurando que se renderizen correctamente en la interfaz.


# Implementación técnica

Se creó el archivo productos_pasteleria.js con un array PRODUCTS_PS que contiene 16 productos distribuidos en distintas categorías (TC, TT, PI, PSA, PT, PG, PV, TE).

Cada producto incluye los siguientes campos:

- code: identificador único

- nombre: nombre del producto

- categoriaId: categoría asignada

- tipoForma: "cuadrada", "circular" o null

- tamanosDisponibles: array con tamaños válidos

- precioCLP: número entero ≥ 0

- stock: número entero ≥ 0

- descripcion: texto descriptivo

- personalizable: booleano

- maxMsgChars: número entre 0 y 50

- imagen: ruta relativa a /assets/ejemplo.png


# Validaciones aplicadas

Se implementó la función validarProducto(p) en main.js para verificar:

- Existencia de todos los campos requeridos.

- Tipos de datos correctos.

- Valores válidos según las reglas del proyecto.

Se muestra advertencia en consola si algún producto no cumple con el esquema.

# Renderizado en interfaz

Se creó la función renderCard(producto) que genera una tarjeta visual con:

- Imagen del producto

- Nombre, precio formateado (formatoCLP), stock y tamaños

- Descripción y etiquetas como badges

- Indicador de personalización si aplica

Las tarjetas se insertan dinámicamente en el contenedor #productos-container.

# Estilos aplicados

- Se diseñó el layout con CSS Grid para mostrar los productos en formato responsive.

- Se definieron estilos para .producto, .badge-etiqueta y .productos-grid.

- Se controló el tamaño de las imágenes con object-fit: contain y max-height.


# Archivos involucrados

- productos.html → estructura visual.

- main.js → validación, renderizado y lógica.

- styles.css → diseño visual y responsividad.

- assets → para almacenar las imagenes usadas.

- productos_pasteleria → indice con los productos de la pasteleria




