const jwt = require('jsonwebtoken');
const User = require('../models/user');


const userExtractor = async (request, response, next) =>{
    try {
        const token = request.cookies?.accessToken;

        if(!token){
            return response.status(401).json({ error: 'Token no proporcionado, autorización denegada' });
        }
        
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return response.status(404).json({ error: 'Usuario del token no encontrado' });
        }

        request.user = user;
        next(); // Llamar a next() solo en caso de éxito
    } catch (error) {
        return response.status(401).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = { userExtractor }