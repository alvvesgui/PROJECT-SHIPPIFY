const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log de erro no console
    res.status(500).json({ message: 'Algo deu errado!', error: err.message });
};

module.exports = errorHandler;
