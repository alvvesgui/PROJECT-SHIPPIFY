const db = require('../config/db');

class Driver {
    // Método para criar um novo motorista
    static async create(firstName, lastName, email, phone, companyId, city, status = 'active') {
        const query = `
            INSERT INTO drivers (first_name, last_name, email, phone, company_id, city, status)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        const [result] = await db.execute(query, [firstName, lastName, email, phone, companyId, city, status]);
        return { id: result.insertId, firstName, lastName, email, phone, companyId, city, status };
    }

    // Método para listar todos os motoristas com informações da empresa
    static async findAll() {
        const query = `
            SELECT d.*, c.name AS company_name 
            FROM drivers d
            JOIN companies c ON d.company_id = c.id;
        `;
        const [rows] = await db.execute(query);
        return rows; // Retorna todos os motoristas com as informações da empresa
    }

    // Método para encontrar um motorista por ID
    static async findById(id) {
        const query = `
            SELECT d.*, c.name AS company_name 
            FROM drivers d
            LEFT JOIN companies c ON d.company_id = c.id
            WHERE d.id = ?;
        `;
        const [rows] = await db.execute(query, [id]);
        return rows[0]; // Retorna o motorista encontrado ou undefined se não existir
    }

    // Método para atualizar um motorista
    static async update(id, firstName, lastName, email, phone, companyId, city, status) {
        const query = `
            UPDATE drivers 
            SET first_name = ?, last_name = ?, email = ?, phone = ?, company_id = ?, city = ?, status = ? 
            WHERE id = ?;
        `;
        const [result] = await db.execute(query, [firstName, lastName, email, phone, companyId, city, status, id]);
        return result;
    }
    
    // Método para deletar um motorista
    static async delete(id) {
        const query = `
            DELETE FROM drivers WHERE id = ?;
        `;
        const [result] = await db.execute(query, [id]);
        return result;
    }
}

module.exports = Driver;

