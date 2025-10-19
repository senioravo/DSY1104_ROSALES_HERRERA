// Pruebas de integración para la página Contacto usando Jasmine
// Archivo: src/pages/contacto/contacto.spec.js

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contacto from './index';

// Mock de componentes para evitar errores de importación
jest.mock('../../components/root/ContactoComponents', () => ({
  ContactoHero: () => <div data-testid="contacto-hero">Contacto Hero</div>,
  ContactForm: () => <div data-testid="contact-form">Contact Form</div>,
  ContactInfo: () => <div data-testid="contact-info">Contact Info</div>
}));

const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe('Página Contacto - Integración', () => {
  
  let container;
  
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });
  
  describe('Estructura de la página', () => {
    
    it('debe renderizar el elemento principal main', () => {
      render(
        <RouterWrapper>
          <Contacto />
        </RouterWrapper>, 
        { container }
      );
      
      const main = container.querySelector('main');
      expect(main).toBeTruthy();
    });
    
    it('debe tener la clase CSS correcta', () => {
      render(
        <RouterWrapper>
          <Contacto />
        </RouterWrapper>, 
        { container }
      );
      
      const main = container.querySelector('main.contacto-page');
      expect(main).toBeTruthy();
    });
    
    it('debe renderizar todas las secciones principales', () => {
      render(
        <RouterWrapper>
          <Contacto />
        </RouterWrapper>, 
        { container }
      );
      
      const hero = container.querySelector('[data-testid="contacto-hero"]');
      const form = container.querySelector('[data-testid="contact-form"]');
      const info = container.querySelector('[data-testid="contact-info"]');
      
      expect(hero).toBeTruthy();
      expect(form).toBeTruthy();
      expect(info).toBeTruthy();
    });
    
  });
  
  describe('Orden de componentes', () => {
    
    it('debe mostrar los componentes en el orden correcto', () => {
      render(
        <RouterWrapper>
          <Contacto />
        </RouterWrapper>, 
        { container }
      );
      
      const main = container.querySelector('main');
      const sections = Array.from(main.children);
      
      expect(sections.length).toBe(3);
      expect(sections[0].getAttribute('data-testid')).toBe('contacto-hero');
      expect(sections[1].getAttribute('data-testid')).toBe('contact-form');
      expect(sections[2].getAttribute('data-testid')).toBe('contact-info');
    });
    
  });
  
  describe('Accesibilidad', () => {
    
    it('debe usar elemento semántico main', () => {
      render(
        <RouterWrapper>
          <Contacto />
        </RouterWrapper>, 
        { container }
      );
      
      const main = container.querySelector('main');
      expect(main.tagName).toBe('MAIN');
    });
    
    it('debe tener estructura jerárquica correcta', () => {
      render(
        <RouterWrapper>
          <Contacto />
        </RouterWrapper>, 
        { container }
      );
      
      const main = container.querySelector('main');
      expect(main.children.length).toBeGreaterThan(0);
    });
    
  });
  
});
