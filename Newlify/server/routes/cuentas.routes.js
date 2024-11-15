import express from 'express';
import { Cuentas } from '../models/index.js';

const router = express.Router();

// Obtener cuentas de un usuario
router.get('/usuario/:id', async (req, res) => {
  try {
    const cuentas = await Cuentas.findAll({
      where: { id_usuario: req.params.id }
    });
    res.json(cuentas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Crear nueva cuenta
router.post('/', async (req, res) => {
  try {
    const cuenta = await Cuentas.create(req.body);
    res.status(201).json(cuenta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;