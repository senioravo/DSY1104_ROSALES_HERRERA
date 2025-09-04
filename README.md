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

- mainProductos.js → validación, renderizado y lógica.

- styles.css → diseño visual y responsividad.

- assets → para almacenar las imagenes usadas.

- productos_pasteleria → indice con los productos de la pasteleria

# ID PS20: Estructura de productos

Funcionalidades implementadas
Filtros visuales con <select>: Se agregaron campos desplegables para filtrar por categoría (filtro-categoria), forma (filtro-forma) y etiqueta (filtro-etiqueta), según preferencias definidas.

# Req ID PS21: Filtros combinables y sincronización con URL

En este requerimiento se implementó el sistema de filtrado para el catálogo de productos, permitiendo al usuario aplicar múltiples criterios simultáneamente (categoría, forma y etiqueta), con persistencia en la URL y retroalimentación visual en la interfaz.

# Implementación técnica

- Se agregaron tres campos <select> en el HTML para filtrar por:

- categoría (filtro-categoria)

- forma (filtro-forma)

- etiqueta (filtro-etiqueta)

- Se creó la función aplicarFiltros(productos, filtros) en main.js para evaluar cada producto según los filtros activos. Se permite aplicar uno, varios o todos los filtros al mismo tiempo.

- Se implementó actualizarURL(filtros) para reflejar los filtros activos en la barra de navegación sin recargar la página, y obtenerFiltrosDesdeURL() para aplicar automáticamente los filtros al cargar la vista.

# Validaciones aplicadas

- La lógica de combinación se basa en condiciones tipo AND, evaluando que cada producto cumpla con todos los filtros activos. Ejemplo: Tortas Cuadradas + Forma Circular + Etiqueta Vegano.

- Se integró la lectura y escritura de filtros en la URL mediante URLSearchParams, permitiendo compartir enlaces filtrados y mantener el estado al recargar.

- Se agregó un botón “Limpiar filtros” que restablece todos los campos y limpia la URL con window.location.pathname.


# Renderizado en interfaz

Los productos filtrados se agrupan por categoría y se renderizan en secciones con títulos (<h2>) y grillas 
(.productos-grid). Si no hay coincidencias, se muestra un mensaje visual (#mensaje-sin-resultados) indicando que no se encontraron productos.

# Estilos aplicados

- Se mantuvo el layout con CSS Grid para mostrar los productos en formato responsive.

- Se definieron estilos para .filtros, .categoria-seccion, .productos-grid y el mensaje de “sin resultados”.

- Se ocultó el bloque de filtros por defecto y se mostró solo al hacer clic en el botón “Filtrar productos”.

# Archivos involucrados

- productos.html → estructura visual y campos de filtro.

- mainProductos.js → lógica de filtrado, renderizado y sincronización con URL.

- styles.css → diseño visual de filtros, grillas y mensajes.

- productos_pasteleria.js → fuente de datos del catálogo.

- assets → imágenes de los productos.
