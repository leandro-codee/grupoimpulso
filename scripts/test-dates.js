const { MongoClient } = require('mongodb');

async function testDates() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Conectado a MongoDB');

    const db = client.db('grupo-impulso');
    const seminarsCollection = db.collection('seminars');

    // Obtener un seminario de ejemplo
    const seminar = await seminarsCollection.findOne({});
    
    if (!seminar) {
      console.log('No hay seminarios en la base de datos');
      return;
    }

    console.log(`\n=== PRUEBA DE FECHAS ===`);
    console.log(`Seminario: ${seminar.title}`);
    console.log(`ID: ${seminar._id}`);
    
    if (seminar.startDate) {
      const startDate = new Date(seminar.startDate);
      console.log(`\nstartDate original: ${seminar.startDate}`);
      console.log(`startDate como Date: ${startDate}`);
      console.log(`startDate ISO: ${startDate.toISOString()}`);
      console.log(`startDate local: ${startDate.toLocaleDateString('es-CL')}`);
      console.log(`startDate solo fecha: ${startDate.toISOString().split('T')[0]}`);
    }
    
    if (seminar.endDate) {
      const endDate = new Date(seminar.endDate);
      console.log(`\nendDate original: ${seminar.endDate}`);
      console.log(`endDate como Date: ${endDate}`);
      console.log(`endDate ISO: ${endDate.toISOString()}`);
      console.log(`endDate local: ${endDate.toLocaleDateString('es-CL')}`);
      console.log(`endDate solo fecha: ${endDate.toISOString().split('T')[0]}`);
    }

    // Probar creación de fechas
    console.log(`\n=== PRUEBA DE CREACIÓN DE FECHAS ===`);
    
    const testDate = '2024-01-15';
    console.log(`Fecha de entrada: ${testDate}`);
    
    const startDate = new Date(testDate + 'T00:00:00.000Z');
    console.log(`startDate creado: ${startDate.toISOString()}`);
    
    const endDate = new Date(testDate + 'T23:59:59.999Z');
    console.log(`endDate creado: ${endDate.toISOString()}`);
    
    // Verificar que las fechas sean válidas
    console.log(`\nstartDate válido: ${!isNaN(startDate.getTime())}`);
    console.log(`endDate válido: ${!isNaN(endDate.getTime())}`);
    
    // Verificar diferencia
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    console.log(`Diferencia en horas: ${diffHours}`);

  } catch (error) {
    console.error('Error durante la prueba:', error);
  } finally {
    await client.close();
    console.log('\nConexión cerrada');
  }
}

// Ejecutar la prueba
testDates().catch(console.error); 