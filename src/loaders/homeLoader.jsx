import { CATEGORIES_PS } from '../data/categorias';
import { PRODUCTS_PS } from '../data/productos';
import { blogArticles } from '../data/blogArticles';

export async function homeLoader() {
  // Simular delay de red (opcional)
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    categories: CATEGORIES_PS.slice(0, 6), // Primeras 6 categorías para la sección de categorías
    highlightedProducts: PRODUCTS_PS.filter(p => p.stock > 0).slice(0, 4), // 4 productos destacados
    recentArticles: blogArticles.slice(0, 3), // 3 artículos recientes para la sección del blog
    heroMessage: "Descubre los sabores más deliciosos en nuestra pastelería"
  };
}