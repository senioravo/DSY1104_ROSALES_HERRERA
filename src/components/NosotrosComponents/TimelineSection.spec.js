// Pruebas unitarias para TimelineSection usando Jasmine
// Archivo: src/components/root/NosotrosComponents/TimelineSection.spec.js

import { render } from '@testing-library/react';
import TimelineSection from './TimelineSection';

describe('TimelineSection Component', () => {
  
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
  
  describe('Renderizado de timeline', () => {
    
    it('debe renderizar el título de la sección', () => {
      render(<TimelineSection />, { container });
      
      const title = container.querySelector('h2');
      expect(title).toBeTruthy();
      expect(title.textContent).toContain('Historia');
    });
    
    it('debe renderizar elementos de timeline', () => {
      render(<TimelineSection />, { container });
      
      // Buscar elementos que podrían ser parte del timeline
      const timelineItems = container.querySelectorAll('.timeline-item, .timeline-event, [class*="timeline"]');
      expect(timelineItems.length).toBeGreaterThan(0);
    });
    
    it('debe tener estructura de sección', () => {
      render(<TimelineSection />, { container });
      
      const section = container.querySelector('section');
      expect(section).toBeTruthy();
    });
    
  });
  
  describe('Contenido de timeline', () => {
    
    it('debe mostrar información histórica', () => {
      render(<TimelineSection />, { container });
      
      // Verificar que hay contenido de texto
      const textContent = container.textContent;
      expect(textContent.length).toBeGreaterThan(50);
    });
    
    it('debe tener elementos con fechas o años', () => {
      render(<TimelineSection />, { container });
      
      // Buscar patrones de años (4 dígitos)
      const textContent = container.textContent;
      const yearPattern = /\b(19|20)\d{2}\b/;
      expect(yearPattern.test(textContent)).toBeTruthy();
    });
    
  });
  
});