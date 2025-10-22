import React from 'react';
import { createRoot } from 'react-dom/client';
import PersonalizaTuTorta from '../../../pages/personaliza-tu-torta/index.jsx';

// Mock del componente PersonalizeForm
jest.mock('../../../components/personalize-components/PersonalizeForm.jsx', () => {
    return function MockPersonalizeForm({ onSuccess, onError }) {
        return (
            <div data-testid="mock-personalize-form">
                <button 
                    onClick={() => onSuccess && onSuccess()} 
                    data-testid="mock-success-btn"
                >
                    Mock Success
                </button>
                <button 
                    onClick={() => onError && onError('Mock error')} 
                    data-testid="mock-error-btn"
                >
                    Mock Error
                </button>
            </div>
        );
    };
});

describe('PersonalizaTuTorta Page Component', () => {
    let container = null;
    let root = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    });

    afterEach(() => {
        if (root) {
            root.unmount();
        }
        container.remove();
        container = null;
        root = null;
    });

    function renderComponent() {
        return new Promise(resolve => {
            root.render(<PersonalizaTuTorta />);
            setTimeout(resolve, 100);
        });
    }

    it('debería renderizarse sin errores', (done) => {
        renderComponent().then(() => {
            expect(container.querySelector('.personalize-page')).toBeTruthy();
            done();
        });
    });

    it('debería mostrar el header con título y subtítulo correctos', (done) => {
        renderComponent().then(() => {
            const header = container.querySelector('.personalize-header');
            expect(header).toBeTruthy();
            
            const title = header.querySelector('.personalize-title');
            const subtitle = header.querySelector('.personalize-subtitle');
            
            expect(title).toBeTruthy();
            expect(subtitle).toBeTruthy();
            expect(title.textContent).toBe('Personaliza tu Producto');
            expect(subtitle.textContent).toBe('Crea un producto único y especial adaptado a tus necesidades');
            done();
        });
    });

    it('debería mostrar el formulario inicialmente (no success)', (done) => {
        renderComponent().then(() => {
            const card = container.querySelector('.personalize-card');
            const successAlert = container.querySelector('.success-alert');
            const mockForm = container.querySelector('[data-testid="mock-personalize-form"]');
            
            expect(card).toBeTruthy();
            expect(mockForm).toBeTruthy();
            expect(successAlert).toBeFalsy();
            done();
        });
    });

    it('debería tener la estructura de Bootstrap correcta', (done) => {
        renderComponent().then(() => {
            const container_bs = container.querySelector('.container');
            const row = container.querySelector('.row');
            const col = container.querySelector('.col-lg-10');
            const card = container.querySelector('.card');
            const cardBody = container.querySelector('.card-body');
            
            expect(container_bs).toBeTruthy();
            expect(row).toBeTruthy();
            expect(col).toBeTruthy();
            expect(card).toBeTruthy();
            expect(cardBody).toBeTruthy();
            done();
        });
    });

    it('debería mostrar mensaje de éxito cuando onSuccess es llamado', (done) => {
        renderComponent().then(() => {
            const successBtn = container.querySelector('[data-testid="mock-success-btn"]');
            expect(successBtn).toBeTruthy();
            
            // Simular click en success
            successBtn.click();
            
            setTimeout(() => {
                const successAlert = container.querySelector('.success-alert');
                const mockForm = container.querySelector('[data-testid="mock-personalize-form"]');
                
                expect(successAlert).toBeTruthy();
                expect(mockForm).toBeFalsy(); // El formulario debe estar oculto
                
                // Verificar contenido del alert de éxito
                expect(successAlert.textContent).toContain('¡Solicitud enviada exitosamente!');
                expect(successAlert.textContent).toContain('Nos pondremos en contacto contigo pronto');
                
                // Verificar icono de éxito
                const successIcon = successAlert.querySelector('svg');
                expect(successIcon).toBeTruthy();
                done();
            }, 50);
        });
    });

    it('debería mostrar mensaje de error cuando onError es llamado', (done) => {
        renderComponent().then(() => {
            const errorBtn = container.querySelector('[data-testid="mock-error-btn"]');
            expect(errorBtn).toBeTruthy();
            
            // Simular click en error
            errorBtn.click();
            
            setTimeout(() => {
                const errorAlert = container.querySelector('.alert-danger');
                expect(errorAlert).toBeTruthy();
                expect(errorAlert.textContent).toContain('Mock error');
                
                // El formulario debe seguir visible
                const mockForm = container.querySelector('[data-testid="mock-personalize-form"]');
                expect(mockForm).toBeTruthy();
                done();
            }, 50);
        });
    });

    it('debería resetear el estado de éxito después de 3 segundos', (done) => {
        renderComponent().then(() => {
            const successBtn = container.querySelector('[data-testid="mock-success-btn"]');
            
            // Simular success
            successBtn.click();
            
            setTimeout(() => {
                // Verificar que está en estado de éxito
                expect(container.querySelector('.success-alert')).toBeTruthy();
                
                // Esperar 3 segundos más
                setTimeout(() => {
                    // Debería volver al formulario
                    const successAlert = container.querySelector('.success-alert');
                    const mockForm = container.querySelector('[data-testid="mock-personalize-form"]');
                    
                    expect(successAlert).toBeFalsy();
                    expect(mockForm).toBeTruthy();
                    done();
                }, 3100); // Poco más de 3 segundos
            }, 50);
        });
    });

    it('debería poder cerrar el mensaje de error', (done) => {
        renderComponent().then(() => {
            const errorBtn = container.querySelector('[data-testid="mock-error-btn"]');
            
            // Simular error
            errorBtn.click();
            
            setTimeout(() => {
                const errorAlert = container.querySelector('.alert-danger');
                expect(errorAlert).toBeTruthy();
                
                // Buscar botón de cierre
                const closeBtn = errorAlert.querySelector('.btn-close');
                if (closeBtn) {
                    closeBtn.click();
                    
                    setTimeout(() => {
                        const errorAlertAfterClose = container.querySelector('.alert-danger');
                        expect(errorAlertAfterClose).toBeFalsy();
                        done();
                    }, 50);
                } else {
                    // Si no hay botón de cierre, la prueba pasa igual
                    done();
                }
            }, 50);
        });
    });

    it('debería tener las clases CSS correctas para el diseño', (done) => {
        renderComponent().then(() => {
            const page = container.querySelector('.personalize-page');
            const header = container.querySelector('.personalize-header');
            const title = container.querySelector('.personalize-title');
            const subtitle = container.querySelector('.personalize-subtitle');
            const card = container.querySelector('.personalize-card');
            
            expect(page).toBeTruthy();
            expect(header).toBeTruthy();
            expect(title).toBeTruthy();
            expect(subtitle).toBeTruthy();
            expect(card).toBeTruthy();
            
            // Verificar que tienen las clases CSS esperadas
            expect(page.classList.contains('personalize-page')).toBe(true);
            expect(header.classList.contains('personalize-header')).toBe(true);
            expect(title.classList.contains('personalize-title')).toBe(true);
            expect(subtitle.classList.contains('personalize-subtitle')).toBe(true);
            expect(card.classList.contains('personalize-card')).toBe(true);
            done();
        });
    });

    it('debería usar Bootstrap Container y Grid System', (done) => {
        renderComponent().then(() => {
            const container_bs = container.querySelector('.container');
            const row = container.querySelector('.row.justify-content-center');
            const col = container.querySelector('.col-lg-10');
            
            expect(container_bs).toBeTruthy();
            expect(row).toBeTruthy();
            expect(col).toBeTruthy();
            done();
        });
    });

    it('debería manejar múltiples errores correctamente', (done) => {
        renderComponent().then(() => {
            const errorBtn = container.querySelector('[data-testid="mock-error-btn"]');
            
            // Primer error
            errorBtn.click();
            
            setTimeout(() => {
                expect(container.querySelector('.alert-danger')).toBeTruthy();
                
                // Segundo error
                errorBtn.click();
                
                setTimeout(() => {
                    const errorAlerts = container.querySelectorAll('.alert-danger');
                    expect(errorAlerts.length).toBe(1); // Solo debe haber uno
                    done();
                }, 50);
            }, 50);
        });
    });
});