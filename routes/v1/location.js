// Include controllers file
var LocationController = require('../../controllers/locations');//importando archivo controlador con funciones adentro
//initialize
module.exports = function (router) {
    
    router.get('/usuarios/:id_usuario/locations', LocationController.getUserLocation );
    router.get('/usuarios/:id_usuario/locations/:id', LocationController.getUserLocationById );
    router.post('/usuarios/:id_usuario/locations', LocationController.addUserLocation );
    router.patch('/usuarios/:id_usuario/locations/:id', LocationController.updateUserLocationById );//:id va a pasar a req.params.id
    router.delete('/usuarios/:id_usuario/locations/:id', LocationController.deleteUserLocationById );

}