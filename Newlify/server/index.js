import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import usuarioRoutes from './routes/usuario.routes.js';
import cuentasRoutes from './routes/cuentas.routes.js';
import transaccionesRoutes from './routes/transacciones.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cuentas', cuentasRoutes);
app.use('/api/transacciones', transaccionesRoutes);

// Sincronizar base de datos
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});