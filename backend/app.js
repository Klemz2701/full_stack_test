require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors');

const app = express()

//json response
app.use(express.json())

app.use(cors());

//Models
const User = require('./models/User')
const Movie = require('./models/Movie')

// pb
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem vindo" })
})

//get
app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id

    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({ msg: 'Usuário nao encontrado' })
    }

    res.status(200).json({ user })
})

function checkToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" })
    }

    try {

        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
    } catch (error) {
        res.status(400).json({ msg: "Token invalido" })
    }
}

//registrar user
app.post('/user/register', async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    //validacoes
    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório' })
    }

    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório' })
    }

    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória' })
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'A confirmação de senha precisar ser igual a senha' })
    }
    // checando usuarios existentes
    const userExists = await User.findOne({ email: email })
    if (userExists) {
        return res.status(422).json({ msg: 'Este email ja está cadastrado' })
    }

    // senhas
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // criando usuario
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {
        await user.save()

        res.status(201).json({ msg: "Usuário criado" })

    } catch (error) {
        console.log(error)

        res.status(500).json({ msg: error })
    }
})

// login
app.post("/user/login", async (req, res) => {

    const { email, password } = req.body
    //validacoes
    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório' })
    }

    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória' })
    }

    // checando se o usuario nao esta cadastrado
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ msg: 'Este email não foi encontrado' })
    }

    //chechando se a senha bate com o usuario
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida' })
    }

    try {

        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )

        res.status(200).json({ msg: "Autenticaçao realizada com sucesso", token })
    } catch (error) {
        console.log(error)

        res.status(500).json({ msg: error })
    }

})

//update
app.put('/user/:id', checkToken, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password']; 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        res.send({ message: 'Usuário editado' });
    } catch (error) {
        res.status(400).send(error);
    }
});

//delete
app.delete('/user/:id', checkToken, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        res.send({ message: 'Usuário deletado' });
    } catch (error) {
        res.status(500).send();
    }
});

// Listar todos os usuários
app.get('/users', checkToken, async (req, res) => {
    try {
        const users = await User.find({}, 'name email'); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//filmes
//
app.post('/movie/register', checkToken, async (req, res) => {
    const { title, duration, synopsis } = req.body;

    if (!title) {
        return res.status(422).json({ msg: 'O título é obrigatório' });
    }

    if (!duration) {
        return res.status(422).json({ msg: 'A duração é obrigatória' });
    }

    if (!synopsis) {
        return res.status(422).json({ msg: 'A sinopse é obrigatória' });
    }

    const movie = new Movie({
        title,
        duration,
        synopsis,
    });

    try {
        await movie.save();
        res.status(201).json({ msg: "Filme criado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Erro ao criar filme' });
    }
});

//
app.get('/movie/list', checkToken, async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.send(movies);
    } catch (error) {
        res.status(500).send();
    }
});

//
app.put('/movie/:id', checkToken, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'duration', 'synopsis'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas' });
    }

    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).send();
        }

        updates.forEach((update) => movie[update] = req.body[update]);
        await movie.save();

        res.send({ message: 'Filme atualizado' });
    } catch (error) {
        res.status(400).send(error);
    }
});

//
app.delete('/movie/:id', checkToken, async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).send();
        }
        res.send({ message: 'Filme deletado com sucesso.' });
    } catch (error) {
        res.status(500).send();
    }
});

//credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster1.gpf4js8.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(3000)
    console.log("Conectou ao BD")
})
    .catch(() => console.log(err))

