const jwt = require('jsonwebtoken');

// verificar el token
let verificarToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'El token de autorizacion no es valido'
            });
        }
        req.admin = decoded.admin;
        next();
    });
}



module.exports = {
    verificarToken
}