// Pruebas unitarias para ValuesSection usando Jasmine
// Archivo: src/components/root/NosotrosComponents/ValuesSection.spec.js

import { render } from '@testing-library/react';
import ValuesSection from './ValuesSection';

describe('ValuesSection Component', () => {
  
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
  
  describe('Renderizado de valores', () => {
    
    it('debe renderizar el título de la sección', () => {
      render(<ValuesSection />, { container });
      
      const title = container.querySelector('h2');
      expect(title).toBeTruthy();
      expect(title.textContent).toContain('Valores');
    });
    
    it('debe renderizar múltiples valores', () => {
      render(<ValuesSection />, { container });
      
      // Buscar elementos que representen valores individuales
      const valueItems = container.querySelectorAll('.value-item, .values-card, [class*="value"]');
      expect(valueItems.length).toBeGreaterThan(1);
    });
    
    it('debe tener iconos para cada valor', () => {
      render(<ValuesSection />, { container });
      
      // Buscar iconos Font Awesome
      const icons = container.querySelectorAll('i[class*="fa"]');
      expect(icons.length).toBeGreaterThan(0);
    });
    
  });
  
  describe('Contenido de valores', () => {
    
    it('debe mostrar títulos descriptivos', () => {
      render(<ValuesSection />, { container });
      
      const headings = container.querySelectorAll('h3, h4');
      expect(headings.length).toBeGreaterThan(0);
      
      // Verificar que los títulos tienen contenido
      headings.forEach(heading => {
        expect(heading.textContent.trim().length).toBeGreaterThan(0);
      });
    });
    
    it('debe tener descripciones para los valores', () => {
      render(<ValuesSection />, { container });
      
      const descriptions = container.querySelectorAll('p');
      expect(descriptions.length).toBeGreaterThan(0);
    });
    
  });
  
  describe('Interactividad', () => {
    
    it('debe ser accesible con navegación por teclado', () => {
      render(<ValuesSection />, { container });
      
      // Verificar que no hay elementos que rompan la accesibilidad
      const focusableElements = container.querySelectorAll('button, [tabindex]');
      focusableElements.forEach(element => {
        expect(element.getAttribute('tabindex')).not.toBe('-1');
      });
    });
    
  });
  
});