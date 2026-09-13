# 🧪 Panel de Pruebas de API - Mil Sabores

Sistema completo de pruebas para verificar la comunicación con la base de datos de todos los microservicios.

## 🚀 Acceso Rápido

### **Panel Principal**
```
http://localhost:5173/test-api
```

### **Paneles Individuales**
- **Usuarios:** http://localhost:5173/test-usuarios
- **Productos:** http://localhost:5173/test-productos
- **Carrito:** http://localhost:5173/test-carrito
- **Ventas:** http://localhost:5173/test-ventas

---

## 📋 Test de Usuarios

### **Funcionalidades:**
- ✅ Registrar nuevo usuario
- ✅ Iniciar sesión (Login)
- ✅ Cerrar sesión (Logout)
- ✅ Obtener todos los usuarios
- ✅ Buscar usuario por ID
- ✅ Actualizar usuario (PUT completo)
- ✅ Actualizar usuario (PATCH parcial)
- ✅ Eliminar usuario (desactivar)

### **Flujo de prueba recomendado:**
1. Registra un usuario nuevo
2. Verifica que aparezca en la lista
3. Inicia sesión con ese usuario
4. Actualiza algún dato
5. Cierra sesión

---

## 📦 Test de Productos

### **Funcionalidades:**
- ✅ Ver todos los productos
- ✅ Ver productos destacados
- ✅ Buscar por nombre
- ✅ Filtrar por categoría
- ✅ Buscar por código
- ✅ Crear nuevo producto
- ✅ Actualizar producto completo (PUT)
- ✅ Actualizar solo stock (PATCH)
- ✅ Eliminar producto

### **Flujo de prueba recomendado:**
1. Ver todos los productos existentes
2. Crear un producto de prueba
3. Buscar el producto por código
4. Actualizar su stock
5. Eliminarlo cuando termines

---

## 🛒 Test de Carrito

### **Funcionalidades:**
- ✅ Ver carrito del usuario actual
- ✅ Consultar carrito por Usuario ID
- ✅ Agregar item al carrito
- ✅ Actualizar cantidad de un item
- ✅ Eliminar item específico
- ✅ Vaciar todo el carrito
- ✅ Obtener total del carrito
- ✅ Obtener cantidad de items

### **Flujo de prueba recomendado:**
1. Inicia sesión primero (en Test de Usuarios)
2. Agrega un producto al carrito
3. Actualiza su cantidad
4. Verifica el total
5. Vacía el carrito

**⚠️ Importante:** Debes estar autenticado para usar el carrito.

---

## 🧾 Test de Ventas

### **Funcionalidades:**
- ✅ Ver todas las ventas
- ✅ Buscar venta por ID
- ✅ Filtrar ventas por Usuario
- ✅ Filtrar ventas por Estado
- ✅ Crear nueva venta
- ✅ Actualizar estado de venta (PATCH)
- ✅ Eliminar venta

### **Estados disponibles:**
- `PENDIENTE` - Venta recién creada
- `CONFIRMADA` - Venta confirmada
- `EN_PREPARACION` - Preparando pedido
- `EN_CAMINO` - En ruta de entrega
- `ENTREGADA` - Entregado al cliente
- `CANCELADA` - Venta cancelada

### **Flujo de prueba recomendado:**
1. Inicia sesión primero
2. Crea una venta con items de prueba
3. Verifica que aparezca en la lista
4. Actualiza su estado
5. Consulta por estado

---

## 🔧 Configuración de Microservicios

### **Puertos de los servicios:**
| Servicio | Puerto | Swagger UI |
|----------|--------|------------|
| Usuario | 8081 | http://localhost:8081/swagger-ui.html |
| Producto | 8082 | http://localhost:8082/swagger-ui.html |
| Carrito | 8083 | http://localhost:8083/swagger-ui.html |
| Ventas | 8084 | http://localhost:8084/swagger-ui.html |

### **Iniciar servicios:**

**Opción 1: Todos a la vez** (desde BackendMilSabores)
```powershell
.\run-all-services.ps1
```

**Opción 2: Individual** (desde cada carpeta)
```powershell
# Usuario
cd usuario-service
.\gradlew bootRun

# Producto
cd producto-service
.\gradlew bootRun

# Carrito
cd carrito-service
.\gradlew bootRun

# Ventas
cd ventas-service
.\gradlew bootRun
```

---

## 🗄️ Base de Datos

**PostgreSQL en Neon**
- Base de datos: `milsabores`
- Todas las tablas están en el mismo esquema
- Cada microservicio accede a sus propias tablas

### **Verificar conexión:**
1. Abre cualquier test
2. Click en "Probar Conexión con BD"
3. Si ves datos, la conexión funciona ✅

---

## 💡 Consejos de Uso

### **Para desarrollo:**
1. Usa el panel principal (`/test-api`) como punto de partida
2. Guarda los IDs de los registros que crees para probarlos después
3. Los usuarios de prueba se guardan en la BD real

### **Para depurar errores:**
1. Revisa la consola del navegador (F12)
2. Verifica que el servicio esté corriendo
3. Revisa los logs del microservicio en la terminal
4. Usa Swagger UI para comparar respuestas

### **Orden recomendado de pruebas:**
1. **Usuarios** → Crea y autentica un usuario
2. **Productos** → Verifica que hay productos
3. **Carrito** → Prueba agregar productos
4. **Ventas** → Crea una venta completa

---

## 🎯 Casos de Uso Comunes

### **Caso 1: Verificar que la BD está conectada**
1. Ve a http://localhost:5173/test-usuarios
2. Click en "Ver Todos los Usuarios"
3. Si ves la lista, la conexión funciona ✅

### **Caso 2: Probar flujo completo de compra**
1. Registra un usuario → `/test-usuarios`
2. Crea productos → `/test-productos`
3. Agrégalos al carrito → `/test-carrito`
4. Crea una venta → `/test-ventas`

### **Caso 3: Actualizar stock después de una venta**
1. Ve a `/test-productos`
2. Busca el producto por código
3. Usa "Actualizar Stock" con el nuevo valor
4. Verifica el cambio en la lista

---

## 🐛 Solución de Problemas

### **Error: "Usuario no autenticado"**
- Solución: Inicia sesión en `/test-usuarios` primero

### **Error: "Error al obtener..."**
- Verifica que el microservicio esté corriendo
- Revisa el puerto correcto
- Mira los logs del servicio

### **Error: "CORS"**
- Los servicios ya están configurados para `localhost:5173`
- Asegúrate de usar el puerto correcto

### **No aparecen datos**
- Verifica la conexión a la BD en el servicio
- Revisa las variables de entorno
- Ejecuta el script de schema.sql si es necesario

---

## 📚 Recursos Adicionales

- **Swagger UI:** Documentación interactiva de cada API
- **Script PowerShell:** `test-productos-api.ps1` en BackendMilSabores
- **README Backend:** `BackendMilSabores/README.md`

---

## ✅ Checklist de Verificación

Antes de considerar que todo funciona:

- [ ] Puedo registrar un usuario
- [ ] Puedo iniciar sesión
- [ ] Puedo ver todos los productos
- [ ] Puedo crear un producto nuevo
- [ ] Puedo agregar productos al carrito
- [ ] Puedo ver el total del carrito
- [ ] Puedo crear una venta
- [ ] Puedo actualizar el estado de una venta

Si todos están ✅, tu conexión con la BD funciona perfectamente! 🎉
