const companyService = require('../services/companyService'); // Supondo que você tenha um serviço para a empresa

// Retornar informações da empresa
const getCompanyInfo = async (req, res) => {
    try {
        const companyId = req.params.id; // Supondo que você esteja passando o ID da empresa como parâmetro na URL
        const company = await companyService.getCompanyById(companyId); // Chame o serviço para obter as informações da empresa

        if (!company) {
            return res.status(404).json({ message: 'Empresa não encontrada' });
        }

        res.status(200).json(company); // Retorne as informações da empresa
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCompanyInfo,
};
