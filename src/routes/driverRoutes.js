const express = require('express');
const router = express.Router();
const driverService = require('../services/driverService');
const authenticateToken = require('../middleware/authMiddleware');
const validateDriver = require('../middleware/validateDriver');
const driverController = require('../controllers/driverController');

// Rota para criar um novo motorista
router.post('/', authenticateToken, validateDriver, async (req, res) => {
    try {
        const driverData = req.body;
        const newDriver = await driverService.createDriver(driverData);
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para listar todos os motoristas
router.get('/', async (req, res) => {
    try {
        const filters = req.query; // Filtra por cidade ou status
        const drivers = await driverService.getAllDrivers(filters);
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para recuperar motorista por ID
router.get('/:id', authenticateToken, driverController.getDriverById);

// Rota para atualizar motorista
router.put('/:id', authenticateToken, validateDriver, driverController.updateDriver);

// Rota para excluir motorista
router.delete('/:id', authenticateToken, driverController.deleteDriver);

// Rota para retornar informações da empresa do motorista
router.get('/:id/company', authenticateToken, driverController.getDriverCompany); // Nova rota

// Exporte o router
module.exports = router;
