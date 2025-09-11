# Mil Sabores – Requisitos del Sistema

Este repositorio documenta los requisitos funcionales y no funcionales del sistema *Mil Sabores*, definidos para guiar su diseño, implementación y verificación. Cada requisito está codificado de forma unívoca y clasificado por módulo, escenario y tipo.

---

##  Tabla de Requisitos

| ID      | Vista / Módulo | Página / Mockup           | Caso (escenario)                                      | Tipo              |
|---------|----------------|----------------------------|--------------------------------------------------------|-------------------|
| PS-000  | Base UI        | Guía de Estilos            | Variables de color pastel y tokens tipográficos        | No Funcional      |
| PS-001  | Base UI        | Responsive / Accesibilidad | Breakpoints + foco visible + landmarks                 | No Funcional      |
| PS-010  | Tienda         | HOME                       | Navbar con logo y contador de carrito                  | Funcional         |
| PS-011  | Tienda         | HOME                       | Hero aniversario 50 años + CTA                         | Funcional         |
| PS-012  | Tienda         | HOME                       | Categorías destacadas (tiles)                          | Funcional         |
| PS-020  | Tienda         | Productos                  | Estructura de datos de productos                       | Funcional         |
| PS-021  | Tienda         | Productos                  | Filtros combinables                                    | Funcional         |
| PS-022  | Tienda         | Productos                  | Búsqueda y orden                                       | Funcional         |
| PS-023  | Tienda         | Card de producto           | Card con badges y botón ‘Añadir’                       | Funcional         |
| PS-030  | Tienda         | Detalle producto           | Render completo + estados de stock                     | Funcional         |
| PS-031  | Tienda         | Detalle producto           | Personalización del mensaje                            | Funcional         |
| PS-032  | Tienda         | Detalle producto           | Selector de tamaño + cantidad                          | Funcional         |
| PS-040  | Tienda         | Carrito                    | Módulo CRUD con localStorage                           | Funcional         |
| PS-041  | Tienda         | Carrito                    | Resumen con subtotales y total                         | Funcional         |
| PS-042  | Tienda         | Carrito                    | Cálculo de descuentos (UI)                             | Funcional         |
| PS-050  | Tienda         | Registro                   | Formulario con beneficios                              | Funcional         |
| PS-051  | Tienda         | Login                      | Acceso y sesión mock                                   | Funcional         |
| PS-052  | Tienda         | Perfil                     | Preferencias y datos                                   | Funcional         |
| PS-060  | Contenido      | Recetas/Blog               | Listado de artículos                                   | Funcional         |
| PS-061  | Contenido      | Recetas/Blog Detalle       | Artículo completo                                      | Funcional         |
| PS-070  | Tienda         | Nosotros                   | Historia y hito Guinness 1995                          | Funcional         |
| PS-080  | Social         | Compartir                  | Botones de compartir                                   | Funcional         |
| PS-090  | QA             | Definición de Hecho        | Checklist Accesibilidad                                | No Funcional      |
| PS-091  | QA             | Definición de Hecho        | Responsive 3 breakpoints                               | No Funcional      |

---

##  Notas Técnicas

- Los requisitos funcionales están alineados con los mockups y el Anexo 1 del proyecto.
- Los requisitos no funcionales aseguran accesibilidad, estética pastel y consistencia técnica.
- La codificación permite trazabilidad directa entre el ERS, el código fuente y los criterios de evaluación académica.

---

##  Autoría y Colaboración

Este repositorio forma parte del desarrollo académico del módulo DSY1104.  
Desarrollado por **Luis Rosales** y **Diego Herrera** , con integración modular, validaciones estrictas y documentación técnica estructurada.

