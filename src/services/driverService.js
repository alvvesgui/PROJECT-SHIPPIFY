const db = require('../config/db');

// Função para criar um novo motorista
const createDriver = async (driverData) => {
    const { firstName, lastName, email, phone, companyId, city } = driverData;

    // Verifica se o e-mail é único
    const [existingDriver] = await db.query('SELECT * FROM drivers WHERE email = ?', [email]);
    if (existingDriver.length > 0) {
        throw new Error('O e-mail já está em uso.');
    }

    // Verifica se a empresa existe
    const [existingCompany] = await db.query('SELECT * FROM companies WHERE id = ?', [companyId]);
    if (existingCompany.length === 0) {
        throw new Error('A empresa não existe.');
    }

    // Insere o novo motorista no banco de dados
    const [result] = await db.query('INSERT INTO drivers (first_name, last_name, email, phone, company_id, city) VALUES (?, ?, ?, ?, ?, ?)', 
    [firstName, lastName, email, phone, companyId, city]);

    return { id: result.insertId, ...driverData };
};

// Função para listar todos os motoristas
const getAllDrivers = async (filters = {}) => {
    const { city, status } = filters;

    // Consulta base com JOIN para obter informações da empresa
    let query = `
        SELECT d.*, c.name AS company_name, c.size AS company_size 
        FROM drivers d
        JOIN companies c ON d.company_id = c.id`;
    const queryParams = []; // Parâmetros da consulta

    // Adiciona filtros à consulta, se fornecidos
    if (city || status) {
        query += ' WHERE';
        if (city) {
            query += ' d.city = ?';
            queryParams.push(city);
        }
        if (status) {
            query += city ? ' AND' : ''; // Usa 'AND' se o filtro de cidade já foi adicionado
            query += ' d.status = ?';
            queryParams.push(status);
        }
    }

    // Executa a consulta e retorna os motoristas encontrados
    const [drivers] = await db.query(query, queryParams);
    return drivers;
};

// Outras funções como updateDriver e deleteDriver podem ser adicionadas aqui.

module.exports = {
    createDriver,
    getAllDrivers,
    // Exporte outras funções que você criar
};

