/**
 * Servicio de autenticación para Mil Sabores
 * Maneja registro, login, logout y sesión de usuarios usando API REST
 */

import API_CONFIG from '../config/api.config';

const SESSION_KEY = 'mil_sabores_session';
const API_URL = API_CONFIG.USUARIO_SERVICE;

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
            localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
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
            localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
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
        return session ? JSON.parse(session) : null;
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

export const authService = {
    register,
    login,
    logout,
    getSession,
    isAuthenticated,
    getCurrentUser
};