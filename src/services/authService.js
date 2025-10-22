/**
 * Servicio de autenticación para Mil Sabores
 * Maneja registro, login, logout y sesión de usuarios usando localStorage
 */

const USERS_KEY = 'mil_sabores_users';
const SESSION_KEY = 'mil_sabores_session';

/**
 * Obtiene todos los usuarios registrados
 */
const getUsers = () => {
    try {
        const users = localStorage.getItem(USERS_KEY);
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
};

/**
 * Guarda los usuarios en localStorage
 */
const saveUsers = (users) => {
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
        console.error('Error al guardar usuarios:', error);
    }
};

/**
 * Registra un nuevo usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @param {string} nombre - Nombre del usuario
 * @returns {Object} - { success: boolean, message: string, user?: Object }
 */
const register = (email, password, nombre) => {
    try {
        // Validaciones básicas
        if (!email || !password || !nombre) {
            return { success: false, message: 'Todos los campos son obligatorios' };
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, message: 'Email inválido' };
        }

        // Validar longitud de contraseña
        if (password.length < 6) {
            return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
        }

        const users = getUsers();

        // Verificar si el email ya existe
        if (users.some(user => user.email === email)) {
            return { success: false, message: 'El email ya está registrado' };
        }

        // Crear nuevo usuario
        const newUser = {
            id: Date.now().toString(),
            email: email.toLowerCase().trim(),
            password, // En producción debería estar hasheada
            nombre: nombre.trim(),
            fechaRegistro: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        // No devolver la contraseña
        const { password: _, ...userWithoutPassword } = newUser;

        return {
            success: true,
            message: 'Usuario registrado exitosamente',
            user: userWithoutPassword
        };
    } catch (error) {
        console.error('Error en registro:', error);
        return { success: false, message: 'Error al registrar usuario' };
    }
};

/**
 * Inicia sesión de un usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Object} - { success: boolean, message: string, user?: Object }
 */
const login = (email, password) => {
    try {
        if (!email || !password) {
            return { success: false, message: 'Email y contraseña son obligatorios' };
        }

        const users = getUsers();
        const user = users.find(
            u => u.email === email.toLowerCase().trim() && u.password === password
        );

        if (!user) {
            return { success: false, message: 'Email o contraseña incorrectos' };
        }

        // Crear sesión
        const session = {
            id: user.id,
            email: user.email,
            nombre: user.nombre,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(session));

        // Disparar evento de actualización de sesión
        window.dispatchEvent(new Event('sessionUpdated'));

        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            user: session
        };
    } catch (error) {
        console.error('Error en login:', error);
        return { success: false, message: 'Error al iniciar sesión' };
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