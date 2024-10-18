const { body, validationResult } = require('express-validator');

const validateDriver = [
    body('firstName').notEmpty().withMessage('Nome é obrigatório'),
    body('lastName').notEmpty().withMessage('Sobrenome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('phone').notEmpty().withMessage('Telefone é obrigatório'),
    body('companyId').notEmpty().withMessage('ID da empresa é obrigatório'),
    body('city').notEmpty().withMessage('Cidade é obrigatória'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateDriver;
