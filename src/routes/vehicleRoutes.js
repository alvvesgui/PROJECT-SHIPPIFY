const express = require('express');
const router = express.Router();
const vehicleService = require('../services/vehicleService');
const authenticateToken = require('../middleware/authMiddleware');

// Rota para registrar um novo veículo
router.post('/', authenticateToken, async (req, res) => {
    try {
        const vehicleData = req.body;
        const newVehicle = await vehicleService.createVehicle(vehicleData);
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para listar todos os veículos
router.get('/', async (req, res) => {
    try {
        const vehicles = await vehicleService.getAllVehicles();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para retornar informações da empresa que o carro pertence e seu porte
router.get('/:id/details', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const vehicleDetails = await vehicleService.getCarDetails(id);
        if (!vehicleDetails) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        res.status(200).json(vehicleDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Exporte o router
module.exports = router;

