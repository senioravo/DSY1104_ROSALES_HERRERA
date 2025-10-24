// Pruebas unitarias para MissionSection usando Jasmine
// Archivo: src/components/root/NosotrosComponents/MissionSection.spec.js

import { render } from '@testing-library/react';
import MissionSection from './MissionSection';

describe('MissionSection Component', () => {
  
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
  
  describe('Renderizado de contenido', () => {
    
    it('debe renderizar el título de la sección', () => {
      render(<MissionSection />, { container });
      
      const title = container.querySelector('h2');
      expect(title).toBeTruthy();
      expect(title.textContent).toContain('Misión');
    });
    
    it('debe renderizar contenido de misión', () => {
      render(<MissionSection />, { container });
      
      const content = container.querySelector('p');
      expect(content).toBeTruthy();
      expect(content.textContent.length).toBeGreaterThan(0);
    });
    
    it('debe tener estructura de sección', () => {
      render(<MissionSection />, { container });
      
      const section = container.querySelector('section');
      expect(section).toBeTruthy();
    });
    
  });
  
  describe('Estructura y estilos', () => {
    
    it('debe tener clases CSS apropiadas', () => {
      render(<MissionSection />, { container });
      
      // Verificar que tiene alguna clase identificadora
      const section = container.querySelector('section');
      expect(section.className.length).toBeGreaterThan(0);
    });
    
  });
  
});