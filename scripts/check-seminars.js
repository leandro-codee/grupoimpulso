const { MongoClient } = require('mongodb');

async function checkSeminars() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Conectado a MongoDB');

    const db = client.db('grupo-impulso');
    const seminarsCollection = db.collection('seminars');

    // Obtener todos los seminarios
    const seminars = await seminarsCollection.find({}).toArray();
    console.log(`\n=== ESTADO ACTUAL DE SEMINARIOS ===`);
    console.log(`Total de seminarios: ${seminars.length}`);

    let withEventDate = 0;
    let withStartEndDate = 0;
    let withBoth = 0;
    let withNeither = 0;
    let invalidDates = 0;

    for (const seminar of seminars) {
      const hasEventDate = !!seminar.eventDate;
      const hasStartDate = !!seminar.startDate;
      const hasEndDate = !!seminar.endDate;
      
      console.log(`\n📋 ${seminar.title}`);
      console.log(`  ID: ${seminar._id}`);
      console.log(`  eventDate: ${seminar.eventDate || 'NO'}`);
      console.log(`  startDate: ${seminar.startDate || 'NO'}`);
      console.log(`  endDate: ${seminar.endDate || 'NO'}`);

      // Verificar fechas válidas
      if (seminar.eventDate) {
        try {
          const eventDate = new Date(seminar.eventDate);
          if (isNaN(eventDate.getTime())) {
            console.log(`  ❌ eventDate inválido: ${seminar.eventDate}`);
            invalidDates++;
          } else {
            console.log(`  ✅ eventDate válido: ${eventDate.toISOString()}`);
          }
        } catch (error) {
          console.log(`  ❌ Error validando eventDate: ${error.message}`);
          invalidDates++;
        }
      }

      if (seminar.startDate) {
        try {
          const startDate = new Date(seminar.startDate);
          if (isNaN(startDate.getTime())) {
            console.log(`  ❌ startDate inválido: ${seminar.startDate}`);
            invalidDates++;
          } else {
            console.log(`  ✅ startDate válido: ${startDate.toISOString()}`);
          }
        } catch (error) {
          console.log(`  ❌ Error validando startDate: ${error.message}`);
          invalidDates++;
        }
      }

      if (seminar.endDate) {
        try {
          const endDate = new Date(seminar.endDate);
          if (isNaN(endDate.getTime())) {
            console.log(`  ❌ endDate inválido: ${seminar.endDate}`);
            invalidDates++;
          } else {
            console.log(`  ✅ endDate válido: ${endDate.toISOString()}`);
          }
        } catch (error) {
          console.log(`  ❌ Error validando endDate: ${error.message}`);
          invalidDates++;
        }
      }

      // Contar tipos
      if (hasEventDate && hasStartDate && hasEndDate) {
        withBoth++;
      } else if (hasEventDate && !hasStartDate && !hasEndDate) {
        withEventDate++;
      } else if (!hasEventDate && hasStartDate && hasEndDate) {
        withStartEndDate++;
      } else {
        withNeither++;
      }
    }

    console.log(`\n=== RESUMEN ===`);
    console.log(`- Con solo eventDate: ${withEventDate}`);
    console.log(`- Con solo startDate/endDate: ${withStartEndDate}`);
    console.log(`- Con ambos: ${withBoth}`);
    console.log(`- Sin fechas: ${withNeither}`);
    console.log(`- Fechas inválidas: ${invalidDates}`);

    if (withEventDate > 0) {
      console.log(`\n⚠️ Hay ${withEventDate} seminarios que necesitan migración`);
    }

    if (invalidDates > 0) {
      console.log(`\n❌ Hay ${invalidDates} fechas inválidas que requieren atención`);
    }

    if (withStartEndDate > 0) {
      console.log(`\n✅ Hay ${withStartEndDate} seminarios ya migrados correctamente`);
    }

  } catch (error) {
    console.error('Error durante la verificación:', error);
  } finally {
    await client.close();
    console.log('\nConexión cerrada');
  }
}

// Ejecutar la verificación
checkSeminars().catch(console.error); 