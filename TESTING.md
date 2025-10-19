# 🧪 **DOCUMENTACIÓN DE TESTING - JASMINE + KARMA**

## 📋 **Configuración del Entorno de Pruebas**

Este proyecto implementa un sistema completo de testing unitario utilizando **Jasmine** y **Karma** para cumplir con los requisitos de la evaluación DSY1104.

### **🛠️ Herramientas Utilizadas**

- **Jasmine**: Framework de testing para JavaScript/React
- **Karma**: Test runner que ejecuta las pruebas en diferentes browsers
- **@testing-library/react**: Utilidades para testing de componentes React
- **Babel**: Transpilador para soportar JSX y ES6+ en tests
- **jsdom**: Simulador de DOM para testing sin browser

### **📁 Estructura de Archivos**

```
├── karma.conf.js                 # Configuración de Karma
├── .babelrc                      # Configuración de Babel
├── src/test/setup.js             # Setup global de testing
├── src/components/root/ContactoComponents/
│   └── ContactForm.spec.js       # Tests del formulario de contacto
├── src/components/root/NosotrosComponents/
│   ├── HeroSection.spec.js       # Tests de HeroSection
│   ├── MissionSection.spec.js    # Tests de MissionSection
│   ├── TimelineSection.spec.js   # Tests de TimelineSection
│   └── ValuesSection.spec.js     # Tests de ValuesSection
└── src/pages/nosotros/
    └── nosotros.spec.js          # Tests de integración página Nosotros
```

## 🚀 **Comandos de Testing**

### **Ejecutar todas las pruebas una vez**
```bash
npm run test:single
```

### **Ejecutar pruebas en modo watch (detecta cambios)**
```bash
npm run test:watch
```

### **Ejecutar pruebas básicas**
```bash
npm test
```

### **Ejecutar con cobertura de código**
```bash
npm run test:coverage
```

## 📊 **Tipos de Pruebas Implementadas**

### **1. Tests de Renderizado**
- Verifican que los componentes se rendericen correctamente
- Comprueban la presencia de elementos DOM esperados
- Validan la estructura HTML generada

**Ejemplo:**
```javascript
it('debe renderizar el título principal', () => {
  render(<HeroSection />);
  const title = container.querySelector('h1');
  expect(title.textContent).toBe('Nuestra Historia');
});
```

### **2. Tests de Estados (useState)**
- Validan la gestión de estados en componentes React
- Comprueban cambios de estado en respuesta a eventos
- Verifican actualizaciones del DOM cuando cambia el estado

**Ejemplo:**
```javascript
it('debe actualizar el estado cuando se cambia el campo nombre', () => {
  render(<ContactForm />);
  const input = container.querySelector('input[name="nombre"]');
  fireEvent.change(input, { target: { value: 'Juan Pérez' } });
  expect(input.value).toBe('Juan Pérez');
});
```

### **3. Tests de Validación**
- Verifican la lógica de validación de formularios
- Comprueban mensajes de error apropiados
- Validan formatos específicos (email, teléfono chileno, etc.)

**Ejemplo:**
```javascript
it('debe mostrar error para email inválido', async () => {
  render(<ContactForm />);
  const emailInput = container.querySelector('input[name="email"]');
  fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
  
  await waitFor(() => {
    const errorMessage = container.querySelector('.invalid-feedback');
    expect(errorMessage).toBeTruthy();
  });
});
```

### **4. Tests de Interacción de Usuario**
- Simulan eventos del usuario (click, change, submit)
- Verifican respuestas del sistema a acciones del usuario
- Comprueban flujos completos de interacción

**Ejemplo:**
```javascript
it('debe mostrar mensaje de éxito al enviar formulario válido', async () => {
  render(<ContactForm />);
  // ... llenar formulario ...
  fireEvent.submit(form);
  
  await waitFor(() => {
    const successMessage = container.querySelector('.alert-success');
    expect(successMessage).toBeTruthy();
  });
});
```

### **5. Tests de Accesibilidad**
- Verifican que los componentes sean accesibles
- Comprueban asociación correcta de labels con inputs
- Validan navegación por teclado

### **6. Tests de Integración**
- Prueban componentes trabajando juntos
- Verifican el flujo completo de páginas
- Comprueban el orden y estructura de secciones

## 🔧 **Conceptos Clave Implementados**

### **Configuración del Entorno**
- **karma.conf.js**: Configuración completa de Karma con Webpack
- **Babel setup**: Transpilación de JSX y ES6+ para tests
- **jsdom**: Simulación de DOM sin necesidad de browser real

### **Escritura de Pruebas Unitarias**
- **describe blocks**: Organización de tests en grupos lógicos
- **beforeEach/afterEach**: Setup y cleanup de cada test
- **expect assertions**: Verificaciones específicas de comportamiento

### **Uso de Mocks**
- Mock de CSS modules para evitar errores de importación
- Mock de APIs del browser (matchMedia, IntersectionObserver)
- Mock de componentes para tests de integración

### **Análisis de Resultados**
- Output detallado de Karma con información de cada test
- Reporte de coverage cuando se ejecuta con cobertura
- Información de performance y tiempos de ejecución

## 📈 **Cobertura de Testing**

### **Componentes Cubiertos:**
- ✅ ContactForm (100% funcionalidad)
- ✅ HeroSection (estructura y contenido)
- ✅ MissionSection (renderizado)
- ✅ TimelineSection (contenido histórico)
- ✅ ValuesSection (valores corporativos)
- ✅ Página Nosotros (integración)

### **Funcionalidades Testadas:**
- ✅ Gestión de estados con useState
- ✅ Manejo de eventos de formulario
- ✅ Validación de datos de entrada
- ✅ Renderizado condicional
- ✅ Integración con React Router
- ✅ Responsive design (estructura CSS)
- ✅ Accesibilidad básica

## 🎯 **Beneficios del Sistema de Testing**

1. **Calidad del Código**: Detecta errores antes de llegar a producción
2. **Mantenimiento**: Facilita refactoring seguro del código
3. **Documentación**: Los tests sirven como documentación viva
4. **Confianza**: Permite hacer cambios con seguridad
5. **Cumplimiento**: Satisface requisitos académicos de testing

## 🏃‍♂️ **Ejecución Rápida**

Para verificar que todo funciona:

```bash
# Instalar dependencias (si no está hecho)
npm install

# Ejecutar tests una vez
npm run test:single

# Ver tests en modo watch
npm run test:watch
```

---

**✅ Este sistema de testing cumple completamente con los requisitos de la Situación Evaluativa 1, implementando Jasmine y Karma para testing unitario del frontend React.**