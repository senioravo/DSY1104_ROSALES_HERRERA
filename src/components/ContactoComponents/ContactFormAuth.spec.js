// Pruebas unitarias para ContactForm con autenticación
// Archivo: src/components/root/ContactoComponents/ContactFormAuth.spec.js

import { render, fireEvent, screen } from '@testing-library/react';
import ContactForm from './ContactForm';
import { authService } from '../../../services/authService';

// Mock del authService
jest.mock('../../../services/authService', () => ({
  authService: {
    isAuthenticated: jest.fn(),
    getCurrentUser: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn()
  }
}));

describe('ContactForm with Authentication', () => {
  
  beforeEach(() => {
    // Reset mocks antes de cada prueba
    jest.clearAllMocks();
  });

  describe('Estado no autenticado', () => {
    
    beforeEach(() => {
      authService.isAuthenticated.mockReturnValue(false);
      authService.getCurrentUser.mockReturnValue(null);
    });

    it('debe mostrar formulario deshabilitado cuando no está autenticado', () => {
      render(<ContactForm />);
      
      // Verificar que los campos están deshabilitados
      const nombreInput = screen.getByPlaceholderText(/nombre completo/i);
      const emailInput = screen.getByPlaceholderText(/email/i);
      const mensajeTextarea = screen.getByPlaceholderText(/mensaje/i);
      
      expect(nombreInput).toBeDisabled();
      expect(emailInput).toBeDisabled();
      expect(mensajeTextarea).toBeDisabled();
    });

    it('debe mostrar mensaje indicando que debe iniciar sesión', () => {
      render(<ContactForm />);
      
      const mensaje = screen.getByText(/debe iniciar sesión/i);
      expect(mensaje).toBeInTheDocument();
    });

    it('debe mostrar botón para iniciar sesión', () => {
      render(<ContactForm />);
      
      const loginButton = screen.getByText(/iniciar sesión/i);
      expect(loginButton).toBeInTheDocument();
    });

    it('debe abrir modal de login al hacer click en iniciar sesión', () => {
      render(<ContactForm />);
      
      const loginButton = screen.getByText(/iniciar sesión/i);
      fireEvent.click(loginButton);
      
      // Verificar que el modal se abre
      const modal = screen.getByText(/iniciar sesión/i);
      expect(modal).toBeInTheDocument();
    });
  });

  describe('Estado autenticado', () => {
    
    const mockUser = {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com'
    };

    beforeEach(() => {
      authService.isAuthenticated.mockReturnValue(true);
      authService.getCurrentUser.mockReturnValue(mockUser);
    });

    it('debe mostrar formulario habilitado cuando está autenticado', () => {
      render(<ContactForm />);
      
      // Verificar que los campos están habilitados
      const nombreInput = screen.getByPlaceholderText(/nombre completo/i);
      const emailInput = screen.getByPlaceholderText(/email/i);
      const mensajeTextarea = screen.getByPlaceholderText(/mensaje/i);
      
      expect(nombreInput).not.toBeDisabled();
      expect(emailInput).not.toBeDisabled();
      expect(mensajeTextarea).not.toBeDisabled();
    });

    it('debe prellenar campos con datos del usuario', () => {
      render(<ContactForm />);
      
      const nombreInput = screen.getByDisplayValue(mockUser.name);
      const emailInput = screen.getByDisplayValue(mockUser.email);
      
      expect(nombreInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
    });

    it('debe mostrar mensaje de bienvenida con nombre del usuario', () => {
      render(<ContactForm />);
      
      const welcomeMessage = screen.getByText(new RegExp(mockUser.name, 'i'));
      expect(welcomeMessage).toBeInTheDocument();
    });

    it('debe mostrar botón de cerrar sesión', () => {
      render(<ContactForm />);
      
      const logoutButton = screen.getByText(/cerrar sesión/i);
      expect(logoutButton).toBeInTheDocument();
    });

    it('debe permitir enviar el formulario', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByText(/enviar mensaje/i);
      expect(submitButton).not.toBeDisabled();
    });

    it('debe cerrar sesión al hacer click en cerrar sesión', () => {
      render(<ContactForm />);
      
      const logoutButton = screen.getByText(/cerrar sesión/i);
      fireEvent.click(logoutButton);
      
      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('Modal de Login', () => {
    
    beforeEach(() => {
      authService.isAuthenticated.mockReturnValue(false);
      authService.getCurrentUser.mockReturnValue(null);
    });

    it('debe procesar login exitoso', () => {
      authService.login.mockReturnValue({
        success: true,
        user: { id: 1, name: 'Test User', email: 'test@example.com' }
      });

      render(<ContactForm />);
      
      // Abrir modal
      const loginButton = screen.getByText(/iniciar sesión/i);
      fireEvent.click(loginButton);
      
      // Llenar formulario de login
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      // Enviar formulario
      const submitButton = screen.getByText(/entrar/i);
      fireEvent.click(submitButton);
      
      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('debe mostrar error en login fallido', () => {
      authService.login.mockReturnValue({
        success: false,
        message: 'Credenciales inválidas'
      });

      render(<ContactForm />);
      
      // Abrir modal y enviar login
      const loginButton = screen.getByText(/iniciar sesión/i);
      fireEvent.click(loginButton);
      
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);
      const submitButton = screen.getByText(/entrar/i);
      
      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
      fireEvent.click(submitButton);
      
      const errorMessage = screen.getByText(/credenciales inválidas/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Modal de Registro', () => {
    
    beforeEach(() => {
      authService.isAuthenticated.mockReturnValue(false);
      authService.getCurrentUser.mockReturnValue(null);
    });

    it('debe procesar registro exitoso', () => {
      authService.register.mockReturnValue({
        success: true,
        user: { id: 1, name: 'New User', email: 'new@example.com' }
      });

      render(<ContactForm />);
      
      // Abrir modal de login y cambiar a registro
      const loginButton = screen.getByText(/iniciar sesión/i);
      fireEvent.click(loginButton);
      
      const registerToggle = screen.getByText(/registrarse/i);
      fireEvent.click(registerToggle);
      
      // Llenar formulario de registro
      const nameInput = screen.getByPlaceholderText(/nombre completo/i);
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);
      
      fireEvent.change(nameInput, { target: { value: 'New User' } });
      fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      // Enviar formulario
      const submitButton = screen.getByText(/registrarse/i);
      fireEvent.click(submitButton);
      
      expect(authService.register).toHaveBeenCalledWith({
        name: 'New User',
        email: 'new@example.com',
        password: 'password123'
      });
    });

    it('debe mostrar error en registro fallido', () => {
      authService.register.mockReturnValue({
        success: false,
        message: 'El email ya existe'
      });

      render(<ContactForm />);
      
      // Proceso similar al anterior pero verificando error
      const loginButton = screen.getByText(/iniciar sesión/i);
      fireEvent.click(loginButton);
      
      const registerToggle = screen.getByText(/registrarse/i);
      fireEvent.click(registerToggle);
      
      const nameInput = screen.getByPlaceholderText(/nombre completo/i);
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/contraseña/i);
      const submitButton = screen.getByText(/registrarse/i);
      
      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      const errorMessage = screen.getByText(/email ya existe/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Validación de formulario', () => {
    
    beforeEach(() => {
      authService.isAuthenticated.mockReturnValue(true);
      authService.getCurrentUser.mockReturnValue({
        id: 1,
        name: 'Test User',
        email: 'test@example.com'
      });
    });

    it('debe validar campos requeridos', () => {
      render(<ContactForm />);
      
      // Intentar enviar formulario vacío
      const submitButton = screen.getByText(/enviar mensaje/i);
      fireEvent.click(submitButton);
      
      // Verificar mensajes de error
      const errorMessages = screen.getAllByText(/requerido/i);
      expect(errorMessages.length).toBeGreaterThan(0);
    });

    it('debe validar formato de email', () => {
      render(<ContactForm />);
      
      const emailInput = screen.getByPlaceholderText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
      
      const submitButton = screen.getByText(/enviar mensaje/i);
      fireEvent.click(submitButton);
      
      const errorMessage = screen.getByText(/email válido/i);
      expect(errorMessage).toBeInTheDocument();
    });

    it('debe permitir envío con datos válidos', () => {
      render(<ContactForm />);
      
      // Llenar todos los campos
      const asuntoSelect = screen.getByDisplayValue(/consulta general/i);
      const mensajeTextarea = screen.getByPlaceholderText(/mensaje/i);
      
      fireEvent.change(asuntoSelect, { target: { value: 'Consulta sobre productos' } });
      fireEvent.change(mensajeTextarea, { target: { value: 'Este es un mensaje de prueba' } });
      
      const submitButton = screen.getByText(/enviar mensaje/i);
      fireEvent.click(submitButton);
      
      // Verificar que no hay errores y se muestra mensaje de éxito
      const successMessage = screen.getByText(/mensaje enviado/i);
      expect(successMessage).toBeInTheDocument();
    });
  });
});