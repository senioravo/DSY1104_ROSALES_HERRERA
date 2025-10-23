import React from 'react';
import { useParams } from 'react-router-dom';
import ArticleHeader from '../../components/root/BlogComponents/ArticleHeader';
import ArticleImage from '../../components/root/BlogComponents/ArticleImage';
import BackButton from '../../components/root/BlogComponents/BackButton';
import './articulo.css';

// Base de datos completa de artículos (la misma que en index.jsx)
const articulosCompletos = {
  'test-articulo': {
    categoria: 'Prueba',
    titulo: 'Artículo de Prueba',
    descripcion: 'Este es un artículo de prueba para verificar que funciona.',
    imagen: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200',
    fecha: '23-10-2025',
    contenido: '<h2>Este es un artículo de prueba</h2><p>Si puedes ver este contenido, significa que la navegación está funcionando correctamente.</p>'
  },
  'decoracion-frutas-frescas': {
    categoria: 'Decoración',
    titulo: 'Decoración con Frutas Frescas',
    descripcion: 'Ideas y consejos para decorar tus pasteles usando frutas de temporada y lograr un acabado profesional.',
    imagen: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200',
    fecha: '27-08-2025',
    contenido: '<p>Las frutas frescas son una de las formas más elegantes y naturales de decorar una torta. Su color vibrante y sabor auténtico complementan perfectamente cualquier pastel.</p><h3>Frutas Ideales para Decorar</h3><ul><li><strong>Fresas:</strong> Perfectas para crear patrones y diseños elegantes</li><li><strong>Arándanos:</strong> Excelentes para dar color y textura</li><li><strong>Kiwi:</strong> Su patrón interno crea diseños únicos</li><li><strong>Frambuesas:</strong> Ideales para decoraciones delicadas</li></ul><h3>Técnicas de Preparación</h3><p>Para obtener mejores resultados, lava bien todas las frutas y sécalas completamente antes de usar. Esto evitará que la humedad afecte la decoración de tu torta.</p><h3>Consejos Profesionales</h3><p>Aplica las frutas justo antes de servir para mantener su frescura y color vibrante. Si necesitas prepararlas con anticipación, guárdalas en refrigeración.</p>'
  },
  'pie-limon-clasico': {
    categoria: 'Receta',
    titulo: 'Receta: Pie de Limón Clásico',
    descripcion: 'El paso a paso definitivo para un pie de limón con merengue firme y base crocante.',
    imagen: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=1200',
    fecha: '21-08-2025',
    contenido: '<h2>El Pie de Limón Perfecto</h2><p>Este clásico postre combina la acidez refrescante del limón con la dulzura del merengue sobre una base crocante irresistible.</p><h3>Ingredientes para la Base</h3><ul><li>200g de galletas de vainilla</li><li>100g de mantequilla derretida</li><li>2 cucharadas de azúcar</li></ul><h3>Para el Relleno de Limón</h3><ul><li>4 huevos (separar yemas y claras)</li><li>1 taza de azúcar</li><li>1/2 taza de jugo de limón fresco</li><li>2 cucharadas de maicena</li><li>1 cucharada de ralladura de limón</li></ul><h3>Para el Merengue</h3><ul><li>4 claras de huevo</li><li>1/2 taza de azúcar</li><li>1/4 cucharadita de cremor tártaro</li></ul><h3>Preparación</h3><ol><li>Tritura las galletas y mézclelas con mantequilla derretida</li><li>Presiona la mezcla en el molde y hornea 10 minutos a 180°C</li><li>Para el relleno, cocina todos los ingredientes a fuego medio hasta espesar</li><li>Vierte sobre la base y refrigera 2 horas</li><li>Bate las claras con cremor tártaro, añade azúcar gradualmente</li><li>Cubre el pie con merengue y dora en el horno 5 minutos</li></ol>'
  },
  'historia-queque-marmoleado': {
    categoria: 'Historia',
    titulo: 'Historia del Queque Marmoleado',
    descripcion: 'Descubre el origen y curiosidades de este clásico de la pastelería casera.',
    imagen: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=1200',
    fecha: '14-08-2025',
    contenido: '<h2>El Origen del Queque Marmoleado</h2><p>El queque marmoleado, conocido como "Marmorkuchen" en alemán, tiene sus orígenes en la pastelería alemana del siglo XIX.</p><h3>Una Técnica Revolucionaria</h3><p>La técnica del marmoleado surgió como una forma creativa de combinar dos sabores diferentes en una sola preparación, creando patrones únicos e irrepetibles en cada corte.</p><h3>Llegada a América</h3><p>Los inmigrantes alemanes trajeron esta receta al continente americano, donde se adaptó a los ingredientes locales y se convirtió en un clásico de la repostería casera.</p><h3>La Ciencia del Marmoleado</h3><p>El secreto está en la densidad diferente de las masas y en la técnica de plegado, que debe ser suave pero decidida para crear los característicos remolinos sin mezclar completamente los sabores.</p><h3>Variaciones Modernas</h3><p>Hoy en día encontramos versiones con chocolate y vainilla, limón y amapola, o incluso combinaciones más audaces como matcha y chocolate blanco.</p>'
  },
  'merengue-perfecto': {
    categoria: 'Técnica',
    titulo: 'Secretos del Merengue Perfecto',
    descripcion: 'Aprende los trucos profesionales para lograr un merengue estable y brillante.',
    imagen: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=1200',
    fecha: '10-08-2025',
    contenido: '<h2>El Arte del Merengue</h2><p>El merengue es una de las preparaciones más técnicas de la pastelería, pero con los conocimientos correctos, cualquiera puede dominarlo.</p><h3>Tipos de Merengue</h3><ul><li><strong>Merengue Francés:</strong> El más simple, claras crudas batidas con azúcar</li><li><strong>Merengue Italiano:</strong> Claras batidas con almíbar caliente</li><li><strong>Merengue Suizo:</strong> Claras y azúcar calentados antes del batido</li></ul><h3>Reglas de Oro</h3><ol><li>Usa claras a temperatura ambiente</li><li>Asegúrate de que no haya rastro de yema en las claras</li><li>El bowl y las varillas deben estar completamente limpios</li><li>Añade el azúcar gradualmente</li><li>No batas en exceso una vez logrado el punto</li></ol><h3>Problemass Comunes y Soluciones</h3><p><strong>Merengue que no sube:</strong> Verifica que no haya grasa en el equipo</p><p><strong>Merengue que se baja:</strong> Probablemente se batió demasiado</p><p><strong>Merengue granuloso:</strong> El azúcar no se disolvió completamente</p>'
  },
  'torta-chocolate-humeda': {
    categoria: 'Receta',
    titulo: 'Torta de Chocolate Húmeda',
    descripcion: 'La receta definitiva para una torta de chocolate que se derrite en la boca.',
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200',
    fecha: '05-08-2025',
    contenido: '<h2>La Torta de Chocolate Definitiva</h2><p>Esta receta produce una torta increíblemente húmeda y rica en sabor a chocolate, perfecta para cualquier celebración.</p><h3>Ingredientes</h3><ul><li>2 tazas de harina de trigo</li><li>2 tazas de azúcar</li><li>3/4 taza de cacao en polvo</li><li>2 cucharaditas de bicarbonato</li><li>1 cucharadita de sal</li><li>2 huevos</li><li>1 taza de buttermilk</li><li>1 taza de café caliente</li><li>1/2 taza de aceite</li><li>1 cucharadita de vainilla</li></ul><h3>El Secreto: El Café</h3><p>El café caliente es el ingrediente secreto que intensifica el sabor del chocolate sin aportar sabor a café al resultado final.</p><h3>Preparación</h3><ol><li>Precalienta el horno a 180°C</li><li>Mezcla todos los ingredientes secos</li><li>Combina los líquidos en otro bowl</li><li>Une ambas mezclas suavemente</li><li>Añade el café caliente al final</li><li>Hornea 35-40 minutos</li></ol><h3>Consejos de Éxito</h3><p>No sobre mezcles la masa y verifica la cocción con un palillo. La torta está lista cuando el palillo sale con pocas migas húmedas.</p>'
  },
  'buttercream-tecnicas': {
    categoria: 'Decoración',
    titulo: 'Buttercream: Técnicas de Decoración',
    descripcion: 'Domina las técnicas básicas y avanzadas de decoración con buttercream.',
    imagen: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1200',
    fecha: '01-08-2025',
    contenido: '<h2>Dominando el Buttercream</h2><p>El buttercream es la base de la decoración profesional. Con las técnicas correctas, puedes crear decoraciones espectaculares.</p><h3>Tipos de Buttercream</h3><ul><li><strong>Buttercream Americano:</strong> Simple y dulce, ideal para principiantes</li><li><strong>Buttercream Suizo:</strong> Más suave y menos dulce</li><li><strong>Buttercream Francés:</strong> Rico y cremoso, para ocasiones especiales</li></ul><h3>Técnicas Básicas</h3><h4>Alisado de Superficies</h4><p>Usa una espátula offset para crear superficies lisas. Trabaja con movimientos amplios y constantes.</p><h4>Bordes y Rosetas</h4><p>Con boquillas estrella puedes crear bordes decorativos y rosetas clásicas. La presión constante es clave.</p><h4>Escritura</h4><p>Usa boquillas redondas pequeñas y practica movimientos fluidos para letras legibles.</p><h3>Técnicas Avanzadas</h3><p>Las flores de buttercream requieren práctica pero crean efectos impresionantes. Comienza con rosas simples y avanza hacia flores más complejas.</p><h3>Almacenamiento</h3><p>El buttercream bien preparado se mantiene 3 días a temperatura ambiente o 1 semana refrigerado.</p>'
  },
  'cupcakes-fantasmas-halloween': {
    categoria: 'Halloween',
    titulo: 'Cupcakes de Fantasmas Espeluznantes',
    descripcion: 'Deliciosos cupcakes de vainilla decorados como adorables fantasmitas para Halloween.',
    imagen: 'https://images.unsplash.com/photo-1599785209796-786432b228bc?w=1200',
    fecha: '15-10-2025',
    contenido: '<h2>Cupcakes Fantasma para Halloween</h2><p>Estos adorables cupcakes son perfectos para celebrar Halloween con un toque dulce y divertido.</p><h3>Para los Cupcakes</h3><ul><li>2 tazas de harina</li><li>1 1/2 tazas de azúcar</li><li>1/2 taza de mantequilla</li><li>2 huevos</li><li>1 taza de leche</li><li>2 cucharaditas de vainilla</li><li>2 cucharaditas de polvo de hornear</li></ul><h3>Para la Decoración</h3><ul><li>Buttercream blanco</li><li>Chispas de chocolate negro (para los ojos)</li><li>Boquilla redonda grande</li></ul><h3>Preparación de los Cupcakes</h3><ol><li>Bate mantequilla con azúcar hasta cremar</li><li>Añade huevos y vainilla</li><li>Alterna harina y leche</li><li>Hornea a 180°C por 18-20 minutos</li></ol><h3>Decoración de Fantasmas</h3><ol><li>Enfría completamente los cupcakes</li><li>Aplica buttercream blanco con movimientos ondulantes</li><li>Crea la forma de fantasma con picos irregulares</li><li>Añade chispas de chocolate para los ojos</li></ol><h3>Consejo Pro</h3><p>Para fantasmas más realistas, usa una boquilla de estrella cerrada y haz movimientos ascendentes irregulares.</p>'
  },
  'galletas-calabaza-halloween': {
    categoria: 'Halloween',
    titulo: 'Galletas de Calabaza Especiadas',
    descripcion: 'Galletas suaves con especias de otoño y glaseado naranja perfectas para Halloween.',
    imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200',
    fecha: '14-10-2025',
    contenido: '<h2>Galletas de Calabaza para Halloween</h2><p>Halloween es la época perfecta para experimentar con sabores otoñales. Estas galletas de calabaza combinan la tradición de la festividad con el sabor reconfortante de las especias.</p><h3>Ingredientes</h3><ul><li>2 tazas de harina de trigo</li><li>1 taza de puré de calabaza</li><li>1/2 taza de mantequilla ablandada</li><li>1 taza de azúcar morena</li><li>1 huevo grande</li><li>1 cucharadita de canela</li><li>1/2 cucharadita de nuez moscada</li><li>1/4 cucharadita de clavo de olor</li><li>1 cucharadita de vainilla</li><li>1/2 cucharadita de sal</li></ul><h3>Para el Glaseado</h3><ul><li>2 tazas de azúcar pulverizada</li><li>3-4 cucharadas de leche</li><li>Colorante naranja</li><li>1/2 cucharadita de vainilla</li></ul><h3>Preparación</h3><ol><li>Precalienta el horno a 180°C y prepara bandejas con papel mantequilla</li><li>Bate mantequilla con azúcar morena hasta cremar</li><li>Añade huevo, puré de calabaza y vainilla</li><li>En otro bowl, mezcla harina, especias y sal</li><li>Combina ambas mezclas hasta obtener una masa homogénea</li><li>Forma bolitas y aplana ligeramente en la bandeja</li><li>Hornea por 12-15 minutos hasta que estén firmes</li><li>Enfría completamente antes de glasear</li></ol><h3>Glaseado</h3><p>Mezcla azúcar pulverizada con leche, vainilla y colorante naranja hasta obtener consistencia líquida. Sumerge las galletas frías o aplica con pincel.</p>'
  },
  'torta-cementerio-halloween': {
    categoria: 'Halloween',
    titulo: 'Torta Cementerio de Chocolate',
    descripcion: 'Una espeluznante torta de chocolate decorada como un cementerio terrorífico.',
    imagen: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1200',
    fecha: '13-10-2025',
    contenido: '<h2>Torta Cementerio Espeluznante</h2><p>Esta impresionante torta de Halloween simula un cementerio completo con lápidas, tierra y efectos terroríficos.</p><h3>Base: Torta de Chocolate</h3><p>Utiliza tu receta favorita de torta de chocolate húmeda como base. Necesitarás una torta rectangular grande.</p><h3>Materiales para Decoración</h3><ul><li>Buttercream de chocolate (para simular tierra)</li><li>Galletas rectangulares (lápidas)</li><li>Chocolate rallado o migajas de galleta</li><li>Glasé negro para escribir</li><li>Gusanos de goma</li><li>Figuritas de esqueletos o zombies</li><li>Cerca pequeña de plástico (opcional)</li></ul><h3>Montaje del Cementerio</h3><ol><li>Cubre toda la torta con buttercream de chocolate oscuro</li><li>Esparce chocolate rallado sobre la superficie para simular tierra</li><li>Inserta galletas rectangulares como lápidas</li><li>Escribe epitafios divertidos con glasé negro</li><li>Añade gusanos de goma saliendo de la "tierra"</li><li>Coloca figuritas de decoración</li><li>Crea senderos con migajas más claras</li></ol><h3>Epitafios Divertidos</h3><ul><li>"Aquí yace mi dieta"</li><li>"RIP - Comió demasiados dulces"</li><li>"Murió de amor por el chocolate"</li></ul><h3>Consejo Final</h3><p>Arma la decoración el mismo día para mantener las galletas crujientes y los detalles nítidos.</p>'
  }
};

export default function Articulo() {
  const { slug } = useParams();
  
  console.log('🔍 ARTICULO DEBUG: Slug recibido:', slug);
  console.log('🔍 ARTICULO DEBUG: Artículos disponibles:', Object.keys(articulosCompletos));
  
  // Si no hay slug, mostrar error
  if (!slug) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4>Error: Slug no encontrado</h4>
          <p>No se pudo determinar qué artículo mostrar.</p>
        </div>
        <BackButton />
      </div>
    );
  }

  // Buscar el artículo en la base de datos local
  const articulo = articulosCompletos[slug];
  
  console.log('🔍 ARTICULO DEBUG: Artículo encontrado:', articulo ? 'SÍ' : 'NO');
  
  // Si no existe el artículo, mostrar error más específico
  if (!articulo) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          <h4>Artículo no encontrado</h4>
          <p>El artículo con slug "<strong>{slug}</strong>" no existe.</p>
          <p>Artículos disponibles: {Object.keys(articulosCompletos).join(', ')}</p>
        </div>
        <BackButton />
      </div>
    );
  }

  console.log('✅ ARTICULO DEBUG: Mostrando artículo:', articulo.titulo);

  return (
    <div className="articulo-page">
      <div className="container">
        <BackButton />
        
        <article className="articulo-content">
          <ArticleHeader 
            categoria={articulo.categoria}
            titulo={articulo.titulo}
            fecha={articulo.fecha}
          />
          
          <ArticleImage 
            src={articulo.imagen}
            alt={articulo.titulo}
          />
          
          <div 
            className="articulo-body mt-4"
            dangerouslySetInnerHTML={{ __html: articulo.contenido }}
          />
        </article>
      </div>
    </div>
  );
}