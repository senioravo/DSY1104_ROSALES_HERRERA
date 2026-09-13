// Configuración de las URLs de los microservicios del backend
// Ajustar según el entorno (desarrollo, producción)

// En producción (Vercel), usa rutas relativas para que Vercel haga de proxy
// En desarrollo local, usa la IP directa de EC2
const isProduction = import.meta.env.PROD;
const API_BASE_URL = isProduction ? '' : 'http://100.30.4.167';

const API_CONFIG = {
    // URLs base de los microservicios
    USUARIO_SERVICE: isProduction ? '/api' : `${API_BASE_URL}:8081/api`,
    PRODUCTO_SERVICE: isProduction ? '/api' : `${API_BASE_URL}:8082/api`,
    CARRITO_SERVICE: isProduction ? '/api' : `${API_BASE_URL}:8083/api`,
    VENTAS_SERVICE: isProduction ? '/api' : `${API_BASE_URL}:8084/api`,
    
    // Configuración de headers
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    
    // Headers con autenticación
    getAuthHeaders: (token) => ({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    })
};

export default API_CONFIG;
