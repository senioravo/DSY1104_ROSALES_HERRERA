/**
 * Servicio de autenticación para Mil Sabores
 * Maneja registro, login, logout y sesión de usuarios usando API REST
 */

import API_CONFIG from '../config/api.config';

const SESSION_KEY = 'mil_sabores_session';
const API_URL = API_CONFIG.USUARIO_SERVICE;

/**
 * Guarda el usuario junto con su JWT; el API Gateway exige el token
 * en todas las rutas que no son login, registro, productos o categorías.
 */
const saveSession = (data) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ ...data.user, token: data.token }));
};

/**
 * Indica si el JWT ya venció, leyendo el claim "exp" del payload
 */
const isTokenExpired = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        return !payload.exp || payload.exp * 1000 <= Date.now();
    } catch {
        return true;
    }
};

/**
 * Registra un nuevo usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @param {string} nombre - Nombre del usuario
 * @returns {Promise<Object>} - { success: boolean, message: string, user?: Object }
 */
const register = async (email, password, nombre) => {
    try {
        const response = await fetch(`${API_URL}/usuarios/register`, {
            method: 'POST',
            headers: API_CONFIG.HEADERS,
            body: JSON.stringify({
                nombre: nombre.trim(),
                email: email.toLowerCase().trim(),
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            // Manejar errores de validación
            if (data.errors) {
                const errorMessages = Object.values(data.errors).join(', ');
                return { success: false, message: errorMessages };
            }
            return { success: false, message: data.message || 'Error al registrar usuario' };
        }

        // Guardar sesión en localStorage si el registro fue exitoso
        if (data.success && data.user) {
            saveSession(data);
            // Disparar evento de actualización de sesión
            window.dispatchEvent(new Event('sessionUpdated'));
        }

        return data;
    } catch (error) {
        console.error('Error en registro:', error);
        return { success: false, message: 'Error de conexión con el servidor' };
    }
};

/**
 * Inicia sesión de un usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<Object>} - { success: boolean, message: string, user?: Object }
 */
const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/usuarios/login`, {
            method: 'POST',
            headers: API_CONFIG.HEADERS,
            body: JSON.stringify({
                email: email.toLowerCase().trim(),
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.errors) {
                const errorMessages = Object.values(data.errors).join(', ');
                return { success: false, message: errorMessages };
            }
            return { success: false, message: data.message || 'Error al iniciar sesión' };
        }

        // Guardar sesión en localStorage
        if (data.success && data.user) {
            saveSession(data);
            // Disparar evento de actualización de sesión
            window.dispatchEvent(new Event('sessionUpdated'));
        }

        return data;
    } catch (error) {
        console.error('Error en login:', error);
        return { success: false, message: 'Error de conexión con el servidor' };
    }
};

/**
 * Cierra la sesión del usuario actual
 */
const logout = () => {
    try {
        localStorage.removeItem(SESSION_KEY);
        window.dispatchEvent(new Event('sessionUpdated'));
        return { success: true, message: 'Sesión cerrada exitosamente' };
    } catch (error) {
        console.error('Error en logout:', error);
        return { success: false, message: 'Error al cerrar sesión' };
    }
};

/**
 * Obtiene la sesión actual
 * @returns {Object|null} - Datos de la sesión o null si no hay sesión
 */
const getSession = () => {
    try {
        const session = localStorage.getItem(SESSION_KEY);
        if (!session) return null;
        const user = JSON.parse(session);
        // Sesiones antiguas (sin token) o con el token vencido obligan a iniciar sesión de nuevo
        if (!user.token || isTokenExpired(user.token)) {
            localStorage.removeItem(SESSION_KEY);
            return null;
        }
        return user;
    } catch (error) {
        console.error('Error al obtener sesión:', error);
        return null;
    }
};

/**
 * Verifica si hay una sesión activa
 * @returns {boolean}
 */
const isAuthenticated = () => {
    return getSession() !== null;
};

/**
 * Obtiene el usuario actual de la sesión
 * @returns {Object|null}
 */
const getCurrentUser = () => {
    return getSession();
};

/**
 * Obtiene el JWT de la sesión actual
 * @returns {string|null}
 */
const getToken = () => {
    return getSession()?.token || null;
};

/**
 * Headers JSON con el Bearer token si hay sesión activa
 * @returns {Object}
 */
const getAuthHeaders = () => {
    const token = getToken();
    return token ? API_CONFIG.getAuthHeaders(token) : API_CONFIG.HEADERS;
};

export const authService = {
    register,
    login,
    logout,
    getSession,
    isAuthenticated,
    getCurrentUser,
    getToken,
    getAuthHeaders
};