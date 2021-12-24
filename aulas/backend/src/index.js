const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

/**
 * @lacy
 * cria a aplicação
 */
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

/**
 * conexão coma a base de dados no mongo DB
 */
mongoose.connect('mongodb+srv://dev:laciene@cluster0.tbeyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;

    //garante e aplicação continue rodando, depois da interceptação do io
    next();
});

//permite que todo tipo de aplicação acesse o backend
app.use(cors());

/**
 * /files -> referenciando um arquivo físico em uma pasta
 * express.static -> caminho onde o arquivo está
 */
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

//ouvindo a porta no navegador
server.listen(3333)


