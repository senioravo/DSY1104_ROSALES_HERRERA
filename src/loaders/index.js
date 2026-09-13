export { homeLoader }
from './homeLoader.jsx';
export { contactoLoader }
from './contactoLoader.jsx';
export { nosotrosLoader }
from './nosotrosLoader.jsx';
export { productsLoader }
from './productsLoader.jsx';
export { personalizeLoader }
from './personalizeLoader.jsx';

// Simulamos delay de red para demostrar la funcionalidad de loaders
const simulateNetworkDelay = (ms = 1000) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// ============================================================================
// LOADER PARA LA PÁGINA DEL BLOG (Lista de artículos)
// ============================================================================

export const blogLoader = async() => {
    await simulateNetworkDelay(300);

    // Todos los artículos del blog
    const articles = [{
            id: 1,
            slug: "decoracion-frutas-frescas",
            titulo: "Decoración con Frutas Frescas",
            descripcion: "Las frutas frescas son una de las mejores formas de decorar pasteles.",
            categoria: "Decoración",
            fecha: "2025-08-27",
            autor: "Ana Martínez",
            imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
            tiempoLectura: "6 min"
        },
        {
            id: 2,
            slug: "pie-limon-clasico",
            titulo: "Receta: Pie de Limón Clásico",
            descripcion: "Una receta tradicional que nunca pasa de moda.",
            categoria: "Recetas",
            fecha: "2025-08-21",
            autor: "Carlos Rodríguez",
            imagen: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800",
            tiempoLectura: "8 min"
        },
        {
            id: 3,
            slug: "historia-queque-marmoleado",
            titulo: "Historia del Queque Marmoleado",
            descripcion: "Un clásico de la repostería con raíces europeas.",
            categoria: "Historia",
            fecha: "2025-08-14",
            autor: "María González",
            imagen: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800",
            tiempoLectura: "5 min"
        },
        {
            id: 4,
            slug: "merengue-perfecto",
            titulo: "Secretos del Merengue Perfecto",
            descripcion: "El merengue es una de las preparaciones más técnicas.",
            categoria: "Técnicas",
            fecha: "2025-08-10",
            autor: "Carlos Rodríguez",
            imagen: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=800",
            tiempoLectura: "7 min"
        },
        {
            id: 5,
            slug: "torta-chocolate-humeda",
            titulo: "Torta de Chocolate Húmeda",
            descripcion: "La receta definitiva para una torta que se derrite en la boca.",
            categoria: "Recetas",
            fecha: "2025-08-05",
            autor: "Ana Martínez",
            imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
            tiempoLectura: "6 min"
        },
        {
            id: 6,
            slug: "buttercream-tecnicas",
            titulo: "Buttercream: Técnicas de Decoración",
            descripcion: "La crema más versátil para decorar pasteles.",
            categoria: "Decoración",
            fecha: "2025-08-01",
            autor: "Carlos Rodríguez",
            imagen: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800",
            tiempoLectura: "9 min"
        },
        {
            id: 7,
            slug: "cupcakes-fantasmas-halloween",
            titulo: "Cupcakes de Fantasmas Espeluznantes",
            descripcion: "Perfectos para Halloween, adorables y deliciosos.",
            categoria: "Halloween",
            fecha: "2025-10-15",
            autor: "Ana Martínez",
            imagen: "https://images.unsplash.com/photo-1599785209796-786432b228bc?w=800",
            tiempoLectura: "8 min"
        },
        {
            id: 8,
            slug: "galletas-calabaza-halloween",
            titulo: "Galletas de Calabaza Especiadas",
            descripcion: "Suaves, especiadas y con el sabor perfecto del otoño.",
            categoria: "Halloween",
            fecha: "2025-10-14",
            autor: "María González",
            imagen: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
            tiempoLectura: "7 min"
        },
        {
            id: 9,
            slug: "torta-cementerio-halloween",
            titulo: "Torta Cementerio de Chocolate",
            descripcion: "Una torta espeluznante perfecta para Halloween.",
            categoria: "Halloween",
            fecha: "2025-10-13",
            autor: "Carlos Rodríguez",
            imagen: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800",
            tiempoLectura: "12 min"
        },
        {
            id: 10,
            slug: "secretos-torta-chocolate-perfecta",
            titulo: "Los Secretos de la Torta de Chocolate Perfecta",
            descripcion: "Descubre los trucos para crear la torta más deliciosa.",
            categoria: "Consejos",
            fecha: "2025-10-15",
            autor: "Carlos Rodríguez",
            imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
            tiempoLectura: "5 min"
        },
        {
            id: 11,
            slug: "historia-pasteleria-chilena",
            titulo: "La Historia de la Pastelería Chilena",
            descripcion: "Un viaje por la evolución de los postres en Chile.",
            categoria: "Historia",
            fecha: "2025-10-10",
            autor: "María González",
            imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
            tiempoLectura: "8 min"
        },
        {
            id: 12,
            slug: "consejos-conservar-postres",
            titulo: "Consejos para Conservar tus Postres Favoritos",
            descripcion: "Tips profesionales para mantener la frescura y sabor.",
            categoria: "Consejos",
            fecha: "2025-10-08",
            autor: "Ana Martínez",
            imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
            tiempoLectura: "4 min"
        }
    ];

    // Categorías únicas
    const categories = ['Todas', ...new Set(articles.map(a => a.categoria))];

    return {
        articles,
        categories
    };
};

// ============================================================================
// LOADER PARA ARTÍCULO INDIVIDUAL DEL BLOG
// ============================================================================

export const articuloLoader = async({ params }) => {
    await simulateNetworkDelay(300);

    const { slug } = params;

    // Base de datos completa de artículos con contenido
    const articles = [{
            id: 1,
            slug: "decoracion-frutas-frescas",
            titulo: "Decoración con Frutas Frescas",
            descripcion: "Las frutas frescas son una de las mejores formas de decorar pasteles.",
            categoria: "Decoración",
            fecha: "2025-08-27",
            autor: "Ana Martínez",
            imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
            tiempoLectura: "6 min",
            contenido: `
Las frutas frescas son una de las mejores formas de decorar pasteles, aportando color, sabor y una presentación profesional.

## Selección de frutas

Elige siempre frutas de temporada y en su punto óptimo de maduración. Las fresas, kiwis, arándanos y duraznos son excelentes opciones.

## Técnicas de corte

- **Fresas**: Corta en abanico o en láminas finas
- **Kiwi**: Rodajas perfectas de 3-4mm
- **Arándanos**: Úsalos enteros como puntos de color

## Conservación

Aplica un glaseado neutro para mantener las frutas frescas y brillantes por más tiempo.
      `
        },
        {
            id: 2,
            slug: "pie-limon-clasico",
            titulo: "Receta: Pie de Limón Clásico",
            descripcion: "Una receta tradicional que nunca pasa de moda.",
            categoria: "Recetas",
            fecha: "2025-08-21",
            autor: "Carlos Rodríguez",
            imagen: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800",
            tiempoLectura: "8 min",
            contenido: `
Una receta tradicional que nunca pasa de moda. Este pie de limón combina la acidez perfecta del limón con un merengue suave.

## Ingredientes para la base
- 200g de galletas digestivas
- 80g de mantequilla derretida

## Relleno de limón
- 4 limones (jugo y ralladura)
- 3 huevos
- 150g de azúcar
- 2 cucharadas de maicena

## Preparación paso a paso

1. Triturar las galletas y mezclar con mantequilla
2. Formar la base en el molde
3. Preparar el relleno batiendo todos los ingredientes
4. Hornear a 180°C por 15 minutos
5. Cubrir con merengue y gratinar
      `
        },
        {
            id: 3,
            slug: "historia-queque-marmoleado",
            titulo: "Historia del Queque Marmoleado",
            descripcion: "Un clásico de la repostería con raíces europeas.",
            categoria: "Historia",
            fecha: "2025-08-14",
            autor: "María González",
            imagen: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800",
            tiempoLectura: "5 min",
            contenido: `
El queque marmoleado es un clásico de la repostería que tiene sus raíces en Europa, especialmente en Austria y Alemania.

## Orígenes europeos

Conocido como "Marmorkuchen" en alemán, este tipo de bizcocho se popularizó en el siglo XVIII entre la aristocracia europea.

## Llegada a Chile

Los inmigrantes alemanes trajeron esta receta a Chile a mediados del siglo XIX, adaptándola con ingredientes locales.

## La técnica del marmoleado

El secreto está en alternar las masas de vainilla y chocolate, creando ondas naturales sin mezclar completamente.

## Tradición familiar

En Chile, el queque marmoleado se convirtió en un clásico de las once familiares y celebraciones íntimas.
      `
        },
        {
            id: 4,
            slug: "merengue-perfecto",
            titulo: "Secretos del Merengue Perfecto",
            descripcion: "El merengue es una de las preparaciones más técnicas.",
            categoria: "Técnicas",
            fecha: "2025-08-10",
            autor: "Carlos Rodríguez",
            imagen: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=800",
            tiempoLectura: "7 min",
            contenido: `
El merengue es una de las preparaciones más técnicas de la repostería. Aquí te revelamos todos los secretos.

## Tipos de merengue

- **Francés**: El más básico, claras + azúcar
- **Italiano**: Con almíbar caliente
- **Suizo**: Batido a baño maría

## Consejos profesionales

1. **Claras a temperatura ambiente**: Baten mejor y más rápido
2. **Bowl completamente limpio**: Sin rastros de grasa
3. **Azúcar gradual**: Añadir de a poco para mejor incorporación
4. **Punto perfecto**: Cuando se forman picos firmes

## Problemas comunes

- **Se baja**: Exceso de batido o claras muy frías
- **Granuloso**: Azúcar mal incorporada
- **Aguado**: Humedad en el ambiente
      `
        },
        {
            id: 5,
            slug: "torta-chocolate-humeda",
            titulo: "Torta de Chocolate Húmeda",
            descripcion: "La receta definitiva para una torta que se derrite en la boca.",
            categoria: "Recetas",
            fecha: "2025-08-05",
            autor: "Ana Martínez",
            imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
            tiempoLectura: "6 min",
            contenido: `
La receta definitiva para una torta de chocolate que se derrite en la boca. Un clásico que nunca falla.

## Ingredientes secretos

- **Café**: Intensifica el sabor del chocolate
- **Agua hirviendo**: Activa el cacao en polvo
- **Aceite**: Mantiene la humedad mejor que la mantequilla

## Técnica especial

1. Mezclar ingredientes secos por separado
2. Batir huevos con azúcar hasta blanquear
3. Alternar ingredientes secos con líquidos
4. Terminar con agua hirviendo (la masa queda líquida, ¡es normal!)

## Horneado perfecto

- Temperatura: 160°C
- Tiempo: 35-40 minutos
- Prueba del palillo: Debe salir con pocas migas húmedas

## El acabado

Deja enfriar completamente antes de desmoldar. La torta mejora al día siguiente.
      `
        },
        {
            id: 6,
            slug: "buttercream-tecnicas",
            titulo: "Buttercream: Técnicas de Decoración",
            descripcion: "La crema más versátil para decorar pasteles.",
            categoria: "Decoración",
            fecha: "2025-08-01",
            autor: "Carlos Rodríguez",
            imagen: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800",
            tiempoLectura: "9 min",
            contenido: `
El buttercream es la crema más versátil para decorar. Aprende las técnicas fundamentales para lograr decoraciones profesionales.

## Tipos de buttercream

- **Americano**: Mantequilla + azúcar en polvo (el más fácil)
- **Italiano**: Con merengue italiano (más estable)
- **Suizo**: Con merengue suizo (textura sedosa)

## Herramientas esenciales

- Mangas pasteleras de diferentes tamaños
- Boquillas: redonda, estrella, pétalo, hoja
- Espátula offset para alisar
- Rasqueta para bordes perfectos

## Técnicas básicas

### Rosas clásicas
1. Boquilla de pétalo en ángulo de 45°
2. Centro con movimiento circular
3. Pétalos desde adentro hacia afuera

### Bordes decorativos
- **Estrella**: Presión constante, movimiento zigzag
- **Concha**: Presión fuerte-suave-fuerte
- **Roseta**: Movimiento circular desde el centro

## Consejos profesionales

- Buttercream a temperatura ambiente (21-23°C)
- Practica primero en un plato antes que en la torta
- Mantén las mangas siempre limpias
      `
        },
        {
            id: 7,
            slug: "cupcakes-fantasmas-halloween",
            titulo: "Cupcakes de Fantasmas Espeluznantes",
            descripcion: "Perfectos para Halloween, adorables y deliciosos.",
            categoria: "Halloween",
            fecha: "2025-10-15",
            autor: "Ana Martínez",
            imagen: "https://images.unsplash.com/photo-1599785209796-786432b228bc?w=800",
            tiempoLectura: "8 min",
            contenido: `
Perfectos para Halloween, estos cupcakes de vainilla decorados como fantasmas son adorables y deliciosos.

## Base de cupcakes de vainilla

- 2 tazas harina
- 1½ tazas azúcar
- ½ taza mantequilla
- 2 huevos
- 1 taza leche
- 2 cditas polvo de hornear
- 1 cdita esencia de vainilla

## Decoración de fantasma

### Buttercream blanco
- 200g mantequilla
- 400g azúcar en polvo
- 2-3 cdas leche
- Colorante blanco (opcional)

### Técnica de aplicación
1. Manga con boquilla redonda grande
2. Empezar desde el centro hacia afuera
3. Crear forma de fantasma con movimientos ondulados
4. Chispas de chocolate para los ojos
5. Toque final con azúcar perlado para brillo

## Tips espeluznantes

- Añade colorante alimentario negro en los bordes para sombras
- Usa coco rallado teñido de gris para efecto "polvoriento"
- Sirve en bases negras o naranjas para más dramatismo
      `
        },
        {
            id: 8,
            slug: "galletas-calabaza-halloween",
            titulo: "Galletas de Calabaza Especiadas",
            descripcion: "Suaves, especiadas y con el sabor perfecto del otoño.",
            categoria: "Halloween",
            fecha: "2025-10-14",
            autor: "María González",
            imagen: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
            tiempoLectura: "7 min",
            contenido: `
Suaves, especiadas y con el sabor perfecto del otoño. Estas galletas son ideales para Halloween y fiestas temáticas.

## Ingredientes especiales

- 1 taza puré de calabaza
- Mix de especias: canela, nuez moscada, jengibre, clavo
- Harina integral para textura rústica
- Azúcar morena para mayor profundidad de sabor

## Mezcla de especias perfecta

- 2 cditas canela
- 1 cdita nuez moscada
- ½ cdita jengibre molido
- ¼ cdita clavo molido
- Pizca de cardamomo

## Preparación

1. Mezclar ingredientes secos con especias
2. Batir mantequilla con azúcares hasta cremoso
3. Agregar huevo y puré de calabaza
4. Incorporar harina gradualmente
5. Refrigerar masa 30 minutos
6. Formar bolitas y aplastar ligeramente
7. Hornear a 180°C por 12-15 minutos

## Glaseado naranja

- Azúcar en polvo + jugo de naranja
- Colorante naranja para el color perfecto
- Aplicar cuando las galletas estén frías

## Decoración temática

- Chispas de chocolate negro para "semillas"
- Formas de calabaza con cortadores especiales
- Empolvado con canela para acabado rústico
      `
        },
        {
            id: 9,
            slug: "torta-cementerio-halloween",
            titulo: "Torta Cementerio de Chocolate",
            descripcion: "Una torta espeluznante perfecta para Halloween.",
            categoria: "Halloween",
            fecha: "2025-10-13",
            autor: "Carlos Rodríguez",
            imagen: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800",
            tiempoLectura: "12 min",
            contenido: `
Una torta espeluznante perfecta para Halloween. Chocolate húmedo decorado como un terrorífico cementerio.

## Base: Torta de chocolate oscura

- Receta de torta de chocolate húmeda (ver artículo relacionado)
- Añadir cacao negro extra para color más oscuro
- Dos capas para mayor altura

## Decoración del cementerio

### "Tierra" del cementerio
- Galletas Oreo trituradas
- Mezclar con azúcar morena
- Esparcir sobre buttercream chocolate

### Lápidas terroríficas
- Galletas rectangulares (María o digestivas)
- Cobertura de chocolate derretido
- Escribir "RIP" con manga y chocolate blanco
- Clavar en la torta mientras el chocolate esté fresco

### Elementos adicionales

#### Árboles muertos
- Pretzel sticks como ramas secas
- Anclar con buttercream

#### Fantasmas
- Malvaviscos cortados por la mitad
- Puntos de chocolate para ojos

#### Calabazas miniatura
- Bombones naranjas
- Tallos de chocolate verde

## Técnica de montaje

1. Rellenar torta con buttercream chocolate
2. Cubrir completamente con crema
3. Aplicar "tierra" de galleta
4. Insertar lápidas en ángulos variados
5. Añadir elementos decorativos
6. Efecto final con azúcar perlado para "rocío nocturno"

## Presentación teatral

- Base negra o plateada
- Iluminación tenue
- Niebla seca para efecto especial
- Servir con cucharas en forma de pala
      `
        },
        {
            id: 10,
            slug: "secretos-torta-chocolate-perfecta",
            titulo: "Los Secretos de la Torta de Chocolate Perfecta",
            descripcion: "Descubre los trucos para crear la torta más deliciosa.",
            categoria: "Consejos",
            fecha: "2025-10-15",
            autor: "Carlos Rodríguez",
            imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
            tiempoLectura: "5 min",
            contenido: `
En Mil Sabores hemos perfeccionado nuestra receta de torta de chocolate durante más de 30 años. Aquí te compartimos algunos de nuestros secretos mejor guardados.

## Ingredientes de calidad

El primer secreto está en utilizar chocolate de alta calidad. Nosotros utilizamos chocolate belga con al menos 70% de cacao para lograr ese sabor intenso y balanceado.

## La temperatura perfecta

La temperatura del horno debe ser exactamente 160°C. Muchas personas cometen el error de usar temperaturas muy altas, lo que resulta en una torta seca por fuera y cruda por dentro.

## El tiempo de batido

El batido de la mantequilla con el azúcar debe durar exactamente 5 minutos para incorporar el aire necesario y lograr esa textura esponjosa característica.

## El toque secreto

Nuestro ingrediente secreto es una cucharadita de café instantáneo que intensifica el sabor del chocolate sin aportar sabor a café.
      `
        },
        {
            id: 11,
            slug: "historia-pasteleria-chilena",
            titulo: "La Historia de la Pastelería Chilena",
            descripcion: "Un viaje por la evolución de los postres en Chile.",
            categoria: "Historia",
            fecha: "2025-10-10",
            autor: "María González",
            imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
            tiempoLectura: "8 min",
            contenido: `
La pastelería en Chile tiene una rica historia que combina tradiciones indígenas, españolas y europeas, creando una identidad única en el mundo de los postres.

## Los orígenes

Todo comenzó en la época colonial, cuando los españoles trajeron técnicas de repostería europeas que se fusionaron con ingredientes locales como la lúcuma y el membrillo.

## Influencias europeas

Durante el siglo XIX, la inmigración alemana, francesa e italiana enriqueció nuestra tradición pastelera con nuevas técnicas y recetas.

## Postres tradicionales chilenos

- Torta de mil hojas
- Kuchen alemán
- Alfajores
- Brazo de reina

## La pastelería moderna

Hoy en día, los pasteleros chilenos combinan tradición con innovación, creando postres únicos que representan nuestra identidad culinaria.
      `
        },
        {
            id: 12,
            slug: "consejos-conservar-postres",
            titulo: "Consejos para Conservar tus Postres Favoritos",
            descripcion: "Tips profesionales para mantener la frescura y sabor.",
            categoria: "Consejos",
            fecha: "2025-10-08",
            autor: "Ana Martínez",
            imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
            tiempoLectura: "4 min",
            contenido: `
La conservación adecuada es clave para disfrutar al máximo de nuestros postres caseros. Aquí te compartimos los mejores tips profesionales.

## Tipos de conservación según el postre

### Tortas y pasteles
- **Temperatura ambiente**: Máximo 2 días en lugar fresco y seco
- **Refrigerador**: 5-7 días bien tapadas
- **Congelador**: Hasta 3 meses (sin decoraciones)

### Galletas y cookies
- **Recipiente hermético**: 2-3 semanas a temperatura ambiente
- **Separar por tipos**: No mezclar galletas crujientes con suaves
- **Papel pergamino**: Entre capas para evitar que se peguen

### Postres con crema
- **Solo refrigerador**: Nunca a temperatura ambiente
- **Máximo 3 días**: Para óptima frescura
- **Tapar bien**: Con film transparente directo sobre la superficie

## Consejos profesionales

### Control de humedad
- Usar gel de sílice en recipientes de galletas
- Evitar refrigeradores muy húmedos
- Secar completamente antes de guardar

### Envolturas correctas
- **Film transparente**: Para contacto directo
- **Papel aluminio**: Para protección extra
- **Recipientes de vidrio**: Ideales para postres cremosos

### Etiquetado
- Fecha de elaboración
- Tipo de conservación
- Tiempo límite de consumo

## Errores comunes a evitar

- Guardar postres aún tibios
- Mezclar olores fuertes en el refrigerador
- No proteger de la luz directa
- Descongelar y volver a congelar

## Señales de que ya no está fresco

- Cambio en textura o color
- Olor diferente al original
- Aparición de moho
- Sabor alterado

## Tip extra

Muchos postres mejoran al segundo día, cuando los sabores se integran mejor. ¡No siempre lo más fresco es lo más sabroso!
      `
        }
    ];

    // Buscar el artículo por slug
    const article = articles.find(a => a.slug === slug);

    // Si no se encuentra, lanzar error 404
    if (!article) {
        throw new Response("Artículo no encontrado", { status: 404 });
    }

    return {
        article: article,
        post: article // Alias para compatibilidad con el hook
    };
};