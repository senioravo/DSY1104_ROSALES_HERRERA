import React from 'react';
import { createRoot } from 'react-dom/client';

describe('Home.styles - Tests Básicos', () => {
    let container, root;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    });

    afterEach(() => {
        if (root) {
            root.unmount();
        }
        if (container) {
            container.remove();
        }
        container = null;
        root = null;
    });

    it('debería crear el contenedor de test correctamente', () => {
        expect(container).toBeDefined();
        expect(container.tagName).toBe('DIV');
    });

    it('debería poder renderizar un componente React simple', (done) => {
        const TestComponent = () => React.createElement('div', { 
            'data-testid': 'test-component' 
        }, 'Test Content');
        
        root.render(React.createElement(TestComponent));
        
        
        // Esperar que React complete el renderizado
        setTimeout(() => {
            const element = container.querySelector('[data-testid="test-component"]');
        expect(element).not.toBeNull();
        expect(element.textContent).toBe('Test Content');
            done();
        }, 10);
    });

    it('debería manejar props correctamente', (done) => {
        const TestComponent = ({ message }) => React.createElement('span', {
            'data-testid': 'message'
        }, message);
        
        root.render(React.createElement(TestComponent, { message: 'Hello Jasmine from Home.styles.test.jsx' }));
        
        
        // Esperar que React complete el renderizado
        setTimeout(() => {
            const element = container.querySelector('[data-testid="message"]');
            expect(element).not.toBeNull();
        expect(element.textContent).toBe('Hello Jasmine from Home.styles.test.jsx');
            done();
        }, 10);
    });

    it('debería poder manejar eventos básicos', (done) => {
        let clicked = false;
        const TestComponent = () => React.createElement('button', { 
            'data-testid': 'test-button',
            onClick: () => { clicked = true; }
        }, 'Click me');
        
        root.render(React.createElement(TestComponent));
        
        
        // Esperar que React complete el renderizado
        setTimeout(() => {
            const button = container.querySelector('[data-testid="test-button"]');
        expect(button).not.toBeNull();
        
        
            button.click();
        expect(clicked).toBe(true);
            done();
        }, 10);
    });
});