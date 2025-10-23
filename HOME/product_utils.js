import { PRODUCTS_PS } from './productos_pasteleria.js';

export const ProductUtils = {
    getProductByCode: (code) => {
        return PRODUCTS_PS.find(product => product.code === code);
    },

    getProductImage: (code) => {
        const product = ProductUtils.getProductByCode(code);
        return product ? product.imagen : null;
    },

    getProductPrice: (code) => {
        const product = ProductUtils.getProductByCode(code);
        return product ? product.precioCLP : 0;
    },

    getProductName: (code) => {
        const product = ProductUtils.getProductByCode(code);
        return product ? product.nombre : '';
    },

    getProductCategory: (code) => {
        const product = ProductUtils.getProductByCode(code);
        return product ? product.categoriaId : '';
    },

    formatPrice: (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(price);
    }
};