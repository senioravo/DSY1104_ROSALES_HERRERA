import { PRODUCTS_PS } from '../data/productos';

export async function personalizeLoader() {
    // Simular delay de red (opcional)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Obtener solo productos personalizables
    const customizableProducts = PRODUCTS_PS.filter(p => p.personalizable && p.stock > 0);
    
    return {
        products: customizableProducts,
        availableSizes: ["S (8 porciones)", "M (12 porciones)", "L (20 porciones)"],
        availableFlavors: [
            'Chocolate',
            'Vainilla',
            'Frutas',
            'Manjar',
            'Red Velvet',
            'Tres Leches',
            'Zanahoria'
        ],
        maxMessageLength: 50,
        formInstructions: "Completa el formulario para personalizar tu torta perfecta"
    };
}
