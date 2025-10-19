// Loaders para React Router - Funciones que cargan datos antes de renderizar componentes
// Archivo: src/loaders/index.js

// Simulamos delay de red para demostrar la funcionalidad de loaders
const simulateNetworkDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Loader para la página Home
export const homeLoader = async () => {
  await simulateNetworkDelay(300);
  
  return {
    hero: {
      title: "Mil Sabores",
      subtitle: "La pastelería que endulza tus momentos especiales",
      description: "Más de 30 años creando los postres más deliciosos de la ciudad"
    },
    stats: {
      yearsInBusiness: 30,
      happyCustomers: 5000,
      productsCreated: 15000,
      cityLocations: 3
    },
    featuredProducts: [
      { id: 1, name: "Torta Chocolate", price: 25000, featured: true },
      { id: 2, name: "Cheesecake Frutos Rojos", price: 22000, featured: true },
      { id: 3, name: "Mil Hojas", price: 18000, featured: true }
    ]
  };
};

// Loader para la página Nosotros
export const nosotrosLoader = async () => {
  await simulateNetworkDelay(200);
  
  return {
    mission: "Crear momentos dulces e inolvidables a través de nuestras deliciosas creaciones artesanales",
    vision: "Ser la pastelería de referencia, reconocida por la calidad, innovación y el amor en cada producto",
    timeline: [
      { year: 1995, event: "Fundación de Mil Sabores", description: "Comenzamos como un pequeño local familiar" },
      { year: 2005, event: "Primera expansión", description: "Abrimos nuestro segundo local en el centro de la ciudad" },
      { year: 2015, event: "Reconocimiento nacional", description: "Premiados como la mejor pastelería de la región" },
      { year: 2025, event: "30 años de tradición", description: "Celebramos tres décadas endulzando momentos especiales" }
    ],
    values: [
      {
        name: "Calidad",
        description: "Utilizamos solo los mejores ingredientes para nuestras creaciones",
        icon: "fa-star"
      },
      {
        name: "Tradición",
        description: "Mantenemos las recetas familiares que nos han acompañado por generaciones",
        icon: "fa-heart"
      },
      {
        name: "Innovación",
        description: "Constantemente creamos nuevos sabores y diseños únicos",
        icon: "fa-lightbulb"
      },
      {
        name: "Servicio",
        description: "Cada cliente es parte de nuestra familia extendida",
        icon: "fa-users"
      }
    ],
    team: {
      founder: "María González",
      headChef: "Carlos Rodríguez",
      totalEmployees: 15
    }
  };
};

// Loader para la página Productos
export const productosLoader = async () => {
  await simulateNetworkDelay(400);
  
  return {
    categories: [
      { id: 1, name: "Tortas", count: 25 },
      { id: 2, name: "Pasteles", count: 18 },
      { id: 3, name: "Galletas", count: 12 },
      { id: 4, name: "Postres", count: 15 }
    ],
    products: [
      {
        id: 1,
        name: "Torta Chocolate Supreme",
        category: "Tortas",
        price: 35000,
        description: "Deliciosa torta de chocolate con relleno de dulce de leche",
        ingredients: ["Chocolate belga", "Dulce de leche", "Crema chantilly"],
        available: true,
        preparationTime: "2 horas"
      },
      {
        id: 2,
        name: "Cheesecake New York",
        category: "Postres",
        price: 28000,
        description: "Clásico cheesecake con base de galletas y topping de frutos rojos",
        ingredients: ["Queso crema", "Frutos rojos", "Base de galletas"],
        available: true,
        preparationTime: "4 horas"
      },
      {
        id: 3,
        name: "Mil Hojas Tradicional",
        category: "Pasteles",
        price: 22000,
        description: "Tradicional mil hojas con crema pastelera y manjar",
        ingredients: ["Masa hojaldre", "Crema pastelera", "Manjar"],
        available: false,
        preparationTime: "3 horas"
      }
    ],
    specialOffers: [
      { productId: 1, discount: 15, validUntil: "2025-11-30" },
      { productId: 2, discount: 10, validUntil: "2025-10-31" }
    ]
  };
};

// Loader para Personaliza tu Torta
export const personalizaTuTortaLoader = async () => {
  await simulateNetworkDelay(300);
  
  return {
    customizationOptions: {
      sizes: [
        { id: 1, name: "Pequeña (6 personas)", basePrice: 18000 },
        { id: 2, name: "Mediana (12 personas)", basePrice: 32000 },
        { id: 3, name: "Grande (20 personas)", basePrice: 55000 }
      ],
      flavors: [
        { id: 1, name: "Chocolate", additionalCost: 0 },
        { id: 2, name: "Vainilla", additionalCost: 0 },
        { id: 3, name: "Red Velvet", additionalCost: 5000 },
        { id: 4, name: "Lemon", additionalCost: 3000 }
      ],
      fillings: [
        { id: 1, name: "Dulce de leche", cost: 2000 },
        { id: 2, name: "Crema chantilly", cost: 1500 },
        { id: 3, name: "Mermelada de frutos rojos", cost: 2500 },
        { id: 4, name: "Nutella", cost: 3000 }
      ],
      decorations: [
        { id: 1, name: "Flores comestibles", cost: 8000 },
        { id: 2, name: "Figuras de chocolate", cost: 12000 },
        { id: 3, name: "Escritura personalizada", cost: 5000 }
      ]
    },
    deliveryInfo: {
      leadTime: "48 horas mínimo",
      deliveryZones: ["Centro", "Las Condes", "Providencia", "Ñuñoa"],
      deliveryCost: 3000
    }
  };
};

// Loader para la página Blog
export const blogLoader = async () => {
  await simulateNetworkDelay(600);
  
  return {
    posts: [
      {
        id: 1,
        slug: "secretos-torta-chocolate-perfecta",
        title: "Los secretos de la torta de chocolate perfecta",
        excerpt: "Descubre los trucos que utilizamos en Mil Sabores para crear la torta de chocolate más deliciosa",
        content: "El secreto está en la calidad del chocolate y la temperatura exacta...",
        author: "Carlos Rodríguez",
        publishDate: "2025-10-15",
        category: "Recetas",
        tags: ["chocolate", "tortas", "consejos"],
        readTime: "5 min",
        featured: true
      },
      {
        id: 2,
        slug: "historia-pasteleria-chilena",
        title: "La historia de la pastelería chilena",
        excerpt: "Un viaje por la evolución de los postres en Chile y cómo han influenciado nuestra cocina",
        content: "La pastelería chilena tiene raíces profundas que combinan tradiciones europeas...",
        author: "María González",
        publishDate: "2025-10-10",
        category: "Historia",
        tags: ["historia", "chile", "tradición"],
        readTime: "8 min",
        featured: false
      },
      {
        id: 3,
        slug: "consejos-conservar-postres",
        title: "Consejos para conservar tus postres favoritos",
        excerpt: "Tips profesionales para mantener la frescura y sabor de tus postres por más tiempo",
        content: "La conservación adecuada es clave para disfrutar al máximo...",
        author: "Ana Martínez",
        publishDate: "2025-10-08",
        category: "Consejos",
        tags: ["conservación", "tips", "postres"],
        readTime: "4 min",
        featured: false
      }
    ],
    categories: [
      { name: "Recetas", count: 12 },
      { name: "Consejos", count: 8 },
      { name: "Historia", count: 5 },
      { name: "Ingredientes", count: 6 }
    ],
    recentPosts: 3,
    totalPosts: 31
  };
};

// Loader para artículos individuales del blog
export const articuloLoader = async ({ params }) => {
  await simulateNetworkDelay(400);
  
  const { slug } = params;
  
  // Todos los artículos disponibles (originales + loader)
  const allPosts = [
    // Artículos originales del blog
    {
      id: 1,
      slug: "decoracion-frutas-frescas",
      title: "Decoración con Frutas Frescas",
      content: `
        # Decoración con Frutas Frescas
        
        Las frutas frescas son una de las mejores formas de decorar pasteles, aportando color, sabor y una presentación profesional.
        
        ## Selección de frutas
        
        Elige siempre frutas de temporada y en su punto óptimo de maduración. Las fresas, kiwis, arándanos y duraznos son excelentes opciones.
        
        ## Técnicas de corte
        
        - **Fresas**: Corta en abanico o en láminas finas
        - **Kiwi**: Rodajas perfectas de 3-4mm
        - **Arándanos**: Úsalos enteros como puntos de color
        
        ## Conservación
        
        Aplica un glaseado neutro para mantener las frutas frescas y brillantes por más tiempo.
      `,
      author: "Ana Martínez",
      publishDate: "2025-08-27",
      category: "Decoración",
      tags: ["decoración", "frutas", "técnicas"],
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800"
    },
    {
      id: 2,
      slug: "pie-limon-clasico",
      title: "Receta: Pie de Limón Clásico",
      content: `
        # Pie de Limón Clásico
        
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
      `,
      author: "Carlos Rodríguez",
      publishDate: "2025-08-21",
      category: "Receta",
      tags: ["receta", "limón", "postre"],
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800"
    },
    {
      id: 3,
      slug: "historia-queque-marmoleado",
      title: "Historia del Queque Marmoleado",
      content: `
        # Historia del Queque Marmoleado
        
        El queque marmoleado es un clásico de la repostería que tiene sus raíces en Europa, especialmente en Austria y Alemania.
        
        ## Orígenes europeos
        
        Conocido como "Marmorkuchen" en alemán, este tipo de bizcocho se popularizó en el siglo XVIII entre la aristocracia europea.
        
        ## Llegada a Chile
        
        Los inmigrantes alemanes trajeron esta receta a Chile a mediados del siglo XIX, adaptándola con ingredientes locales.
        
        ## La técnica del marmoleado
        
        El secreto está en alternar las masas de vainilla y chocolate, creando ondas naturales sin mezclar completamente.
        
        ## Tradición familiar
        
        En Chile, el queque marmoleado se convirtió en un clásico de las once familiares y celebraciones íntimas.
      `,
      author: "María González",
      publishDate: "2025-08-14",
      category: "Historia",
      tags: ["historia", "tradición", "queque"],
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800"
    },
    {
      id: 4,
      slug: "merengue-perfecto",
      title: "Secretos del Merengue Perfecto",
      content: `
        # Secretos del Merengue Perfecto
        
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
      `,
      author: "Carlos Rodríguez",
      publishDate: "2025-08-10",
      category: "Técnica",
      tags: ["técnica", "merengue", "consejos"],
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=800"
    },
    {
      id: 5,
      slug: "torta-chocolate-humeda",
      title: "Torta de Chocolate Húmeda",
      content: `
        # Torta de Chocolate Húmeda
        
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
      `,
      author: "Ana Martínez",
      publishDate: "2025-08-05",
      category: "Receta",
      tags: ["chocolate", "torta", "receta"],
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800"
    },
    {
      id: 6,
      slug: "buttercream-tecnicas",
      title: "Buttercream: Técnicas de Decoración",
      content: `
        # Buttercream: Técnicas de Decoración
        
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
      `,
      author: "Carlos Rodríguez",
      publishDate: "2025-08-01",
      category: "Decoración",
      tags: ["decoración", "buttercream", "técnicas"],
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800"
    },
    {
      id: 7,
      slug: "cupcakes-fantasmas-halloween",
      title: "Cupcakes de Fantasmas Espeluznantes",
      content: `
        # Cupcakes de Fantasmas Espeluznantes
        
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
      `,
      author: "Ana Martínez",
      publishDate: "2025-10-15",
      category: "Halloween",
      tags: ["halloween", "cupcakes", "fantasmas"],
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1599785209796-786432b228bc?w=800&q=80"
    },
    {
      id: 8,
      slug: "galletas-calabaza-halloween",
      title: "Galletas de Calabaza Especiadas",
      content: `
        # Galletas de Calabaza Especiadas
        
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
      `,
      author: "María González",
      publishDate: "2025-10-14",
      category: "Halloween",
      tags: ["halloween", "galletas", "calabaza"],
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80"
    },
    {
      id: 9,
      slug: "torta-cementerio-halloween",
      title: "Torta Cementerio de Chocolate",
      content: `
        # Torta Cementerio de Chocolate
        
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
      `,
      author: "Carlos Rodríguez",
      publishDate: "2025-10-13",
      category: "Halloween",
      tags: ["halloween", "torta", "chocolate", "cementerio"],
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80"
    },
    // Artículos adicionales del loader
    {
      id: 1001,
      slug: "secretos-torta-chocolate-perfecta",
      title: "Los secretos de la torta de chocolate perfecta",
      content: `
        # Los secretos de la torta de chocolate perfecta
        
        En Mil Sabores hemos perfeccionado nuestra receta de torta de chocolate durante más de 30 años. Aquí te compartimos algunos de nuestros secretos mejor guardados.
        
        ## Ingredientes de calidad
        
        El primer secreto está en utilizar chocolate de alta calidad. Nosotros utilizamos chocolate belga con al menos 70% de cacao para lograr ese sabor intenso y balanceado.
        
        ## La temperatura perfecta
        
        La temperatura del horno debe ser exactamente 160°C. Muchas personas cometen el error de usar temperaturas muy altas, lo que resulta en una torta seca por fuera y cruda por dentro.
        
        ## El tiempo de batido
        
        El batido de la mantequilla con el azúcar debe durar exactamente 5 minutos para incorporar el aire necesario y lograr esa textura esponjosa característica.
        
        ## El toque secreto
        
        Nuestro ingrediente secreto es una cucharadita de café instantáneo que intensifica el sabor del chocolate sin aportar sabor a café.
      `,
      author: "Carlos Rodríguez",
      publishDate: "2025-10-15",
      category: "Recetas",
      tags: ["chocolate", "tortas", "consejos"],
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800"
    },
    {
      id: 1002,
      slug: "historia-pasteleria-chilena",
      title: "La historia de la pastelería chilena",
      content: `
        # La historia de la pastelería chilena
        
        La pastelería en Chile tiene una rica historia que combina tradiciones indígenas, españolas y europeas, creando una identidad única en el mundo de los postres.
        
        ## Los orígenes
        
        Todo comenzó en la época colonial, cuando los españoles trajeron técnicas de repostería europeas que se fusionaron con ingredientes locales como la lúcuma y el membrillo.
      `,
      author: "María González",
      publishDate: "2025-10-10",
      category: "Historia",
      tags: ["historia", "chile", "tradición"],
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800"
    },
    {
      id: 1003,
      slug: "consejos-conservar-postres",
      title: "Consejos para conservar tus postres favoritos",
      content: `
        # Consejos para conservar tus postres favoritos
        
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
      `,
      author: "Ana Martínez",
      publishDate: "2025-10-08",
      category: "Consejos",
      tags: ["conservación", "tips", "postres"],
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800"
    }
  ];
  
  const post = allPosts.find(post => post.slug === slug);
  
  if (!post) {
    throw new Response("Artículo no encontrado", { status: 404 });
  }
  
  return {
    post,
    relatedPosts: allPosts.filter(p => p.slug !== slug).slice(0, 2)
  };
};

// Loader para la página Contacto
export const contactoLoader = async () => {
  await simulateNetworkDelay(200);
  
  return {
    contactInfo: {
      phone: "+56 2 2345 6789",
      email: "contacto@pasteleria.cl",
      address: "Av. Principal 1234, Santiago, Chile",
      hours: {
        weekdays: "Lun - Vie: 9:00 - 20:00",
        weekends: "Sáb - Dom: 10:00 - 18:00"
      }
    },
    socialMedia: [
      { platform: "Instagram", url: "@milsabores", followers: "15.2k" },
      { platform: "Facebook", url: "Mil Sabores Pastelería", followers: "8.5k" },
      { platform: "WhatsApp", url: "+56 9 8765 4321", available: true }
    ],
    branches: [
      { id: 1, name: "Sucursal Centro", address: "Av. Principal 1234", phone: "+56 2 2345 6789" },
      { id: 2, name: "Sucursal Las Condes", address: "Av. Apoquindo 5678", phone: "+56 2 3456 7890" },
      { id: 3, name: "Sucursal Providencia", address: "Av. Providencia 9012", phone: "+56 2 4567 8901" }
    ],
    formConfig: {
      allowedDomains: ['duoc.cl', 'profesor.duoc.cl', 'gmail.com', 'hotmail.com', 'outlook.com'],
      maxMessageLength: 500,
      requiredFields: ['nombre', 'email', 'asunto', 'mensaje']
    }
  };
};