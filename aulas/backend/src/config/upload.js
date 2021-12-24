const multer = require('multer');
const path = require('path');

/**
 * Salva a imagem em disco, no destino especificado
 */
module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),

        //envia a imagem com o mesmo nome de destino
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    })
};

