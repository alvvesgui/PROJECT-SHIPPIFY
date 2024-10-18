// Importa a configuração do banco de dados
const db = require('../config/db');

// Define a classe Company
class Company {
    // Método estático para criar uma nova companhia
    static async createCompany(data) {
        // Executa a inserção no banco de dados e retorna o resultado
        const [result] = await db.execute('INSERT INTO companies (name) VALUES (?)', [data.name]);
        // Retorna o ID da nova companhia e os dados
        return { id: result.insertId, ...data };
    }

    // Método estático para obter todas as companhias
    static async getAllCompanies() {
        // Executa a consulta para selecionar todas as companhias
        const [rows] = await db.execute('SELECT * FROM companies');
        // Retorna as linhas da consulta
        return rows;
    }

    // Método estático para obter uma companhia por ID
    static async getCompanyById(id) {
        // Executa a consulta para selecionar uma companhia específica
        const [rows] = await db.execute('SELECT * FROM companies WHERE id = ?', [id]);
        // Retorna a primeira linha encontrada
        return rows[0];
    }

    // Método estático para atualizar uma companhia
    static async updateCompany(id, data) {
        // Executa a atualização dos dados da companhia no banco
        await db.execute('UPDATE companies SET name = ? WHERE id = ?', [data.name, id]);
        // Retorna a companhia atualizada
        return this.getCompanyById(id);
    }

    // Método estático para excluir uma companhia
    static async deleteCompany(id) {
        // Executa a exclusão da companhia no banco de dados
        const [result] = await db.execute('DELETE FROM companies WHERE id = ?', [id]);
        // Retorna um booleano indicando se a exclusão foi bem-sucedida
        return result.affectedRows > 0;
    }
}

// Exporta a classe Company para uso em outros módulos
module.exports = Company;
