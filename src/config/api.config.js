// Configuración de las URLs de los microservicios del backend
// Ajustar según el entorno (desarrollo, producción)

const isProduction = import.meta.env.PROD;

/** API Gateway (EP1): un solo origen; Bearer Entra vía msalApiFetch */
const gatewayUrl =
    import.meta.env.VITE_API_GATEWAY_URL?.replace(/\/$/, '') ||
    (!isProduction ? 'http://localhost:8080/api' : null);

function resolveServiceUrl(envUrl, legacyPort) {
    if (gatewayUrl) {
        return gatewayUrl;
    }
    if (envUrl) {
        return String(envUrl).replace(/\/$/, '');
    }
    if (isProduction) {
        return '/api';
    }
    return `http://localhost:${legacyPort}/api`;
}

const API_CONFIG = {
    GATEWAY_URL: gatewayUrl || null,

    USUARIO_SERVICE: resolveServiceUrl(import.meta.env.VITE_USUARIO_API_URL, 8081),
    PRODUCTO_SERVICE: resolveServiceUrl(import.meta.env.VITE_PRODUCTO_API_URL, 8082),
    CARRITO_SERVICE: resolveServiceUrl(import.meta.env.VITE_CARRITO_API_URL, 8083),
    VENTAS_SERVICE: resolveServiceUrl(import.meta.env.VITE_VENTAS_API_URL, 8084),

    HEADERS: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },

    getAuthHeaders: (token) => ({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    }),
};

export default API_CONFIG;
