const express = require('express');
const db = require('./config/db');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

// Importando rotas
const driverRoutes = require('./routes/drivers');
const vehicleRoutes = require('./routes/vehicles');
const companyService = require('../services/companyService');

// Usando rotas
app.use('/drivers', driverRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/vehicles', companyRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
