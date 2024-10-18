// Importa o model da companhia
const Company = require('../models/companyModel');

// Função para criar uma nova companhia
const createCompany = async (companyData) => {
    // Chama o método de criação do model e retorna o resultado
    return await Company.createCompany(companyData);
};

// Função para obter todas as companhias
const getAllCompanies = async () => {
    // Chama o método do model que retorna todas as companhias
    return await Company.getAllCompanies();
};

// Função para obter uma companhia por ID
const getCompanyById = async (id) => {
    // Chama o método do model que retorna a companhia específica
    return await Company.getCompanyById(id);
};

// Função para atualizar uma companhia
const updateCompany = async (id, companyData) => {
    // Chama o método do model para atualizar a companhia e retorna o resultado
    return await Company.updateCompany(id, companyData);
};

// Função para excluir uma companhia
const deleteCompany = async (id) => {
    // Chama o método do model para excluir a companhia e retorna o resultado
    return await Company.deleteCompany(id);
};

// Exporta as funções para uso em outros módulos
module.exports = {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
};
