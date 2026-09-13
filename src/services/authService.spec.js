// Pruebas unitarias para el servicio de autenticación
// Archivo: src/services/authService.spec.js

import { authService } from './authService';

describe('AuthService', () => {
  
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
  });

  afterEach(() => {
    // Limpiar localStorage después de cada prueba
    localStorage.clear();
  });

  describe('Login functionality', () => {
    
    it('debe hacer login con credenciales válidas', () => {
      const email = 'test@example.com';
      const password = 'password123';
      
      const result = authService.login(email, password);
      
      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(email);
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('debe fallar con credenciales inválidas', () => {
      const result = authService.login('wrong@email.com', 'wrongpassword');
      
      expect(result.success).toBe(false);
      expect(result.message).toBeDefined();
      expect(authService.isAuthenticated()).toBe(false);
    });

    it('debe fallar con email vacío', () => {
      const result = authService.login('', 'password123');
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('requerido');
    });

    it('debe fallar con contraseña vacía', () => {
      const result = authService.login('test@example.com', '');
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('requerido');
    });
  });

  describe('Registration functionality', () => {
    
    it('debe registrar un nuevo usuario correctamente', () => {
      const userData = {
        name: 'Test User',
        email: 'newuser@example.com',
        password: 'password123'
      };
      
      const result = authService.register(userData);
      
      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.user.name).toBe(userData.name);
      expect(result.user.email).toBe(userData.email);
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('debe fallar al registrar con email existente', () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };
      
      // Primer registro
      authService.register(userData);
      authService.logout();
      
      // Intentar registrar con el mismo email
      const result = authService.register(userData);
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('existe');
    });

    it('debe fallar con datos incompletos', () => {
      const incompleteData = {
        name: '',
        email: 'test@example.com',
        password: 'password123'
      };
      
      const result = authService.register(incompleteData);
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('requerido');
    });
  });

  describe('Authentication state', () => {
    
    it('debe retornar false cuando no hay usuario logueado', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });

    it('debe retornar true cuando hay usuario logueado', () => {
      authService.login('test@example.com', 'password123');
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('debe obtener el usuario actual', () => {
      const email = 'test@example.com';
      authService.login(email, 'password123');
      
      const currentUser = authService.getCurrentUser();
      
      expect(currentUser).toBeDefined();
      expect(currentUser.email).toBe(email);
    });

    it('debe retornar null cuando no hay usuario logueado', () => {
      const currentUser = authService.getCurrentUser();
      expect(currentUser).toBeNull();
    });
  });

  describe('Logout functionality', () => {
    
    it('debe hacer logout correctamente', () => {
      // Primero hacer login
      authService.login('test@example.com', 'password123');
      expect(authService.isAuthenticated()).toBe(true);
      
      // Hacer logout
      authService.logout();
      
      expect(authService.isAuthenticated()).toBe(false);
      expect(authService.getCurrentUser()).toBeNull();
    });
  });

  describe('Persistencia de sesión', () => {
    
    it('debe persistir la sesión en localStorage', () => {
      authService.login('test@example.com', 'password123');
      
      // Verificar que los datos están en localStorage
      const storedUser = localStorage.getItem('user');
      expect(storedUser).toBeTruthy();
      
      const userData = JSON.parse(storedUser);
      expect(userData.email).toBe('test@example.com');
    });

    it('debe restaurar la sesión desde localStorage', () => {
      // Simular datos en localStorage
      const userData = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com'
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      // El servicio debe detectar la sesión existente
      expect(authService.isAuthenticated()).toBe(true);
      expect(authService.getCurrentUser().email).toBe('test@example.com');
    });

    it('debe limpiar localStorage al hacer logout', () => {
      authService.login('test@example.com', 'password123');
      expect(localStorage.getItem('user')).toBeTruthy();
      
      authService.logout();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });
});