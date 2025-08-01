//importar modulos
const app = require('./app');
const http = require('http');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log('Conectando a la base de datos...');
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB');

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`El servidor está corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos. La aplicación no se iniciará.');
    console.error(error.message);
    process.exit(1); // Termina el proceso si la conexión falla
  }
};

startServer();
