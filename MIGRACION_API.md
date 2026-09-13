# Migración Frontend Mil Sabores - Integración con Backend API REST

## 🔄 Cambios Realizados

Se ha refactorizado el frontend para consumir APIs REST del backend en lugar de usar datos locales.

### Servicios Actualizados:

1. **authService.js** - Ahora consume API de Usuario Service
2. **cartService.js** - Ahora consume API de Carrito Service
3. **productoService.js** - NUEVO - Consume API de Producto Service
4. **categoriaService.js** - NUEVO - Consume API de Producto Service (categorías)

### Archivos Nuevos:

- `src/config/api.config.js` - Configuración centralizada de URLs de APIs
- `.env.example` - Ejemplo de variables de entorno

## 🚀 Configuración

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` con las URLs de tus microservicios:

```properties
VITE_USUARIO_API_URL=http://localhost:8081/api
VITE_PRODUCTO_API_URL=http://localhost:8082/api
VITE_CARRITO_API_URL=http://localhost:8083/api
```

### 3. Asegurarse que el Backend está Corriendo

Antes de ejecutar el frontend, asegúrate de que los 3 microservicios estén corriendo:

- Usuario Service en puerto 8081
- Producto Service en puerto 8082
- Carrito Service en puerto 8083

### 4. Ejecutar el Frontend

```bash
npm run dev
```

## 📝 Guía de Migración de Código

### Cambios en authService

#### Antes (LocalStorage):
```javascript
const result = authService.register(email, password, nombre);
```

#### Ahora (API REST):
```javascript
const result = await authService.register(email, password, nombre);
```

**Nota:** Todas las funciones ahora son asíncronas y retornan Promesas.

### Cambios en cartService

#### Antes:
```javascript
const cart = cartService.getCart();
cartService.addToCart(product, quantity);
```

#### Ahora:
```javascript
const cart = await cartService.getCart();
await cartService.addToCart(product, quantity);
```

**Importante:** 
- `getCart()` ahora retorna solo el array de items, no todo el objeto del carrito
- Los items tienen estructura diferente (ver sección de Estructura de Datos)

### Uso de Nuevos Servicios

#### Productos:
```javascript
import { productoService } from './services/productoService';

// Obtener todos los productos
const productos = await productoService.getAll();

// Obtener producto por código
const producto = await productoService.getByCode('TC001');

// Obtener por categoría
const productos = await productoService.getByCategory('TC');

// Buscar por nombre
const productos = await productoService.searchByName('chocolate');

// Productos destacados
const destacados = await productoService.getFeatured(3);
```

#### Categorías:
```javascript
import { categoriaService } from './services/categoriaService';

// Obtener todas las categorías
const categorias = await categoriaService.getAll();

// Obtener categoría por ID
const categoria = await categoriaService.getById('TC');
```

## 📊 Estructura de Datos

### Usuario
```javascript
{
  id: 1,
  nombre: "Juan Pérez",
  email: "juan@example.com",
  fechaRegistro: "2024-01-15T10:30:00",
  activo: true
}
```

### Producto
```javascript
{
  code: "TC001",
  nombre: "Torta Cuadrada de Chocolate",
  categoria: {
    id: "TC",
    nombre: "Tortas Cuadradas",
    descripcion: "...",
    imagen: "PG.png"
  },
  tipoForma: "cuadrada",
  tamanosDisponibles: ["S (8 porciones)", "M (12 porciones)"],
  precioCLP: 45000,
  stock: 10,
  personalizable: true,
  maxMsgChars: 50,
  descripcion: "...",
  etiquetas: ["tradicional"],
  imagen: "TC001.png",
  activo: true
}
```

### Item del Carrito
```javascript
{
  id: 1,
  usuarioId: 1,
  productoCode: "TC001",
  productoNombre: "Torta Cuadrada de Chocolate",
  precioCLP: 45000,
  productoImagen: "TC001.png",
  cantidad: 2,           // Antes era "quantity"
  stockDisponible: 10,
  fechaAgregado: "2024-01-15T10:30:00",
  subtotal: 90000
}
```

**Cambios importantes:**
- `quantity` → `cantidad`
- `code` → `productoCode`
- `nombre` → `productoNombre`
- `imagen` → `productoImagen`
- Nuevo campo: `id` (ID del item en el carrito)
- Nuevo campo: `subtotal` (calculado por el backend)

## 🔧 Actualizar Componentes Existentes

### Ejemplo: Componente de Carrito

#### Antes:
```javascript
import { cartService } from '../services/cartService';

function Cart() {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    const items = cartService.getCart();
    setCart(items);
  }, []);

  const handleRemove = (productCode) => {
    cartService.removeFromCart(productCode);
    setCart(cartService.getCart());
  };

  return (
    <div>
      {cart.map(item => (
        <div key={item.code}>
          <h3>{item.nombre}</h3>
          <p>Cantidad: {item.quantity}</p>
          <button onClick={() => handleRemove(item.code)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
```

#### Ahora:
```javascript
import { cartService } from '../services/cartService';

function Cart() {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const items = await cartService.getCart();
      setCart(items);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await cartService.removeFromCart(itemId);
      await loadCart(); // Recargar carrito
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <div>
      {cart.map(item => (
        <div key={item.id}>
          <h3>{item.productoNombre}</h3>
          <p>Cantidad: {item.cantidad}</p>
          <p>Subtotal: ${item.subtotal}</p>
          <button onClick={() => handleRemove(item.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
```

### Ejemplo: Componente de Productos

```javascript
import { productoService } from '../services/productoService';
import { cartService } from '../services/cartService';

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const data = await productoService.getAll();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (producto) => {
    try {
      await cartService.addToCart(producto, 1);
      alert('Producto agregado al carrito');
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Error al agregar al carrito. Por favor, inicia sesión.');
    }
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div>
      {productos.map(producto => (
        <div key={producto.code}>
          <h3>{producto.nombre}</h3>
          <p>${producto.precioCLP}</p>
          <p>Stock: {producto.stock}</p>
          <button 
            onClick={() => handleAddToCart(producto)}
            disabled={producto.stock === 0}
          >
            Agregar al Carrito
          </button>
        </div>
      ))}
    </div>
  );
}
```

## ⚠️ Puntos Importantes

1. **Autenticación Requerida**: El carrito requiere que el usuario esté autenticado. Asegúrate de verificar la sesión antes de realizar operaciones del carrito.

2. **Manejo de Errores**: Todas las llamadas a la API pueden fallar. Siempre usa try/catch.

3. **Loading States**: Considera agregar estados de carga mientras se obtienen datos de la API.

4. **Eventos del Carrito**: El evento `cartUpdated` sigue funcionando igual, pero ahora debes recargar el carrito desde la API cuando se dispare.

5. **CORS**: Si encuentras errores de CORS, verifica que el backend tenga configurado correctamente los orígenes permitidos.

## 🧪 Testing

Para probar la integración:

1. Inicia todos los microservicios del backend
2. Verifica que puedes acceder a Swagger UI de cada servicio
3. Inicia el frontend
4. Prueba las siguientes operaciones:
   - Registrar un usuario
   - Iniciar sesión
   - Ver productos
   - Agregar productos al carrito
   - Ver carrito
   - Actualizar cantidades
   - Eliminar del carrito

## 📞 Soporte

Si encuentras problemas durante la migración, verifica:

1. Las URLs de los servicios en `.env.local`
2. Que todos los microservicios estén corriendo
3. La consola del navegador para errores de JavaScript
4. Las respuestas de la API en las herramientas de desarrollo del navegador

## 📚 Recursos

- [Documentación del Backend](../BackendMilSabores/README.md)
- [Guía de Inicio Rápido del Backend](../BackendMilSabores/QUICKSTART.md)
- [Swagger UI - Usuario Service](http://localhost:8081/swagger-ui.html)
- [Swagger UI - Producto Service](http://localhost:8082/swagger-ui.html)
- [Swagger UI - Carrito Service](http://localhost:8083/swagger-ui.html)
