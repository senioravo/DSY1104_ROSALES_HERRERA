// Setup file para configurar el entorno de testing con Jasmine y React

// Mock para CSS modules
if (typeof global !== 'undefined') {
  global.CSS = {
    supports: () => false
  };
}

// Mock para window.matchMedia (para responsive testing)
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });

  // Mock para IntersectionObserver
  window.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  };
}

// Helper function para renderizar componentes en tests
if (typeof global !== 'undefined') {
  global.renderComponent = function(Component, props = {}) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    return {
      container,
      cleanup: () => {
        if (container.parentNode) {
          document.body.removeChild(container);
        }
      }
    };
  };
}

console.log('🧪 Entorno de testing configurado correctamente con Jasmine + React');