import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ArticleHeader, ArticleImage, BackButton } from '../../components/root/BlogComponents';
import { useArticuloData } from '../../hooks/useLoaderData';
import './articulo.css';

// Base de datos completa de artículos (la misma que en index.jsx)
const articulosCompletos = {
  'decoracion-frutas-frescas': {
    categoria: 'Decoración',
    titulo: 'Decoración con Frutas Frescas',
    descripcion: 'Ideas y consejos para decorar tus pasteles usando frutas de temporada y lograr un acabado profesional.',
    imagen: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200',
    fecha: '27-08-2025',
    contenido: `
      <h2>La decoración con frutas frescas es una de las formas más elegantes y naturales de embellecer tus pasteles</h2>
      
      <p>Las frutas frescas no solo añaden color y textura a tus creaciones, sino que también aportan sabor y frescura. En este artículo, te compartiremos los mejores consejos para lograr decoraciones profesionales.</p>

      <h3>Selección de Frutas</h3>
      <p>Es fundamental elegir frutas de temporada en su punto óptimo de maduración:</p>
      <ul>
        <li><strong>Fresas:</strong> Perfectas para cualquier época, elige las más rojas y firmes</li>
        <li><strong>Arándanos y frambuesas:</strong> Ideales para añadir pequeños detalles de color</li>
        <li><strong>Kiwi:</strong> Aporta un verde vibrante y textura interesante</li>
        <li><strong>Mango y durazno:</strong> Excelentes para decoraciones en verano</li>
      </ul>

      <h3>Preparación de las Frutas</h3>
      <p>Antes de colocar las frutas sobre tu pastel:</p>
      <ol>
        <li>Lava bien todas las frutas con agua fría</li>
        <li>Seca completamente con papel absorbente</li>
        <li>Corta en el momento de decorar para evitar oxidación</li>
        <li>Aplica un brillo con gelatina neutra para mayor durabilidad</li>
      </ol>

      <h3>Técnicas de Colocación</h3>
      <p>Para un acabado profesional, considera estos tips:</p>
      <ul>
        <li>Crea patrones geométricos o diseños libres</li>
        <li>Combina frutas de diferentes colores para mayor impacto visual</li>
        <li>Deja espacios negativos, no sobrecargues el pastel</li>
        <li>Usa crema batida o buttercream como base para fijar las frutas</li>
      </ul>

      <h3>Conservación</h3>
      <p>Los pasteles decorados con frutas frescas deben consumirse dentro de 24-48 horas y mantenerse refrigerados. Para eventos especiales, decora justo antes de servir.</p>

      <blockquote>
        "La belleza de las frutas frescas radica en su naturalidad. No necesitas complicarte, deja que los colores hablen por sí mismos."
      </blockquote>
    `
  },
  'pie-limon-clasico': {
    categoria: 'Receta',
    titulo: 'Receta: Pie de Limón Clásico',
    descripcion: 'El paso a paso definitivo para un pie de limón con merengue firme y base crocante.',
    imagen: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=1200',
    fecha: '21-08-2025',
    contenido: `
      <h2>El paso a paso definitivo para un pie de limón con merengue firme y base crocante</h2>

      <h3>Ingredientes para la Base</h3>
      <ul>
        <li>300g de harina de trigo</li>
        <li>200g de azúcar</li>
        <li>150g de mantequilla</li>
        <li>4 huevos</li>
        <li>1 cucharadita de polvo de hornear</li>
        <li>1 cucharadita de extracto de vainilla</li>
        <li>100ml de leche</li>
      </ul>

      <h3>Para el Relleno de Limón</h3>
      <ul>
        <li>Jugo de 6 limones grandes</li>
        <li>Ralladura de 3 limones</li>
        <li>4 yemas de huevo</li>
        <li>200g de azúcar</li>
        <li>100g de mantequilla</li>
        <li>3 cucharadas de maicena</li>
      </ul>

      <h3>Para el Merengue</h3>
      <ul>
        <li>4 claras de huevo</li>
        <li>200g de azúcar</li>
        <li>1/4 cucharadita de cremor tártaro</li>
      </ul>

      <h3>Preparación de la Base</h3>
      <ol>
        <li>Precalienta el horno a 180°C</li>
        <li>Mezcla la harina tamizada con el polvo de hornear</li>
        <li>En un molde para pie, extiende la masa y hornea 15 minutos hasta que esté dorada</li>
        <li>Deja enfriar completamente</li>
      </ol>

      <h3>Preparación del Relleno</h3>
      <ol>
        <li>En una olla, mezcla el jugo de limón, ralladura, azúcar y maicena</li>
        <li>Cocina a fuego medio removiendo constantemente</li>
        <li>Cuando espese, retira del fuego y añade las yemas batidas</li>
        <li>Vuelve a cocinar 2 minutos más</li>
        <li>Incorpora la mantequilla y mezcla bien</li>
        <li>Vierte sobre la base fría</li>
      </ol>

      <h3>Preparación del Merengue</h3>
      <ol>
        <li>Bate las claras con el cremor tártaro hasta punto de nieve</li>
        <li>Añade el azúcar gradualmente mientras sigues batiendo</li>
        <li>Continúa batiendo hasta obtener picos firmes y brillantes</li>
        <li>Coloca el merengue sobre el relleno de limón</li>
        <li>Hornea a 180°C por 10-15 minutos hasta que el merengue esté dorado</li>
      </ol>

      <blockquote>
        "El secreto de un buen pie de limón está en el balance perfecto entre la acidez del limón y la dulzura del merengue."
      </blockquote>

      <h3>Consejos Profesionales</h3>
      <p><strong>Para un merengue perfecto:</strong> Asegúrate de que no haya rastro de yema en las claras, ya que la grasa impide que monten bien.</p>
      <p><strong>Base crocante:</strong> Hornea la base antes de añadir el relleno para evitar que se humedezca.</p>
      <p><strong>Conservación:</strong> Este pie se mantiene bien refrigerado hasta 3 días.</p>
    `
  },
  'historia-queque-marmoleado': {
    categoria: 'Historia',
    titulo: 'Historia del Queque Marmoleado',
    descripcion: 'Descubre el origen y curiosidades de este clásico de la pastelería casera.',
    imagen: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=1200',
    fecha: '14-08-2025',
    contenido: `
      <h2>Historia y Orígenes</h2>
      
      <p>El queque marmoleado tiene sus orígenes en la pastelería alemana del siglo XIX, donde se le conocía como "Marmorkuchen". Esta receta tradicional nació de la creatividad de los reposteros alemanes que buscaban combinar dos sabores en una sola preparación de manera artística.</p>

      <h3>La Llegada a América</h3>
      <p>Durante las grandes migraciones europeas del siglo XIX y principios del XX, esta receta viajó a América con las familias alemanas. Se adaptó a los ingredientes locales y se convirtió en un clásico de la repostería casera en muchos países latinoamericanos.</p>

      <h3>Técnica del Marmoleado</h3>
      <p>El secreto del patrón marmoleado está en la técnica:</p>
      <ul>
        <li>Se prepara una masa base que se divide en dos partes</li>
        <li>Una parte se mezcla con cacao o chocolate derretido</li>
        <li>Las dos masas se colocan alternadamente en el molde</li>
        <li>Con un palillo o cuchillo se hacen movimientos en forma de zigzag</li>
        <li>El resultado es un hermoso patrón que se revela al cortar</li>
      </ul>

      <h3>Variaciones Modernas</h3>
      <p>Hoy en día, el concepto del marmoleado se ha expandido más allá del chocolate y vainilla:</p>
      <ul>
        <li><strong>Marmoleado de frutas:</strong> Usando purés de fresas, arándanos o maracuyá</li>
        <li><strong>Matcha y vainilla:</strong> Una versión japonesa moderna</li>
        <li><strong>Café y caramelo:</strong> Para los amantes del café</li>
        <li><strong>Red velvet marmoleado:</strong> Con masa roja y blanca</li>
      </ul>

      <h3>Simbolismo Cultural</h3>
      <p>En muchas culturas, el queque marmoleado representa la unión de lo diferente en armonía perfecta. Es común servirlo en reuniones familiares y celebraciones, simbolizando la diversidad y la unión.</p>

      <blockquote>
        "El marmoleado no es solo una técnica, es un arte que representa la belleza de combinar diferentes elementos en perfecta armonía."
      </blockquote>

      <h3>Curiosidades</h3>
      <ul>
        <li>En Alemania, es tradicional servirlo en el "Kaffeeklatsch" (reunión del café)</li>
        <li>Cada corte revela un patrón único, no hay dos rebanadas iguales</li>
        <li>Es uno de los primeros pasteles que muchos niños aprenden a hornear</li>
        <li>En algunos países se le conoce como "queque jaspeado" o "torta mármol"</li>
      </ul>
    `
  },
  'merengue-perfecto': {
    categoria: 'Técnica',
    titulo: 'Secretos del Merengue Perfecto',
    descripcion: 'Aprende los trucos profesionales para lograr un merengue estable y brillante.',
    imagen: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=1200',
    fecha: '10-08-2025',
    contenido: `
      <h2>El Arte del Merengue Perfecto</h2>
      
      <p>El merengue es una de las preparaciones básicas más importantes en pastelería. Dominar esta técnica abre las puertas a infinitas creaciones: desde decoraciones hasta postres completos.</p>

      <h3>Tipos de Merengue</h3>
      
      <h4>1. Merengue Francés</h4>
      <p>El más básico y ligero. Se prepara batiendo claras con azúcar sin cocción.</p>
      <ul>
        <li>Ideal para: Decoraciones, suspiros, macarons</li>
        <li>Textura: Ligera y crujiente al hornear</li>
        <li>Estabilidad: Baja, debe usarse inmediatamente</li>
      </ul>

      <h4>2. Merengue Italiano</h4>
      <p>Se prepara con almíbar caliente, resultando más estable.</p>
      <ul>
        <li>Ideal para: Buttercream, mousses, decoración con soplete</li>
        <li>Textura: Sedosa y brillante</li>
        <li>Estabilidad: Alta, dura varios días refrigerado</li>
      </ul>

      <h4>3. Merengue Suizo</h4>
      <p>Se calienta al baño maría antes de batir.</p>
      <ul>
        <li>Ideal para: Coberturas de pies, decoraciones horneadas</li>
        <li>Textura: Cremosa y densa</li>
        <li>Estabilidad: Media-alta</li>
      </ul>

      <h3>Reglas de Oro del Merengue</h3>
      
      <ol>
        <li><strong>Limpieza absoluta:</strong> Cualquier rastro de grasa arruinará tu merengue. Asegúrate de que el bowl y las varillas estén impecables.</li>
        
        <li><strong>Claras a temperatura ambiente:</strong> Las claras frías no montan bien. Sácalas del refrigerador 30 minutos antes.</li>
        
        <li><strong>Sin yemas:</strong> Ni una gota de yema debe contaminar las claras.</li>
        
        <li><strong>Azúcar gradual:</strong> Añade el azúcar poco a poco cuando las claras estén espumosas.</li>
        
        <li><strong>Punto exacto:</strong> El merengue está listo cuando forma picos firmes que no se caen al voltear el bowl.</li>
      </ol>

      <h3>Solución a Problemas Comunes</h3>
      
      <h4>¿Tu merengue no monta?</h4>
      <ul>
        <li>Verifica que no haya grasa en los utensilios</li>
        <li>Las claras podrían estar demasiado frías</li>
        <li>Añade una pizca de cremor tártaro o unas gotas de limón</li>
      </ul>

      <h4>¿El merengue llora (suelta líquido)?</h4>
      <ul>
        <li>El azúcar no se disolvió completamente</li>
        <li>Se horneó a temperatura muy alta</li>
        <li>Hay demasiada humedad en el ambiente</li>
      </ul>

      <h4>¿El merengue se desinfla?</h4>
      <ul>
        <li>No se batió lo suficiente</li>
        <li>Se mezcló muy bruscamente con otros ingredientes</li>
        <li>Se dejó reposar mucho tiempo antes de usar</li>
      </ul>

      <h3>Receta Básica - Merengue Francés</h3>
      <h4>Ingredientes:</h4>
      <ul>
        <li>4 claras de huevo (120g)</li>
        <li>240g de azúcar (proporción 2:1)</li>
        <li>1/4 cucharadita de cremor tártaro (opcional)</li>
        <li>1 cucharadita de extracto de vainilla</li>
      </ul>

      <h4>Procedimiento:</h4>
      <ol>
        <li>Bate las claras con el cremor tártaro a velocidad media hasta que estén espumosas</li>
        <li>Aumenta a velocidad alta y añade el azúcar gradualmente (1 cucharada cada 30 segundos)</li>
        <li>Continúa batiendo hasta picos firmes y brillantes (8-10 minutos)</li>
        <li>Añade la vainilla al final</li>
        <li>Usa inmediatamente</li>
      </ol>

      <blockquote>
        "La paciencia es la clave del merengue perfecto. No tengas prisa, deja que las claras alcancen su máximo volumen."
      </blockquote>

      <h3>Consejos Profesionales</h3>
      <p><strong>Test del azúcar:</strong> Frota un poco de merengue entre tus dedos. Si sientes cristales, continúa batiendo hasta que esté completamente liso.</p>
      
      <p><strong>Horneado bajo y lento:</strong> Para suspiros, hornea a 100°C por 1-2 horas. Deben secarse, no dorarse.</p>
      
      <p><strong>Conservación:</strong> Los suspiros de merengue se guardan en recipiente hermético hasta 2 semanas.</p>
    `
  },
  'torta-chocolate-humeda': {
    categoria: 'Receta',
    titulo: 'Torta de Chocolate Húmeda',
    descripcion: 'La receta definitiva para una torta de chocolate que se derrite en la boca.',
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200',
    fecha: '05-08-2025',
    contenido: `
      <h2>La receta definitiva para una torta de chocolate que se derrite en la boca</h2>
      
      <p>Esta torta de chocolate es increíblemente húmeda, con un sabor intenso a chocolate y una textura perfecta. El secreto está en la combinación de ingredientes y la técnica de preparación.</p>

      <h3>Ingredientes</h3>
      
      <h4>Para el Bizcocho:</h4>
      <ul>
        <li>250g de harina de trigo</li>
        <li>400g de azúcar</li>
        <li>90g de cacao en polvo sin azúcar</li>
        <li>2 cucharaditas de bicarbonato de sodio</li>
        <li>1 cucharadita de polvo de hornear</li>
        <li>1 cucharadita de sal</li>
        <li>2 huevos grandes</li>
        <li>250ml de café negro fuerte (puede ser instantáneo)</li>
        <li>250ml de buttermilk (leche agria)</li>
        <li>125ml de aceite vegetal</li>
        <li>2 cucharaditas de extracto de vainilla</li>
      </ul>

      <h4>Para el Ganache:</h4>
      <ul>
        <li>400g de chocolate oscuro (70% cacao)</li>
        <li>400ml de crema de leche</li>
        <li>2 cucharadas de mantequilla</li>
      </ul>

      <h3>Preparación del Bizcocho</h3>
      
      <ol>
        <li><strong>Precalienta</strong> el horno a 175°C. Engrasa y enharina dos moldes redondos de 23cm.</li>
        
        <li><strong>Mezcla los secos:</strong> En un bowl grande, tamiza la harina, azúcar, cacao, bicarbonato, polvo de hornear y sal. Mezcla bien.</li>
        
        <li><strong>Mezcla los húmedos:</strong> En otro bowl, bate los huevos. Añade el café, buttermilk, aceite y vainilla. Mezcla hasta integrar.</li>
        
        <li><strong>Combina:</strong> Vierte los ingredientes húmedos sobre los secos. Mezcla con movimientos envolventes hasta que esté apenas combinado. La masa será muy líquida, ¡esto es correcto!</li>
        
        <li><strong>Hornea:</strong> Divide la masa entre los dos moldes. Hornea 30-35 minutos o hasta que un palillo salga limpio.</li>
        
        <li><strong>Enfría:</strong> Deja reposar en los moldes 10 minutos, luego desmolda y enfría completamente sobre rejillas.</li>
      </ol>

      <h3>Preparación del Ganache</h3>
      
      <ol>
        <li>Pica el chocolate finamente y colócalo en un bowl.</li>
        <li>Calienta la crema hasta que esté a punto de hervir.</li>
        <li>Vierte la crema caliente sobre el chocolate y deja reposar 2 minutos.</li>
        <li>Mezcla desde el centro hacia afuera hasta obtener una mezcla lisa y brillante.</li>
        <li>Añade la mantequilla y mezcla hasta integrar.</li>
        <li>Deja enfriar hasta que alcance consistencia untable (30-60 minutos).</li>
      </ol>

      <h3>Montaje</h3>
      
      <ol>
        <li>Nivela las capas de bizcocho si es necesario.</li>
        <li>Coloca la primera capa en un plato o base para pastel.</li>
        <li>Unta una capa generosa de ganache.</li>
        <li>Coloca la segunda capa encima.</li>
        <li>Cubre toda la torta con el ganache restante.</li>
        <li>Decora con virutas de chocolate, fresas o al gusto.</li>
      </ol>

      <h3>Secretos de Esta Receta</h3>
      
      <p><strong>El café intensifica el sabor:</strong> No te preocupes, no sabrá a café. El café realza el sabor del chocolate haciéndolo más profundo y rico.</p>
      
      <p><strong>Buttermilk = humedad:</strong> El buttermilk reacciona con el bicarbonato creando una miga esponjosa y húmeda. Si no tienes, mezcla 250ml de leche con 1 cucharada de vinagre o jugo de limón y deja reposar 5 minutos.</p>
      
      <p><strong>Masa líquida es correcta:</strong> Esta masa es mucho más líquida que otras tortas. No te alarmes, es así como debe ser.</p>

      <blockquote>
        "Una buena torta de chocolate debe ser tan húmeda que casi se deshaga en tu boca, con un sabor a chocolate tan intenso que te haga cerrar los ojos de placer."
      </blockquote>

      <h3>Variaciones</h3>
      
      <ul>
        <li><strong>Relleno de frambuesa:</strong> Añade mermelada de frambuesa entre las capas</li>
        <li><strong>Torta triple:</strong> Usa tres capas más delgadas para una presentación más elegante</li>
        <li><strong>Cupcakes:</strong> Esta misma receta sirve para 24 cupcakes (hornear 18-20 minutos)</li>
        <li><strong>Sin gluten:</strong> Sustituye la harina por una mezcla sin gluten 1:1</li>
      </ul>

      <h3>Conservación</h3>
      <p>Esta torta se mantiene perfecta:</p>
      <ul>
        <li><strong>A temperatura ambiente:</strong> 2-3 días en recipiente hermético</li>
        <li><strong>Refrigerada:</strong> Hasta 1 semana (sacar 30 min antes de servir)</li>
        <li><strong>Congelada:</strong> Hasta 3 meses (sin ganache)</li>
      </ul>
    `
  },
  'buttercream-tecnicas': {
    categoria: 'Decoración',
    titulo: 'Buttercream: Técnicas de Decoración',
    descripcion: 'Domina las técnicas básicas y avanzadas de decoración con buttercream.',
    imagen: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1200',
    fecha: '01-08-2025',
    contenido: `
      <h2>Domina las técnicas básicas y avanzadas de decoración con buttercream</h2>
      
      <p>El buttercream es el aliado perfecto para decorar pasteles. Es versátil, delicioso y permite crear diseños desde los más simples hasta los más elaborados.</p>

      <h3>Tipos de Buttercream</h3>
      
      <h4>1. Buttercream Americano</h4>
      <p>El más simple y dulce.</p>
      <ul>
        <li><strong>Ingredientes:</strong> Mantequilla, azúcar glass, extracto de vainilla</li>
        <li><strong>Ventajas:</strong> Fácil y rápido, mantiene bien las formas</li>
        <li><strong>Desventajas:</strong> Muy dulce, puede resultar pesado</li>
        <li><strong>Mejor para:</strong> Decoraciones con manga, rosas, borders</li>
      </ul>

      <h4>2. Buttercream Suizo</h4>
      <p>Más sedoso y menos dulce.</p>
      <ul>
        <li><strong>Ingredientes:</strong> Claras, azúcar, mantequilla</li>
        <li><strong>Ventajas:</strong> Textura sedosa, menos dulce</li>
        <li><strong>Desventajas:</strong> Más laborioso, sensible al calor</li>
        <li><strong>Mejor para:</strong> Coberturas lisas, degradados</li>
      </ul>

      <h4>3. Buttercream Italiano</h4>
      <p>El más estable y profesional.</p>
      <ul>
        <li><strong>Ingredientes:</strong> Claras, almíbar, mantequilla</li>
        <li><strong>Ventajas:</strong> Muy estable, textura perfecta</li>
        <li><strong>Desventajas:</strong> Requiere termómetro</li>
        <li><strong>Mejor para:</strong> Decoraciones elaboradas, eventos</li>
      </ul>

      <h3>Receta Base - Buttercream Suizo</h3>
      
      <h4>Ingredientes:</h4>
      <ul>
        <li>5 claras de huevo (150g)</li>
        <li>300g de azúcar</li>
        <li>450g de mantequilla sin sal a temperatura ambiente</li>
        <li>2 cucharaditas de extracto de vainilla</li>
        <li>Pizca de sal</li>
      </ul>

      <h4>Preparación:</h4>
      <ol>
        <li>En un bowl metálico, mezcla claras y azúcar</li>
        <li>Coloca al baño maría y bate constantemente hasta que el azúcar se disuelva completamente (60°C)</li>
        <li>Retira del fuego y bate a velocidad alta hasta que el merengue esté frío (10-15 min)</li>
        <li>Añade la mantequilla poco a poco, continuando el batido</li>
        <li>Agrega vainilla y sal</li>
        <li>Bate hasta obtener una crema sedosa y brillante</li>
      </ol>

      <h3>Técnicas Básicas de Decoración</h3>
      
      <h4>1. Cobertura Lisa (Smooth Finish)</h4>
      <ol>
        <li>Aplica una capa delgada de buttercream (crumb coat)</li>
        <li>Refrigera 15-30 minutos</li>
        <li>Aplica una capa final más gruesa</li>
        <li>Alisa con espátula o alisador</li>
        <li>Para bordes perfectos, usa un alisador de pastel</li>
      </ol>

      <h4>2. Textura Rústica</h4>
      <ul>
        <li><strong>Espátula en movimientos circulares:</strong> Crea ondas naturales</li>
        <li><strong>Peinado horizontal:</strong> Usa un peine de pastelería</li>
        <li><strong>Efecto corteza:</strong> Con espátula de punta plana</li>
      </ul>

      <h4>3. Rosetas y Flores</h4>
      <p>Boquillas recomendadas:</p>
      <ul>
        <li><strong>1M o 2D:</strong> Rosetas grandes, ideales para cupcakes</li>
        <li><strong>104:</strong> Rosas realistas</li>
        <li><strong>352:</strong> Hojas</li>
        <li><strong>103:</strong> Pétalos delicados</li>
      </ul>

      <h3>Técnicas Avanzadas</h3>
      
      <h4>Efecto Degradado (Ombré)</h4>
      <ol>
        <li>Divide el buttercream en 3-4 porciones</li>
        <li>Tiñe cada porción con intensidad gradual del mismo color</li>
        <li>Aplica el más oscuro en la base del pastel</li>
        <li>Continúa con los tonos medios</li>
        <li>Termina con el más claro arriba</li>
        <li>Alisa suavemente para difuminar las transiciones</li>
      </ol>

      <h4>Flores Rusas (Russian Piping Tips)</h4>
      <p>Boquillas especiales que crean flores completas en un solo movimiento:</p>
      <ul>
        <li>Llena la manga con buttercream firme</li>
        <li>Coloca la boquilla perpendicular a la superficie</li>
        <li>Presiona mientras levantas en un movimiento rápido</li>
        <li>Suelta la presión y retira</li>
      </ul>

      <h4>Lettering y Escritura</h4>
      <ul>
        <li>Usa boquilla redonda pequeña (#2 o #3)</li>
        <li>Practica primero en papel encerado</li>
        <li>Mantén presión constante</li>
        <li>Para letras gruesas, usa boquilla de pétalo</li>
      </ul>

      <h3>Coloración del Buttercream</h3>
      
      <p><strong>Tipos de colorantes:</strong></p>
      <ul>
        <li><strong>Gel:</strong> Los mejores, colores intensos sin alterar consistencia</li>
        <li><strong>Polvo:</strong> Para tonos pastel y metálicos</li>
        <li><strong>Líquidos:</strong> Pueden alterar la consistencia, no recomendados</li>
      </ul>

      <p><strong>Tips de coloración:</strong></p>
      <ul>
        <li>Añade el color gradualmente con palillo</li>
        <li>Los colores se intensifican con el tiempo</li>
        <li>Para negro, usa chocolate oscuro + colorante negro</li>
        <li>Para blanco puro, usa extracto de vainilla transparente</li>
      </ul>

      <h3>Solución a Problemas</h3>
      
      <h4>¿Buttercream muy líquido?</h4>
      <ul>
        <li>Mantequilla demasiado blanda: refrigera 10 minutos</li>
        <li>Temperatura ambiente alta: trabaja en lugar fresco</li>
      </ul>

      <h4>¿Buttercream cortado?</h4>
      <ul>
        <li>No te alarmes, ¡tiene solución!</li>
        <li>Calienta suavemente los lados del bowl con pistola de calor</li>
        <li>Bate a velocidad media hasta que se una</li>
      </ul>

      <h4>¿Burbujas de aire?</h4>
      <ul>
        <li>Bate a velocidad baja al final</li>
        <li>Golpea suavemente el bowl sobre la mesa</li>
        <li>Alisa con espátula antes de usar</li>
      </ul>

      <blockquote>
        "El buttercream es como un lienzo en blanco: con la técnica correcta y algo de creatividad, puedes crear verdaderas obras de arte comestibles."
      </blockquote>

      <h3>Conservación</h3>
      <ul>
        <li><strong>Temperatura ambiente:</strong> 2-3 horas (en clima fresco)</li>
        <li><strong>Refrigerado:</strong> Hasta 2 semanas en recipiente hermético</li>
        <li><strong>Congelado:</strong> Hasta 3 meses</li>
        <li><strong>Nota:</strong> Siempre llevar a temperatura ambiente y rebatir antes de usar</li>
      </ul>

      <h3>Práctica y Paciencia</h3>
      <p>Recuerda que la decoración con buttercream es un arte que mejora con la práctica. No te desanimes si tus primeros intentos no son perfectos. Cada pastel es una oportunidad de aprender y mejorar.</p>
    `
  },
  'cupcakes-fantasmas-halloween': {
    categoria: 'Halloween',
    titulo: 'Cupcakes de Fantasmas Espeluznantes',
    descripcion: 'Deliciosos cupcakes de vainilla decorados como adorables fantasmitas para Halloween.',
    imagen: 'https://images.unsplash.com/photo-1599785209796-786432b228bc?w=1200&q=80',
    fecha: '15-10-2025',
    contenido: `
      <h2>¡Cupcakes fantasmagóricos perfectos para Halloween! 👻</h2>
      
      <p>Estos adorables cupcakes de fantasmas son el postre perfecto para cualquier fiesta de Halloween. Son fáciles de hacer y quedan absolutamente encantadores. Los niños los amarán.</p>

      <h3>Ingredientes para los Cupcakes (12 unidades)</h3>
      
      <h4>Para el Bizcocho de Vainilla:</h4>
      <ul>
        <li>180g de harina de trigo</li>
        <li>150g de azúcar</li>
        <li>100g de mantequilla a temperatura ambiente</li>
        <li>2 huevos grandes</li>
        <li>120ml de leche</li>
        <li>1 1/2 cucharaditas de polvo de hornear</li>
        <li>1/4 cucharadita de sal</li>
        <li>2 cucharaditas de extracto de vainilla</li>
      </ul>

      <h4>Para el Buttercream de Fantasma:</h4>
      <ul>
        <li>250g de mantequilla sin sal</li>
        <li>500g de azúcar glass</li>
        <li>3 cucharadas de leche</li>
        <li>1 cucharadita de extracto de vainilla</li>
        <li>Colorante blanco (opcional, para un blanco más intenso)</li>
      </ul>

      <h4>Para Decorar:</h4>
      <ul>
        <li>Chispas de chocolate mini (para los ojos y boca)</li>
        <li>Malvaviscos mini (opcional)</li>
        <li>Fondant negro (opcional para detalles)</li>
      </ul>

      <h3>Preparación de los Cupcakes</h3>
      
      <ol>
        <li><strong>Precalienta el horno</strong> a 175°C y coloca capacillos en un molde para 12 cupcakes.</li>
        
        <li><strong>Mezcla los ingredientes secos:</strong> En un bowl, tamiza la harina, polvo de hornear y sal. Reserva.</li>
        
        <li><strong>Crema la mantequilla y azúcar:</strong> En un bowl grande, bate la mantequilla y el azúcar hasta que esté pálida y esponjosa (3-4 minutos).</li>
        
        <li><strong>Añade los huevos:</strong> Incorpora los huevos uno a la vez, batiendo bien después de cada adición. Agrega la vainilla.</li>
        
        <li><strong>Combina los secos y líquidos:</strong> Añade la mezcla de harina en tres partes, alternando con la leche (comienza y termina con harina). Mezcla solo hasta incorporar.</li>
        
        <li><strong>Hornea:</strong> Llena los capacillos 2/3 de su capacidad. Hornea 18-20 minutos o hasta que un palillo salga limpio.</li>
        
        <li><strong>Enfría completamente:</strong> Deja enfriar en el molde 5 minutos, luego transfiere a una rejilla. Deben estar completamente fríos antes de decorar.</li>
      </ol>

      <h3>Preparación del Buttercream</h3>
      
      <ol>
        <li>Bate la mantequilla a velocidad media hasta que esté cremosa (2 minutos).</li>
        <li>Añade el azúcar glass gradualmente, 1 taza a la vez.</li>
        <li>Agrega la leche y la vainilla.</li>
        <li>Bate a velocidad alta durante 3-4 minutos hasta que esté esponjoso y suave.</li>
        <li>Si quieres un blanco más brillante, añade unas gotas de colorante blanco.</li>
      </ol>

      <h3>Decoración de Fantasmas 👻</h3>
      
      <h4>Técnica 1: Con Manga Pastelera</h4>
      <ol>
        <li>Llena una manga pastelera con el buttercream blanco (sin boquilla o con boquilla redonda grande).</li>
        <li>Sostén la manga vertical sobre el centro del cupcake.</li>
        <li>Presiona y levanta lentamente haciendo un movimiento circular, formando un pico alto.</li>
        <li>Al llegar arriba, suelta la presión y retira rápido para formar la "cola" del fantasma.</li>
        <li>Con pinzas, coloca dos chispas de chocolate mini para los ojos.</li>
        <li>Coloca 2-3 chispas en línea vertical para la boca (expresión de "OOOH").</li>
      </ol>

      <h4>Técnica 2: Con Espátula (más fácil)</h4>
      <ol>
        <li>Cubre el cupcake completamente con buttercream usando una espátula.</li>
        <li>Con la espátula, forma picos irregulares tirando hacia arriba.</li>
        <li>Decora con ojos y boca de chocolate.</li>
      </ol>

      <h3>Ideas Creativas de Decoración</h3>
      
      <ul>
        <li><strong>Fantasmas expresivos:</strong> Varía las expresiones haciendo diferentes caras (asustados, sorprendidos, felices)</li>
        <li><strong>Fantasmas con sombrero:</strong> Coloca un mini sombrero de bruja hecho de galleta Oreo</li>
        <li><strong>Familia fantasma:</strong> Haz fantasmas de diferentes tamaños</li>
        <li><strong>Fantasmas brillantes:</strong> Espolvorea azúcar perlado comestible para un efecto brillante</li>
        <li><strong>Base espeluznante:</strong> Decora la base del cupcake con migas de galleta Oreo (tierra de cementerio)</li>
      </ul>

      <blockquote>
        "Los fantasmas más tiernos nacen en la cocina. No necesitas ser un experto para crear estas adorables criaturas que robarán corazones en tu fiesta de Halloween."
      </blockquote>

      <h3>Consejos Profesionales</h3>
      
      <p><strong>Buttercream estable:</strong> Si hace mucho calor, añade 2 cucharadas de leche en polvo al buttercream para mayor estabilidad.</p>
      
      <p><strong>Altura perfecta:</strong> Para fantasmas más altos, usa una boquilla 1A (redonda grande) y construye en capas.</p>
      
      <p><strong>Ojos expresivos:</strong> Puedes usar fondant negro, glaseado negro con palillo, o incluso googly eyes comestibles.</p>

      <h3>Variaciones de Sabor</h3>
      
      <ul>
        <li><strong>Fantasmas de chocolate:</strong> Sustituye 40g de harina por cacao en polvo</li>
        <li><strong>Fantasmas de calabaza:</strong> Añade 3 cucharadas de puré de calabaza y especias (canela, nuez moscada)</li>
        <li><strong>Fantasmas de red velvet:</strong> Usa tu receta favorita de red velvet</li>
      </ul>

      <h3>Conservación</h3>
      
      <ul>
        <li><strong>Temperatura ambiente:</strong> 2 días en recipiente hermético (en clima fresco)</li>
        <li><strong>Refrigerados:</strong> Hasta 5 días (sacar 30 min antes de servir)</li>
        <li><strong>Congelados:</strong> Hasta 3 meses sin decorar</li>
      </ul>

      <h3>Tips para Fiestas</h3>
      
      <p>Decora estos cupcakes 2-4 horas antes de la fiesta para que el buttercream forme una ligera costra y los fantasmas se mantengan firmes. ¡Serán el centro de atención en cualquier mesa de Halloween! 🎃👻</p>
    `
  },
  'galletas-calabaza-halloween': {
    categoria: 'Halloween',
    titulo: 'Galletas de Calabaza Especiadas',
    descripcion: 'Galletas suaves con especias de otoño y glaseado naranja perfectas para Halloween.',
    imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200',
    fecha: '14-10-2025',
    contenido: `
      <h2>Galletas de calabaza perfectas para la temporada de Halloween 🎃</h2>
      
      <p>Estas galletas suaves y especiadas capturan todos los sabores del otoño. Con su textura tipo pastel y glaseado naranja brillante, son perfectas para compartir en Halloween.</p>

      <h3>Ingredientes (24 galletas)</h3>
      
      <h4>Para las Galletas:</h4>
      <ul>
        <li>280g de harina de trigo</li>
        <li>1 cucharadita de polvo de hornear</li>
        <li>1/2 cucharadita de bicarbonato de sodio</li>
        <li>1/2 cucharadita de sal</li>
        <li>2 cucharaditas de canela molida</li>
        <li>1 cucharadita de jengibre molido</li>
        <li>1/2 cucharadita de nuez moscada</li>
        <li>1/4 cucharadita de clavo de olor molido</li>
        <li>200g de azúcar morena</li>
        <li>100g de mantequilla derretida</li>
        <li>245g de puré de calabaza (no relleno para pie)</li>
        <li>1 huevo grande</li>
        <li>1 cucharadita de extracto de vainilla</li>
      </ul>

      <h4>Para el Glaseado de Calabaza:</h4>
      <ul>
        <li>200g de azúcar glass</li>
        <li>3 cucharadas de puré de calabaza</li>
        <li>1/2 cucharadita de canela</li>
        <li>Colorante naranja (opcional)</li>
        <li>1-2 cucharadas de leche (si es necesario)</li>
      </ul>

      <h4>Decoración (opcional):</h4>
      <ul>
        <li>Pepitas de chocolate mini</li>
        <li>Fondant negro para caras de calabaza</li>
        <li>Sprinkles de Halloween</li>
        <li>Chips de canela</li>
      </ul>

      <h3>Preparación de las Galletas</h3>
      
      <ol>
        <li><strong>Prepara el puré de calabaza:</strong> Si usas calabaza fresca, hornéala hasta que esté suave, haz puré y escurre el exceso de líquido con papel absorbente. También puedes usar calabaza enlatada.</li>
        
        <li><strong>Precalienta el horno</strong> a 175°C. Forra dos bandejas con papel mantequilla.</li>
        
        <li><strong>Mezcla los secos:</strong> En un bowl mediano, combina harina, polvo de hornear, bicarbonato, sal y todas las especias. Mezcla bien.</li>
        
        <li><strong>Mezcla los húmedos:</strong> En un bowl grande, bate el azúcar morena con la mantequilla derretida. Añade el puré de calabaza, huevo y vainilla. Mezcla hasta integrar.</li>
        
        <li><strong>Combina:</strong> Incorpora los ingredientes secos a los húmedos en dos adiciones. Mezcla solo hasta combinar. La masa será suave y pegajosa.</li>
        
        <li><strong>Forma las galletas:</strong> Usa una cuchara para helado o dos cucharas para formar bolas de masa. Colócalas en la bandeja dejando 5cm entre cada una.</li>
        
        <li><strong>Hornea:</strong> 12-14 minutos. Las galletas deben verse ligeramente doradas en los bordes pero suaves en el centro.</li>
        
        <li><strong>Enfría:</strong> Deja en la bandeja 5 minutos, luego transfiere a rejilla. Deben estar completamente frías antes de glasear.</li>
      </ol>

      <h3>Preparación del Glaseado</h3>
      
      <ol>
        <li>En un bowl, mezcla el azúcar glass tamizado con el puré de calabaza y canela.</li>
        <li>Bate hasta obtener una consistencia suave. Debe caer en cintas de la cuchara.</li>
        <li>Si está muy espeso, añade leche de a 1 cucharadita. Si está muy líquido, añade más azúcar glass.</li>
        <li>Añade unas gotas de colorante naranja si deseas un color más vibrante.</li>
        <li>Sumerge la parte superior de cada galleta en el glaseado o extiéndelo con una espátula.</li>
      </ol>

      <h3>Ideas de Decoración 🎃</h3>
      
      <h4>Calabazas Clásicas:</h4>
      <ol>
        <li>Glasea la galleta completamente en naranja</li>
        <li>Mientras está húmedo, coloca 3-4 líneas verticales con palillo (vetas de calabaza)</li>
        <li>Con fondant negro o chocolate derretido, dibuja carita de Jack-o'-lantern</li>
        <li>Añade un pequeño tallo verde en la parte superior</li>
      </ol>

      <h4>Calabazas Elegantes:</h4>
      <ul>
        <li>Glasea y espolvorea con azúcar dorada comestible</li>
        <li>Decora el borde con pequeños puntos de glaseado blanco</li>
        <li>Añade una hoja de menta fresca como tallo</li>
      </ul>

      <h4>Calabazas Espeluznantes:</h4>
      <ul>
        <li>Haz diferentes expresiones: asustadas, enojadas, sorprendidas</li>
        <li>Usa chips de chocolate para dientes torcidos</li>
        <li>Añade ojos de diferentes tamaños para efecto cómico</li>
      </ul>

      <blockquote>
        "El aroma de estas galletas de calabaza llenará tu hogar con la esencia del otoño. Son como un abrazo cálido en forma de postre."
      </blockquote>

      <h3>Consejos para Galletas Perfectas</h3>
      
      <p><strong>Textura suave:</strong> La clave está en no sobrecocinar. Las galletas deben verse ligeramente crudas en el centro cuando las saques del horno.</p>
      
      <p><strong>Especias frescas:</strong> Usa especias recién molidas si es posible. Las especias viejas pierden sabor.</p>
      
      <p><strong>Puré de calabaza casero:</strong> Si usas calabaza fresca, ásala en lugar de hervirla para un sabor más concentrado.</p>
      
      <p><strong>Glaseado perfecto:</strong> La consistencia debe ser como miel líquida. Si está muy espesa, no se extenderá bien; si está muy líquida, se caerá.</p>

      <h3>Variaciones Deliciosas</h3>
      
      <ul>
        <li><strong>Con chips de chocolate:</strong> Añade 150g de chips de chocolate a la masa</li>
        <li><strong>Con nueces:</strong> Incorpora 100g de nueces picadas</li>
        <li><strong>Glaseado de cream cheese:</strong> Sustituye el puré de calabaza por cream cheese para un sabor más rico</li>
        <li><strong>Especiadas extra:</strong> Duplica las especias si te gusta un sabor más intenso</li>
        <li><strong>Mini galletas:</strong> Haz versiones más pequeñas y hornea 8-10 minutos</li>
      </ul>

      <h3>Conservación y Almacenamiento</h3>
      
      <ul>
        <li><strong>Sin glasear:</strong> 5 días en recipiente hermético a temperatura ambiente</li>
        <li><strong>Glaseadas:</strong> 3-4 días en recipiente hermético (coloca papel encerado entre capas)</li>
        <li><strong>Masa cruda:</strong> Se puede refrigerar hasta 3 días o congelar hasta 3 meses</li>
        <li><strong>Galletas horneadas:</strong> Congela hasta 3 meses (sin glasear). Glasea después de descongelar</li>
      </ul>

      <h3>Para Regalar 🎁</h3>
      
      <p>Estas galletas son perfectas para regalar. Colócalas en bolsitas de celofán transparente atadas con listón naranja y negro, o en cajas decoradas con temas de Halloween. Añade una etiqueta con la fecha de elaboración.</p>

      <h3>Maridaje Perfecto</h3>
      
      <p>Sirve estas galletas con:</p>
      <ul>
        <li>Café con leche especiado (pumpkin spice latte casero)</li>
        <li>Chocolate caliente con crema batida</li>
        <li>Té chai caliente</li>
        <li>Sidra de manzana caliente</li>
      </ul>

      <p>¡Estas galletas de calabaza son el complemento perfecto para cualquier celebración de Halloween y te transportarán directamente a un acogedor día de otoño! 🍂🎃</p>
    `
  },
  'torta-cementerio-halloween': {
    categoria: 'Halloween',
    titulo: 'Torta Cementerio de Chocolate',
    descripcion: 'Una espeluznante torta de chocolate decorada como un cementerio terrorífico.',
    imagen: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1200&q=80',
    fecha: '13-10-2025',
    contenido: `
      <h2>¡La torta más espeluznante para Halloween! 🪦💀</h2>
      
      <p>Esta espectacular torta cementerio es perfecta para ser el centro de atención en tu fiesta de Halloween. Con bizcocho de chocolate húmedo, cobertura oscura y decoraciones terroríficas, ¡asustará y deleitará a todos!</p>

      <h3>Ingredientes</h3>
      
      <h4>Para el Bizcocho de Chocolate Oscuro (2 capas de 20cm):</h4>
      <ul>
        <li>250g de harina de trigo</li>
        <li>400g de azúcar</li>
        <li>90g de cacao en polvo sin azúcar</li>
        <li>2 cucharaditas de bicarbonato de sodio</li>
        <li>1 cucharadita de polvo de hornear</li>
        <li>1 cucharadita de sal</li>
        <li>2 huevos grandes</li>
        <li>250ml de café negro fuerte</li>
        <li>250ml de buttermilk</li>
        <li>125ml de aceite vegetal</li>
        <li>2 cucharaditas de extracto de vainilla</li>
      </ul>

      <h4>Para el Relleno de "Tierra" (Chocolate):</h4>
      <ul>
        <li>300g de chocolate oscuro</li>
        <li>300ml de crema de leche</li>
        <li>2 cucharadas de mantequilla</li>
      </ul>

      <h4>Para la Cobertura Oscura:</h4>
      <ul>
        <li>300g de mantequilla</li>
        <li>600g de azúcar glass</li>
        <li>60g de cacao en polvo</li>
        <li>100ml de leche</li>
        <li>Colorante negro (opcional)</li>
      </ul>

      <h4>Para las Decoraciones del Cementerio:</h4>
      <ul>
        <li>200g de galletas Oreo trituradas (tierra)</li>
        <li>Galletas rectangulares (lápidas/tombstones)</li>
        <li>Chocolate blanco derretido (para escribir en lápidas)</li>
        <li>Ositos de goma o malvaviscos (fantasmas)</li>
        <li>Pretzels (vallas rotas)</li>
        <li>Fondant gris (lápidas elaboradas)</li>
        <li>Colorante alimentario negro</li>
        <li>Sprinkles de Halloween</li>
      </ul>

      <h3>Preparación del Bizcocho</h3>
      
      <ol>
        <li><strong>Prepara los moldes:</strong> Precalienta el horno a 175°C. Engrasa y enharina dos moldes redondos de 20cm.</li>
        
        <li><strong>Mezcla los secos:</strong> En un bowl grande, tamiza la harina, azúcar, cacao, bicarbonato, polvo de hornear y sal. Mezcla bien.</li>
        
        <li><strong>Mezcla los húmedos:</strong> En otro bowl, bate los huevos. Añade el café, buttermilk, aceite y vainilla. Mezcla hasta integrar.</li>
        
        <li><strong>Combina:</strong> Vierte los ingredientes húmedos sobre los secos. Mezcla hasta que esté apenas combinado. La masa será muy líquida (¡esto es correcto!).</li>
        
        <li><strong>Hornea:</strong> Divide la masa entre los dos moldes. Hornea 30-35 minutos o hasta que un palillo salga limpio.</li>
        
        <li><strong>Enfría completamente:</strong> Deja en los moldes 10 minutos, luego desmolda y enfría en rejillas.</li>
      </ol>

      <h3>Preparación del Ganache</h3>
      
      <ol>
        <li>Pica el chocolate finamente en un bowl.</li>
        <li>Calienta la crema hasta que hierva.</li>
        <li>Vierte sobre el chocolate y espera 2 minutos.</li>
        <li>Mezcla desde el centro hasta obtener una mezcla brillante.</li>
        <li>Añade la mantequilla y mezcla.</li>
        <li>Deja enfriar hasta consistencia untable.</li>
      </ol>

      <h3>Preparación del Buttercream Oscuro</h3>
      
      <ol>
        <li>Bate la mantequilla hasta que esté cremosa.</li>
        <li>Tamiza juntos el azúcar glass y el cacao.</li>
        <li>Añade la mezcla de azúcar gradualmente, alternando con la leche.</li>
        <li>Bate 3-4 minutos hasta que esté esponjoso.</li>
        <li>Si quieres un tono más oscuro, añade colorante negro.</li>
      </ol>

      <h3>Montaje y Decoración del Cementerio 🪦</h3>
      
      <h4>Paso 1: Construcción Base</h4>
      <ol>
        <li>Nivela las capas de bizcocho si es necesario</li>
        <li>Coloca la primera capa en tu base o plato</li>
        <li>Unta una capa generosa de ganache</li>
        <li>Coloca la segunda capa encima</li>
        <li>Aplica una capa delgada de buttercream (crumb coat)</li>
        <li>Refrigera 20 minutos</li>
        <li>Aplica la capa final de buttercream oscuro</li>
      </ol>

      <h4>Paso 2: Crear la "Tierra" del Cementerio</h4>
      <ol>
        <li>Tritura las galletas Oreo en un procesador (con relleno incluido)</li>
        <li>Cubre completamente la parte superior de la torta con las migas</li>
        <li>Presiona suavemente para que se adhieran</li>
        <li>Crea "montículos" de tierra en algunos lugares</li>
      </ol>

      <h4>Paso 3: Crear las Lápidas</h4>
      
      <p><strong>Opción 1 - Lápidas de Galletas:</strong></p>
      <ol>
        <li>Usa galletas rectangulares (María, Graham)</li>
        <li>Derrite chocolate blanco</li>
        <li>Con manga y boquilla fina, escribe mensajes espeluznantes:
          <ul>
            <li>"RIP"</li>
            <li>"Aquí yace..."</li>
            <li>"1920-2025"</li>
            <li>"Descanse en Paz"</li>
            <li>"Boo!"</li>
          </ul>
        </li>
        <li>Deja secar completamente</li>
        <li>Inserta las galletas verticalmente en la torta</li>
      </ol>

      <p><strong>Opción 2 - Lápidas de Fondant:</strong></p>
      <ol>
        <li>Amasa fondant gris (mezcla blanco con negro)</li>
        <li>Estira a 5mm de grosor</li>
        <li>Corta formas de lápidas con cortador o cuchillo</li>
        <li>Con palillo, dibuja grietas y textura de piedra</li>
        <li>Usa colorante negro en polvo para envejecer</li>
        <li>Escribe epitafios con marcador comestible</li>
        <li>Deja secar 24 horas antes de usar</li>
      </ol>

      <h4>Paso 4: Añadir Elementos Espeluznantes</h4>
      
      <ul>
        <li><strong>Valla rota:</strong> Clava pretzels en ángulos irregulares alrededor del borde</li>
        <li><strong>Fantasmas:</strong> Usa malvaviscos con caras dibujadas con chocolate</li>
        <li><strong>Manos saliendo de la tierra:</strong> Moldea con fondant gris dedos saliendo del suelo</li>
        <li><strong>Murciélagos:</strong> Corta siluetas de fondant negro</li>
        <li><strong>Luna llena:</strong> Coloca una galleta Oreo blanca al fondo</li>
        <li><strong>Telarañas:</strong> Dibuja con chocolate blanco derretido</li>
        <li><strong>Árbol muerto:</strong> Usa pretzels largos como ramas secas</li>
      </ul>

      <h3>Ideas de Mensajes para Lápidas</h3>
      
      <ul>
        <li>"Aquí yace el último pedazo" 🍰</li>
        <li>"Murió de dulzura"</li>
        <li>"RIP Dieta 2025"</li>
        <li>"Se lo comió el lobo"</li>
        <li>"Aquí descansan mis abdominales"</li>
        <li>"Muerte por chocolate"</li>
        <li>"Boo! ¿Asusté?"</li>
      </ul>

      <blockquote>
        "Esta torta cementerio no solo es deliciosa, ¡es una obra de arte espeluznante que impresionará a todos tus invitados de Halloween!"
      </blockquote>

      <h3>Variaciones Terroríficas</h3>
      
      <ul>
        <li><strong>Versión Red Velvet:</strong> Usa bizcocho red velvet para un "efecto sangre"</li>
        <li><strong>Cementerio de arena:</strong> Usa galletas graham para simular arena del desierto</li>
        <li><strong>Versión infantil:</strong> Hazlo más colorido con fondant morado y verde</li>
        <li><strong>Cementerio 3D:</strong> Crea elevaciones con capas extra de bizcocho</li>
      </ul>

      <h3>Consejos Profesionales</h3>
      
      <p><strong>Estabilidad de las lápidas:</strong> Si usas galletas, insértalas justo antes de servir para que no se ablanden.</p>
      
      <p><strong>Tierra realista:</strong> Mezcla diferentes tipos de galletas (Oreo, chocolate) para variación en el color.</p>
      
      <p><strong>Escenas elaboradas:</strong> Planifica tu diseño dibujándolo primero en papel.</p>
      
      <p><strong>Iluminación dramática:</strong> Al servir, usa luz tenue y velas LED para ambiente tétrico.</p>

      <h3>Montaje para Evento</h3>
      
      <p><strong>Timeline recomendado:</strong></p>
      <ul>
        <li><strong>3 días antes:</strong> Hornea y congela los bizcochos</li>
        <li><strong>2 días antes:</strong> Haz las lápidas de fondant</li>
        <li><strong>1 día antes:</strong> Arma y decora la torta (excepto tierra de galleta)</li>
        <li><strong>Día del evento:</strong> Añade la tierra de galleta y detalles finales</li>
      </ul>

      <h3>Conservación</h3>
      
      <ul>
        <li><strong>Armada:</strong> 2-3 días refrigerada (cubierta)</li>
        <li><strong>Bizcocho solo:</strong> 3 meses congelado</li>
        <li><strong>Decoraciones de fondant:</strong> Duran indefinidamente si se guardan secas</li>
      </ul>

      <h3>Presentación Final 🎃</h3>
      
      <p>Para el máximo impacto:</p>
      <ol>
        <li>Coloca la torta en una base de madera oscura o bandeja negra</li>
        <li>Rodea con velas LED tipo vela derretida</li>
        <li>Esparce más galletas Oreo trituradas alrededor de la base</li>
        <li>Añade arañas de plástico pequeñas</li>
        <li>Crea niebla seca con hielo seco (en recipiente separado, ¡nunca directo en la torta!)</li>
      </ol>

      <p>Esta torta cementerio no solo será deliciosa, ¡será el tema de conversación de tu fiesta de Halloween por años! 🦇🪦👻</p>
    `
  }
};

export default function Articulo() {
    const { slug } = useParams();
    const { post: loaderPost, relatedPosts } = useArticuloData();
    
    // Usar datos del loader si están disponibles, sino usar datos locales
    let articulo = null;
    
    if (loaderPost && loaderPost.slug === slug) {
        // Convertir datos del loader al formato esperado
        articulo = {
            categoria: loaderPost.category,
            titulo: loaderPost.title,
            descripcion: loaderPost.excerpt,
            imagen: loaderPost.image || 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200',
            fecha: new Date(loaderPost.publishDate).toLocaleDateString('es-CL'),
            contenido: loaderPost.content ? 
                loaderPost.content.split('\n').map(line => `<p>${line}</p>`).join('') : 
                '<p>Contenido no disponible</p>'
        };
    } else {
        // Usar datos locales como fallback
        articulo = articulosCompletos[slug];
    }

    if (!articulo) {
        return (
            <Container className="py-5 text-center">
                <h2 className="text-brown mb-4">Artículo no encontrado</h2>
                <p className="text-muted mb-4">El artículo "{slug}" no existe o ha sido movido.</p>
                <BackButton text="Volver al Blog" />
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <BackButton />

            <article className="bg-white rounded-4 shadow-sm p-4 p-md-5">
                <header className="text-center mb-5">
                    <ArticleHeader 
                        categoria={articulo.categoria}
                        titulo={articulo.titulo}
                        fecha={articulo.fecha}
                    />
                </header>

                <ArticleImage 
                    src={articulo.imagen}
                    alt={articulo.titulo}
                />

                <div className="articulo-contenido">
                    {/* Mostrar contenido formateado */}
                    {loaderPost && loaderPost.slug === slug ? (
                        // Contenido del loader (formato markdown-like)
                        <div 
                            className="loader-content"
                            dangerouslySetInnerHTML={{ 
                                __html: articulo.contenido.replace(/\n/g, '<br>').replace(/##/g, '<h3>').replace(/###/g, '<h4>')
                            }}
                        />
                    ) : (
                        // Contenido local (HTML)
                        <div 
                            className="local-content"
                            dangerouslySetInnerHTML={{ __html: articulo.contenido }}
                        />
                    )}
                    
                    {/* Información adicional del loader */}
                    {loaderPost && loaderPost.slug === slug && (
                        <div className="article-meta mt-4 pt-4 border-top">
                            <div className="row">
                                <div className="col-md-6">
                                    <small className="text-muted">
                                        <i className="fas fa-user me-1"></i>
                                        Por {loaderPost.author}
                                    </small>
                                </div>
                                <div className="col-md-6 text-md-end">
                                    <small className="text-muted">
                                        <i className="fas fa-clock me-1"></i>
                                        Tiempo de lectura: {loaderPost.readTime}
                                    </small>
                                </div>
                            </div>
                            {loaderPost.tags && (
                                <div className="article-tags mt-3">
                                    <small className="text-muted me-2">Etiquetas:</small>
                                    {loaderPost.tags.map((tag, index) => (
                                        <span key={index} className="badge bg-secondary me-1">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* Artículos relacionados del loader */}
                    {relatedPosts && relatedPosts.length > 0 && (
                        <div className="related-posts mt-5 pt-4 border-top">
                            <h4 className="mb-3">Artículos Relacionados</h4>
                            <div className="row">
                                {relatedPosts.map((related, index) => (
                                    <div key={index} className="col-md-6 mb-3">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h6 className="card-title">{related.title}</h6>
                                                <p className="card-text small text-muted">{related.excerpt}</p>
                                                <small className="text-muted">
                                                    {new Date(related.publishDate).toLocaleDateString('es-CL')}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </Container>
    );
}
