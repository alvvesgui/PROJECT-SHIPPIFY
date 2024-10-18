const express = require('express');
const router = express.Router();
const companyService = require('../services/companyService');
const authenticateToken = require('../middleware/authMiddleware');

// Rota para criar uma nova companhia
router.post('/', authenticateToken, async (req, res) => {
    try {
        const companyData = req.body;
        const newCompany = await companyService.createCompany(companyData);
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para listar todas as companhias
router.get('/', async (req, res) => {
    try {
        const companies = await companyService.getAllCompanies();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para recuperar companhia por ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const company = await companyService.getCompanyById(id);
        if (!company) {
            return res.status(404).json({ message: 'Companhia não encontrada' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para atualizar companhia
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const companyData = req.body;
        const updatedCompany = await companyService.updateCompany(id, companyData);
        if (!updatedCompany) {
            return res.status(404).json({ message: 'Companhia não encontrada' });
        }
        res.status(200).json(updatedCompany);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para excluir companhia
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCompany = await companyService.deleteCompany(id);
        if (!deletedCompany) {
            return res.status(404).json({ message: 'Companhia não encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Exporte o router
module.exports = router;
