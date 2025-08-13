const { MongoClient } = require('mongodb');

async function migrateSeminars() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Conectado a MongoDB');

    const db = client.db('grupo-impulso');
    const seminarsCollection = db.collection('seminars');

    // Obtener todos los seminarios
    const seminars = await seminarsCollection.find({}).toArray();
    console.log(`Encontrados ${seminars.length} seminarios para revisar`);

    let migratedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const seminar of seminars) {
      try {
        console.log(`\nProcesando: ${seminar.title} (ID: ${seminar._id})`);
        
        // Solo migrar si tiene eventDate y no tiene startDate/endDate
        if (seminar.eventDate && !seminar.startDate && !seminar.endDate) {
          console.log(`  - Tiene eventDate: ${seminar.eventDate}`);
          
          // Verificar que eventDate sea válido
          const eventDate = new Date(seminar.eventDate);
          if (isNaN(eventDate.getTime())) {
            console.log(`  - ERROR: eventDate inválido: ${seminar.eventDate}`);
            errorCount++;
            continue;
          }
          
          // Crear startDate y endDate basados en eventDate
          // Por defecto, el seminario dura 1 día
          const startDate = new Date(eventDate);
          startDate.setHours(0, 0, 0, 0); // Inicio del día
          
          const endDate = new Date(eventDate);
          endDate.setHours(23, 59, 59, 999); // Fin del día

          console.log(`  - Creando startDate: ${startDate.toISOString()}`);
          console.log(`  - Creando endDate: ${endDate.toISOString()}`);

          // Actualizar el documento
          const result = await seminarsCollection.updateOne(
            { _id: seminar._id },
            {
              $set: {
                startDate: startDate,
                endDate: endDate,
              },
              $unset: {
                eventDate: ""
              }
            }
          );

          if (result.modifiedCount > 0) {
            console.log(`  - ✅ Migrado exitosamente`);
            migratedCount++;
          } else {
            console.log(`  - ⚠️ No se modificó el documento`);
            errorCount++;
          }
        } else if (seminar.startDate && seminar.endDate) {
          console.log(`  - Ya migrado (tiene startDate y endDate)`);
          skippedCount++;
        } else if (!seminar.eventDate) {
          console.log(`  - No tiene eventDate`);
          skippedCount++;
        } else {
          console.log(`  - Estado mixto, requiere revisión manual`);
          errorCount++;
        }
      } catch (error) {
        console.error(`  - ❌ Error procesando seminario:`, error);
        errorCount++;
      }
    }

    console.log(`\n=== RESUMEN DE MIGRACIÓN ===`);
    console.log(`- Seminarios migrados: ${migratedCount}`);
    console.log(`- Seminarios omitidos: ${skippedCount}`);
    console.log(`- Errores encontrados: ${errorCount}`);
    console.log(`- Total procesados: ${seminars.length}`);

    if (errorCount > 0) {
      console.log(`\n⚠️ Se encontraron ${errorCount} errores. Revisa los logs arriba.`);
    }

  } catch (error) {
    console.error('Error durante la migración:', error);
  } finally {
    await client.close();
    console.log('\nConexión cerrada');
  }
}

// Ejecutar la migración
migrateSeminars().catch(console.error); 