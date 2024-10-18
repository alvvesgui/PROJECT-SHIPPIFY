const vehicleService = require('../services/vehicleService');
const driverService = require('../services/driverService'); // Importando o service de motorista

// Registrar um novo veículo
const createVehicle = async (req, res) => {
    try {
        const vehicleData = req.body;
        const newVehicle = await vehicleService.createVehicle(vehicleData);
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar veículos por motorista
const getVehiclesByDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicles = await vehicleService.getVehiclesByDriver(id);
        if (!vehicles.length) {
            return res.status(404).json({ message: 'Nenhum veículo encontrado para este motorista' });
        }
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar veículo
const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicleData = req.body;
        const updatedVehicle = await vehicleService.updateVehicle(id, vehicleData);
        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Excluir veículo
const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVehicle = await vehicleService.deleteVehicle(id);
        if (!deletedVehicle) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retornando informações da empresa que o carro pertence
const getCarDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await vehicleService.getVehicleById(id);
        if (!car) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }

        // Obtendo informações da empresa do motorista
        const driver = await driverService.getDriverById(car.driverId); // Supondo que o carro tenha a referência do motorista
        if (!driver) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }

        // Retornando informações da empresa
        const carDetails = {
            company: driver.company, // Informações da empresa do motorista
            size: car.size, 
        };

        res.status(200).json(carDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createVehicle,
    getVehiclesByDriver,
    updateVehicle,
    deleteVehicle,
    getCarDetails, // Adicionado para exportar a nova função
};

