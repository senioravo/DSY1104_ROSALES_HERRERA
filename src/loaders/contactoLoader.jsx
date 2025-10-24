export async function contactoLoader() {
    try {
        // Importar datos desde archivos JSON
        const [contactoData, sucursalesData, opcionesAsuntoData] = await Promise.all([
            import('../data/contacto.json'),
            import('../data/sucursales.json'),
            import('../data/opciones-asunto.json')
        ]);
        
        // Filtrar solo sucursales activas
        const sucursalesActivas = sucursalesData.default.filter(sucursal => sucursal.activa);
        
        return {
            contactInfo: contactoData.default,
            sucursales: sucursalesActivas,
            opcionesAsunto: opcionesAsuntoData.default,
            // Información adicional que podríamos usar
            metadata: {
                totalSucursales: sucursalesData.default.length,
                sucursalesActivas: sucursalesActivas.length,
                ultimaActualizacion: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error('Error cargando datos de contacto:', error);
        
        // Fallback en caso de error - datos por defecto
        return {
            contactInfo: [
                {
                    id: 1,
                    icon: "fas fa-phone",
                    title: "Teléfono",
                    info: "+56 2 2345 6789",
                    color: "var(--strawberry)"
                }
            ],
            sucursales: [
                {
                    id: 1,
                    nombre: "Sucursal Principal",
                    direccion: "Av. Principal 1234, Santiago",
                    telefono: "+56 2 2345 6789",
                    horarios: {
                        semana: "Lun - Sáb: 9:00 - 20:00",
                        domingo: "Dom: 10:00 - 18:00"
                    }
                }
            ],
            opcionesAsunto: [
                { id: 1, value: "consulta", label: "Consulta General" }
            ],
            metadata: {
                error: true,
                message: "Usando datos de respaldo"
            }
        };
    }
}