
var AuthController = require('../../controllers/auth');//importando archivo controlador con funciones adentro


module.exports = function (router) {
    
    router.post('/auth/login', AuthController.doLogin );
    router.post('/auth/validate-token', AuthController.validateToken );
    
    
}