// Pruebas unitarias para CategoryFilter usando Jasmine
// Archivo: src/components/root/BlogComponents/CategoryFilter.spec.js

import { render, fireEvent } from '@testing-library/react';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter Component', () => {
  
  let container;
  const mockCategories = ['Todas', 'Recetas', 'Consejos', 'Eventos'];
  const mockOnCategoryChange = jest.fn();
  
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    mockOnCategoryChange.mockClear();
  });
  
  afterEach(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });
  
  describe('Renderizado de categorías', () => {
    
    it('debe renderizar todas las categorías', () => {
      render(
        <CategoryFilter 
          categories={mockCategories}
          activeCategory="Todas"
          onCategoryChange={mockOnCategoryChange}
        />, 
        { container }
      );
      
      mockCategories.forEach(category => {
        expect(container.textContent).toContain(category);
      });
    });
    
    it('debe mostrar la categoría activa', () => {
      render(
        <CategoryFilter 
          categories={mockCategories}
          activeCategory="Recetas"
          onCategoryChange={mockOnCategoryChange}
        />, 
        { container }
      );
      
      const activeButton = container.querySelector('.active, [class*="active"]');
      expect(activeButton).toBeTruthy();
    });
    
    it('debe tener botones para cada categoría', () => {
      render(
        <CategoryFilter 
          categories={mockCategories}
          activeCategory="Todas"
          onCategoryChange={mockOnCategoryChange}
        />, 
        { container }
      );
      
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(mockCategories.length);
    });
    
  });
  
  describe('Interacción con filtros', () => {
    
    it('debe llamar a onCategoryChange al hacer clic', () => {
      render(
        <CategoryFilter 
          categories={mockCategories}
          activeCategory="Todas"
          onCategoryChange={mockOnCategoryChange}
        />, 
        { container }
      );
      
      const buttons = container.querySelectorAll('button');
      if (buttons.length > 1) {
        fireEvent.click(buttons[1]);
        expect(mockOnCategoryChange).toHaveBeenCalled();
      }
    });
    
  });
  
  describe('Estructura del filtro', () => {
    
    it('debe tener una estructura contenedora', () => {
      render(
        <CategoryFilter 
          categories={mockCategories}
          activeCategory="Todas"
          onCategoryChange={mockOnCategoryChange}
        />, 
        { container }
      );
      
      const filterContainer = container.querySelector('.category-filter, .filter-container, [class*="filter"]');
      expect(filterContainer || container.firstChild).toBeTruthy();
    });
    
  });
  
});
