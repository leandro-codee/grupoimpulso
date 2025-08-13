# Migración de Seminarios - EventDate a Rango de Fechas

## ⚠️ Error "Invalid time value" - SOLUCIÓN

Si estás experimentando el error `Error: Invalid time value` al acceder a la página de administración de seminarios, esto se debe a que hay fechas inválidas o nulas en la base de datos. Sigue estos pasos para resolverlo:

### Paso 1: Verificar el estado actual
```bash
# Asegúrate de tener la variable de entorno MONGODB_URI configurada
export MONGODB_URI="tu_uri_de_mongodb"

# Verificar el estado actual de los seminarios
node scripts/check-seminars.js
```

### Paso 2: Ejecutar la migración
```bash
# Ejecutar el script de migración
node scripts/migrate-seminars.js
```

### Paso 3: Verificar que la migración fue exitosa
```bash
# Verificar el estado después de la migración
node scripts/check-seminars.js
```

## Resumen de Cambios

Se ha refactorizado el sistema de seminarios para usar un rango de fechas (`startDate` y `endDate`) en lugar de una fecha específica (`eventDate`). **Ahora solo se manejan fechas sin hora para mayor simplicidad.**

## Cambios Realizados

### 1. Tipos (Types)
- **Antes**: `eventDate: Date`
- **Después**: `startDate: Date` y `endDate: Date`

### 2. Formulario de Administración
- Se agregaron campos para fecha de inicio y fecha de fin (solo fecha, sin hora)
- Se implementó validación robusta para asegurar que las fechas sean válidas
- Se agregó campo para URL de video de YouTube
- Se corrigió el manejo de fechas inválidas o nulas

### 3. Páginas Públicas
- Se actualizó el formato de fecha para mostrar rangos
- Se mejoró el responsive del video de YouTube
- Se agregaron estilos CSS para evitar scroll horizontal

### 4. APIs
- Se actualizaron todos los endpoints para usar `startDate` y `endDate`
- Se mantiene la compatibilidad con el ordenamiento por fecha
- Las fechas se manejan solo como fechas (sin hora)

### 5. Páginas de Administración
- Se actualizaron todas las páginas para usar el nuevo formato de fechas
- Se corrigió el error "Invalid time value"

### 6. Videos Responsivos
- Se corrigió el responsive de videos de YouTube en la descripción completa
- Se eliminó el scroll horizontal en dispositivos móviles
- Los videos se adaptan automáticamente al ancho del contenedor
- **NUEVO**: Se creó un componente `SeminarDescription` que maneja videos de YouTube de manera responsiva en la página pública del seminario
- Los videos en la descripción ahora usan un wrapper responsivo que previene el desbordamiento horizontal

## Instrucciones de Migración

### Paso 1: Verificar el estado actual
```bash
node scripts/check-seminars.js
```

### Paso 2: Ejecutar el Script de Migración
```bash
# Asegúrate de tener la variable de entorno MONGODB_URI configurada
export MONGODB_URI="tu_uri_de_mongodb"

# Ejecutar el script de migración
node scripts/migrate-seminars.js
```

### Paso 3: Verificar la Migración
```bash
node scripts/check-seminars.js
```

El script migrará automáticamente todos los seminarios existentes:
- Los seminarios con `eventDate` se convertirán a tener `startDate` y `endDate`
- Por defecto, se asigna la misma fecha para inicio y fin (duración de 1 día)
- El campo `eventDate` se elimina de la base de datos
- Se maneian fechas inválidas de manera segura

### Paso 4: Actualizar Seminarios Existentes (Opcional)

Después de la migración, puedes editar manualmente los seminarios en el panel de administración para:
- Ajustar las fechas de inicio y fin según la duración real
- Agregar URLs de videos de YouTube
- Modificar otros campos según sea necesario

## Nuevas Funcionalidades

### 1. Rango de Fechas
- Los seminarios ahora pueden durar múltiples días
- Se muestra un formato de fecha más claro y legible
- Se valida que la fecha de fin sea posterior a la de inicio

### 2. Videos de YouTube
- Se puede agregar videos de YouTube a los seminarios
- El video es completamente responsivo en móviles
- Se evita el scroll horizontal en dispositivos móviles

### 3. Validaciones Mejoradas
- Validación de fechas en tiempo real
- Validación de cupos disponibles vs. totales
- Manejo robusto de fechas inválidas o nulas
- Mensajes de error más claros

## Estructura de Base de Datos

### Antes
```json
{
  "eventDate": "2024-01-15T10:00:00.000Z"
}
```

### Después
```json
{
  "startDate": "2024-01-15T00:00:00.000Z",
  "endDate": "2024-01-15T23:59:59.999Z"
}
```

**Nota**: Aunque internamente se almacenan con hora (para mantener compatibilidad), en el formulario solo se muestran y editan las fechas. La hora se asigna automáticamente:
- `startDate`: 00:00:00 (inicio del día)
- `endDate`: 23:59:59 (fin del día)

## Scripts Disponibles

### `scripts/check-seminars.js`
- Verifica el estado actual de los seminarios
- Identifica fechas inválidas
- Muestra estadísticas de migración

### `scripts/migrate-seminars.js`
- Migra automáticamente los seminarios
- Maneja fechas inválidas de manera segura
- Proporciona logging detallado

## Notas Importantes

1. **Backup**: Siempre haz un backup de tu base de datos antes de ejecutar la migración
2. **Variables de Entorno**: Asegúrate de que `MONGODB_URI` esté configurada correctamente
3. **Testing**: Prueba la funcionalidad en un entorno de desarrollo antes de aplicar en producción
4. **Rollback**: Si algo sale mal, puedes restaurar desde el backup
5. **Fechas Inválidas**: El sistema ahora maneja fechas inválidas de manera robusta

## Solución de Problemas

### Error "Invalid time value"
- Ejecuta `node scripts/check-seminars.js` para identificar fechas problemáticas
- Ejecuta `node scripts/migrate-seminars.js` para migrar los datos
- Verifica que la migración fue exitosa

### Fechas en formato incorrecto
- El sistema ahora valida fechas antes de procesarlas
- Se muestran mensajes de error claros para fechas inválidas
- Se pueden editar manualmente las fechas problemáticas

### Videos de YouTube en descripción causan scroll horizontal
- **SOLUCIONADO**: Se creó el componente `SeminarDescription` que envuelve automáticamente los videos de YouTube
- Los videos ahora usan un wrapper responsivo con `padding-bottom: 56.25%` para mantener proporción 16:9
- Se eliminó completamente el scroll horizontal en dispositivos móviles
- Los videos se adaptan automáticamente al ancho del contenedor sin desbordarse

## Soporte

Si encuentras algún problema durante la migración, verifica:
- La conexión a MongoDB
- Los permisos de la base de datos
- Los logs del script de migración
- La compatibilidad de versiones de Node.js
- El estado de las fechas en la base de datos 