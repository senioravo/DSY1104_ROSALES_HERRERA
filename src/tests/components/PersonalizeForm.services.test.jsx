import React from 'react';
import { createRoot } from 'react-dom/client';
import PersonalizeForm from '../../../components/personalize-components/PersonalizeForm.jsx';
import { authService } from '../../../services/authService.js';
import { customOrderService } from '../../../services/customOrderService.js';

// Mock de los servicios
jest.mock('../../../services/authService.js');
jest.mock('../../../services/customOrderService.js');

describe('PersonalizeForm Services Integration Tests', () => {
    let container = null;
    let root = null;
    let mockOnSuccess = null;
    let mockOnError = null;
    let mockAddEventListener = null;
    let mockRemoveEventListener = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
        
        mockOnSuccess = jest.fn();
        mockOnError = jest.fn();
        
        // Mock de addEventListener/removeEventListener
        mockAddEventListener = jest.fn();
        mockRemoveEventListener = jest.fn();
        global.addEventListener = mockAddEventListener;
        global.removeEventListener = mockRemoveEventListener;
        
        // Reset mocks
        jest.clearAllMocks();
    });

    afterEach(() => {
        if (root) {
            root.unmount();
        }
        container.remove();
        container = null;
        root = null;
    });

    function renderComponent(props = {}) {
        return new Promise(resolve => {
            const defaultProps = {
                onSuccess: mockOnSuccess,
                onError: mockOnError
            };
            root.render(<PersonalizeForm {...defaultProps} {...props} />);
            setTimeout(resolve, 100);
        });
    }

    describe('AuthService Integration', () => {
        it('debería llamar getCurrentUser al montar el componente', (done) => {
            authService.getCurrentUser = jest.fn().mockReturnValue(null);
            
            renderComponent().then(() => {
                expect(authService.getCurrentUser).toHaveBeenCalled();
                done();
            });
        });

        it('debería pre-llenar campos cuando hay usuario logueado', (done) => {
            const mockUser = {
                nombre: 'Juan Pérez',
                email: 'juan@example.com'
            };
            
            authService.getCurrentUser = jest.fn().mockReturnValue(mockUser);
            
            renderComponent().then(() => {
                const nombreInput = container.querySelector('input[name="nombre"]');
                const emailInput = container.querySelector('input[name="email"]');
                
                expect(nombreInput.value).toBe('Juan Pérez');
                expect(emailInput.value).toBe('juan@example.com');
                expect(nombreInput.disabled).toBe(true);
                expect(emailInput.disabled).toBe(true);
                done();
            });
        });

        it('debería configurar listener para sessionUpdated', (done) => {
            authService.getCurrentUser = jest.fn().mockReturnValue(null);
            
            renderComponent().then(() => {
                expect(mockAddEventListener).toHaveBeenCalledWith(
                    'sessionUpdated',
                    expect.any(Function)
                );
                done();
            });
        });

        it('debería limpiar listener al desmontar', (done) => {
            authService.getCurrentUser = jest.fn().mockReturnValue(null);
            
            renderComponent().then(() => {
                // Verificar que se configuró el listener
                expect(mockAddEventListener).toHaveBeenCalled();
                
                // Desmontar componente
                root.unmount();
                
                setTimeout(() => {
                    expect(mockRemoveEventListener).toHaveBeenCalledWith(
                        'sessionUpdated',
                        expect.any(Function)
                    );
                    done();
                }, 50);
            });
        });

        it('debería actualizar campos cuando sessionUpdated se dispara', (done) => {
            const initialUser = null;
            const updatedUser = {
                nombre: 'María González',
                email: 'maria@example.com'
            };
            
            authService.getCurrentUser = jest.fn()
                .mockReturnValueOnce(initialUser)
                .mockReturnValueOnce(updatedUser);
            
            renderComponent().then(() => {
                // Obtener la función handler del addEventListener
                const sessionUpdateHandler = mockAddEventListener.mock.calls
                    .find(call => call[0] === 'sessionUpdated')[1];
                
                expect(sessionUpdateHandler).toBeDefined();
                
                // Simular disparo del evento
                sessionUpdateHandler();
                
                setTimeout(() => {
                    const nombreInput = container.querySelector('input[name="nombre"]');
                    const emailInput = container.querySelector('input[name="email"]');
                    
                    expect(nombreInput.value).toBe('María González');
                    expect(emailInput.value).toBe('maria@example.com');
                    done();
                }, 50);
            });
        });
    });

    describe('CustomOrderService Integration', () => {
        it('debería llamar createOrder con datos correctos al enviar formulario', (done) => {
            authService.getCurrentUser = jest.fn().mockReturnValue(null);
            customOrderService.createOrder = jest.fn().mockReturnValue({
                success: true,
                message: 'Orden creada exitosamente'
            });
            
            renderComponent().then(() => {
                // Llenar formulario
                const nombreInput = container.querySelector('input[name="nombre"]');
                const telefonoInput = container.querySelector('input[name="telefono"]');
                const emailInput = container.querySelector('input[name="email"]');
                const descripcionTextarea = container.querySelector('textarea[name="descripcion"]');
                
                nombreInput.value = 'Test User';
                telefonoInput.value = '+56912345678';
                emailInput.value = 'test@example.com';
                descripcionTextarea.value = 'Descripción de prueba';
                
                // Disparar eventos de cambio
                [nombreInput, telefonoInput, emailInput, descripcionTextarea].forEach(input => {
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                });
                
                // Enviar formulario
                const form = container.querySelector('form');
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                
                setTimeout(() => {
                    expect(customOrderService.createOrder).toHaveBeenCalledWith(
                        expect.objectContaining({
                            nombre: 'Test User',
                            telefono: '+56912345678',
                            email: 'test@example.com',
                            descripcion: 'Descripción de prueba'
                        })
                    );
                    done();
                }, 100);
            });
        });

        it('debería manejar respuesta exitosa del servicio', (done) => {
            authService.getCurrentUser = jest.fn().mockReturnValue(null);
            customOrderService.createOrder = jest.fn().mockReturnValue({
                success: true,
                message: 'Orden creada exitosamente'
            });
            
            renderComponent().then(() => {
                // Llenar y enviar formulario (simulado)
                const form = container.querySelector('form');
                
                // Simular formulario válido
                Object.defineProperty(form, 'checkValidity', {
                    value: () => true
                });
                
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                
                setTimeout(() => {
                    expect(mockOnSuccess).toHaveBeenCalled();
                    expect(mockOnError).not.toHaveBeenCalled();
                    done();
                }, 100);
            });
        });

        it('debería manejar error del servicio', (done) => {
            authService.getCurrentUser = jest.fn().mockReturnValue(null);
            customOrderService.createOrder = jest.fn().mockReturnValue({
                success: false,
                message: 'Error al crear la orden'
            });
            
            renderComponent().then(() => {
                const form = container.querySelector('form');
                
                // Simular formulario válido
                Object.defineProperty(form, 'checkValidity', {
                    value: () => true
                });
                
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                
                setTimeout(() => {
                    expect(mockOnError).toHaveBeenCalledWith('Error al crear la orden');
                    expect(mockOnSuccess).not.toHaveBeenCalled();
                    done();
                }, 100);
            });
        });

        it('debería manejar excepción del servicio', (done) => {
            authService.getCurrentUser = jest.fn().mockReturnValue(null);
            customOrderService.createOrder = jest.fn().mockImplementation(() => {
                throw new Error('Error de red');
            });
            
            renderComponent().then(() => {
                const form = container.querySelector('form');
                
                Object.defineProperty(form, 'checkValidity', {
                    value: () => true
                });
                
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                
                setTimeout(() => {
                    expect(mockOnError).toHaveBeenCalledWith('Error al enviar la solicitud');
                    done();
                }, 100);
            });
        });
    });

    describe('Form Data Management', () => {
        it('debería incluir datos de checkboxes en el envío', (done) => {
            authService.getCurrentUser = jest.fn().mockReturnValue(null);
            customOrderService.createOrder = jest.fn().mockReturnValue({ success: true });
            
            renderComponent().then(() => {
                // Marcar algunos checkboxes
                const decoracionCheckbox = container.querySelector('input[name="decoracionTematica"]');
                const veganCheckbox = container.querySelector('input[name="vegano"]');
                
                if (decoracionCheckbox) decoracionCheckbox.checked = true;
                if (veganCheckbox) veganCheckbox.checked = true;
                
                // Disparar eventos
                [decoracionCheckbox, veganCheckbox].forEach(checkbox => {
                    if (checkbox) {
                        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });
                
                const form = container.querySelector('form');
                Object.defineProperty(form, 'checkValidity', { value: () => true });
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                
                setTimeout(() => {
                    expect(customOrderService.createOrder).toHaveBeenCalledWith(
                        expect.objectContaining({
                            decoracionTematica: true,
                            vegano: true,
                            colorPersonalizado: false,
                            frutasFrescas: false,
                            sinAzucar: false,
                            sinGluten: false
                        })
                    );
                    done();
                }, 100);
            });
        });

        it('debería incluir datos de producto seleccionado', (done) => {
            authService.getCurrentUser = jest.fn().mockReturnValue(null);
            customOrderService.createOrder = jest.fn().mockReturnValue({ success: true });
            
            renderComponent().then(() => {
                const productSelect = container.querySelector('select');
                
                if (productSelect && productSelect.options.length > 1) {
                    productSelect.value = productSelect.options[1].value;
                    productSelect.dispatchEvent(new Event('change', { bubbles: true }));
                }
                
                const form = container.querySelector('form');
                Object.defineProperty(form, 'checkValidity', { value: () => true });
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                
                setTimeout(() => {
                    expect(customOrderService.createOrder).toHaveBeenCalledWith(
                        expect.objectContaining({
                            productoCode: expect.any(String),
                            productoNombre: expect.any(String)
                        })
                    );
                    done();
                }, 100);
            });
        });
    });
});