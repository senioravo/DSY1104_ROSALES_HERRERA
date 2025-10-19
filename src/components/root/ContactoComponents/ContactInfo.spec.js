// Pruebas unitarias para ContactInfo usando Jasmine
// Archivo: src/components/root/ContactoComponents/ContactInfo.spec.js

import { render } from '@testing-library/react';
import ContactInfo from './ContactInfo';

describe('ContactInfo Component', () => {
  
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
  
  describe('Renderizado de información de contacto', () => {
    
    it('debe renderizar la sección de información', () => {
      render(<ContactInfo />, { container });
      
      const section = container.querySelector('section');
      expect(section).toBeTruthy();
    });
    
    it('debe mostrar información de dirección', () => {
      render(<ContactInfo />, { container });
      
      const content = container.textContent;
      expect(content).toContain('Dirección');
    });
    
    it('debe mostrar información de teléfono', () => {
      render(<ContactInfo />, { container });
      
      const content = container.textContent;
      expect(content).toContain('Teléfono');
    });
    
    it('debe mostrar información de email', () => {
      render(<ContactInfo />, { container });
      
      const content = container.textContent;
      expect(content).toContain('Email');
    });
    
    it('debe tener iconos Font Awesome', () => {
      render(<ContactInfo />, { container });
      
      const icons = container.querySelectorAll('i[class*="fa"]');
      expect(icons.length).toBeGreaterThan(0);
    });
    
  });
  
  describe('Estructura de tarjetas de información', () => {
    
    it('debe tener múltiples tarjetas de información', () => {
      render(<ContactInfo />, { container });
      
      // Buscar elementos que representen tarjetas de contacto
      const cards = container.querySelectorAll('.contact-card, .info-card, [class*="card"]');
      expect(cards.length).toBeGreaterThan(1);
    });
    
    it('debe tener estructura semántica correcta', () => {
      render(<ContactInfo />, { container });
      
      const section = container.querySelector('section');
      expect(section).toBeTruthy();
      
      const containerDiv = section.querySelector('.container');
      expect(containerDiv).toBeTruthy();
    });
    
  });
  
  describe('Datos de contacto', () => {
    
    it('debe incluir datos válidos', () => {
      render(<ContactInfo />, { container });
      
      const text = container.textContent;
      
      // Verificar que hay contenido significativo
      expect(text.length).toBeGreaterThan(50);
    });
    
    it('debe tener títulos para cada tipo de información', () => {
      render(<ContactInfo />, { container });
      
      const headings = container.querySelectorAll('h3, h4, h5');
      expect(headings.length).toBeGreaterThan(0);
    });
    
  });
  
});
