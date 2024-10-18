const express = require('express');
const bodyParser = require('body-parser');
const driverRoutes = require('./routes/driverRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const companyRoutes = require('./routes/companyRoutes'); // Importação das rotas da companhia
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/drivers', driverRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/companies', companyRoutes); // Rota para companhias
app.use('/auth', authRoutes); // Rota para autenticação

// Rota inicial (opcional)
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
