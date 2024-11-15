import express from 'express';
import { Transacciones, Cuentas } from '../models/index.js';
import sequelize from '../config/database.js';

const router = express.Router();

// Realizar transacción
router.post('/', async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id_cuentas, tipo_transaccion, monto, cuenta_destino } = req.body;

    // Crear la transacción
    const transaccion = await Transacciones.create(req.body, { transaction: t });

    // Actualizar saldo de la cuenta origen
    const cuentaOrigen = await Cuentas.findByPk(id_cuentas);
    await cuentaOrigen.update({
      saldo: tipo_transaccion === 'deposito' 
        ? cuentaOrigen.saldo + monto
        : cuentaOrigen.saldo - monto
    }, { transaction: t });

    // Si es una transferencia, actualizar cuenta destino
    if (cuenta_destino) {
      const cuentaDestino = await Cuentas.findByPk(cuenta_destino);
      await cuentaDestino.update({
        saldo: cuentaDestino.saldo + monto
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json(transaccion);
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
});

// Obtener transacciones de una cuenta
router.get('/cuenta/:id', async (req, res) => {
  try {
    const transacciones = await Transacciones.findAll({
      where: { id_cuentas: req.params.id }
    });
    res.json(transacciones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;