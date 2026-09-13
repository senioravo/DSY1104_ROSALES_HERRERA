import { PRODUCTS_PS } from '../data/productos';
import { CATEGORIES_PS } from '../data/categorias';

export async function productsLoader() {
    // Simular delay de red (opcional)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
        products: PRODUCTS_PS,
        categories: CATEGORIES_PS,
        availableFilters: {
            dietary: ['sinGluten', 'vegano', 'sinLactosa'],
            features: ['personalizable', 'soloDisponibles']
        },
        totalProducts: PRODUCTS_PS.length,
        inStockProducts: PRODUCTS_PS.filter(p => p.stock > 0).length
    };
}
