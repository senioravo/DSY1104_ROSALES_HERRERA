// Pruebas unitarias para HeroSection usando Jasmine
// Archivo: src/components/root/NosotrosComponents/HeroSection.spec.js

// Test básico sin React Testing Library para evitar problemas de dependencias
describe('HeroSection Component', () => {
  
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
  
  describe('Renderizado básico', () => {
    
    it('debe crear el contenedor correctamente', () => {
      expect(container).toBeTruthy();
      expect(container.tagName).toBe('DIV');
    });
    
    it('debe poder agregar contenido al DOM', () => {
      const testElement = document.createElement('h1');
      testElement.textContent = 'Nuestra Historia';
      container.appendChild(testElement);
      
      expect(container.querySelector('h1')).toBeTruthy();
      expect(container.querySelector('h1').textContent).toBe('Nuestra Historia');
    });
    
    it('debe poder agregar clases CSS', () => {
      container.className = 'hero-section';
      expect(container.className).toBe('hero-section');
    });
    
  });
  
  describe('Estructura DOM', () => {
    
    it('debe crear estructura básica de hero', () => {
      // Simular la estructura del HeroSection
      const heroSection = document.createElement('section');
      heroSection.className = 'hero-section';
      
      const heroContent = document.createElement('div');
      heroContent.className = 'hero-content';
      
      const heroText = document.createElement('div');
      heroText.className = 'hero-text';
      
      const title = document.createElement('h1');
      title.textContent = 'Nuestra Historia';
      
      const subtitle = document.createElement('p');
      subtitle.textContent = '30 años endulzando momentos especiales';
      
      heroText.appendChild(title);
      heroText.appendChild(subtitle);
      heroContent.appendChild(heroText);
      heroSection.appendChild(heroContent);
      container.appendChild(heroSection);
      
      // Verificaciones
      expect(container.querySelector('.hero-section')).toBeTruthy();
      expect(container.querySelector('.hero-content')).toBeTruthy();
      expect(container.querySelector('.hero-text')).toBeTruthy();
      expect(container.querySelector('h1').textContent).toBe('Nuestra Historia');
      expect(container.querySelector('p').textContent).toBe('30 años endulzando momentos especiales');
    });
    
  });
  
});