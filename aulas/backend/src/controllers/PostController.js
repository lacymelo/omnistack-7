const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res){
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    async store(req, res){
        const {author, place, description, hashtags} = req.body;
        const {filename: image} = req.file;

        //mudando a extensão da imagem
        const [name] = image.split('.');
        const filename = `${name}.jpeg`;

        /**
         * reduz o tamanho da imagem, para ficar adequada
         * no mobile
         */
        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', filename)
            )

        /**
         * a imagem original é removida do sistema
         */
        fs.unlinkSync(req.file.path);  

        /**
         * A requisição pode demorar, o await vai esperar até,
         * que ela termine
         */
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: filename,
        });

        //envia a informação em tempo real para todos os usuários utilizando a aplicação
        req.io.emit('post', post);

        return res.json(post);
    }
};