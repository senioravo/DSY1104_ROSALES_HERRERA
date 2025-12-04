// Configuración de las URLs de los microservicios del backend
// Ajustar según el entorno (desarrollo, producción)

// IP Elástica de AWS EC2: 100.30.4.167
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://100.30.4.167';

const API_CONFIG = {
    // URLs base de los microservicios
    USUARIO_SERVICE: `${API_BASE_URL}:8081/api`,
    PRODUCTO_SERVICE: `${API_BASE_URL}:8082/api`,
    CARRITO_SERVICE: `${API_BASE_URL}:8083/api`,
    VENTAS_SERVICE: `${API_BASE_URL}:8084/api`,
    
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
