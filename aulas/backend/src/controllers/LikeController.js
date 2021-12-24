const Post = require('../models/Post');

module.exports = {
    async store(req, res){
        const post = await Post.findById(req.params.id);

        //contabiliza o like
        post.likes += 1;
        //salva a informação
        await post.save();

        //envia a informação em tempo real para todos os usuários utilizando a aplicação
        req.io.emit('like', post);

        return res.json(post);
    }
};