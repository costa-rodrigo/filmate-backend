// IMPORTS
const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const auth = require('./controllers/auth')
const authentication = require('./jwt')
const models = require("./models");


// EXPRESS PORT
const PORT = process.env.PORT || 3000;


// APP USES
authentication.use()
app.use(authentication.passport.initialize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// BASIC ROUTES
app.get('/', (req, res) => {
    res.send({ message: "FILMATE API" })
})

app.get('/users', (req, res) => {
    auth.getAllUsers()
        .then(user => res.json(user))
})

app.post('/register', (req, res) => {
    const { name, password } = req.body

    auth
        .createUser({ name, password })
        .then(user => res.json())
})

app.post('/login', async (req, res) => {

    const { name, password } = req.body

    if (name && password) {
        let user = await auth.getUser({ name })
       

        if (!user) {
            res.status(401).json({ message: "User not found ", user: name })
            console.log('no user!!')
            
        }
        else if (user && user.password !== password) {
            res.status(401).json({ message: 'Password is incorrect!' })
            console.log('user exists but wrong password')
        }

        else {
            let payload = { id: user.id }
            let token = authentication.jwt.sign(payload, authentication.jwtOptions.secretOrKey)
            res.json({ message: 'ok', token: token })
            console.log('user password if satement')
        }
      
    }
})

app.get('/restricted', authentication.passport.authenticate(
    'jwt', { session: false }), (req, res) => {
        res.json({ message: "Token verified and approved!" })
    })


// SYNC SEQUELIZE
models.sequelize
    .sync()
    .then(() => {
        console.log('Connected to the auth.')
    })
    .catch((err) => {
        console.log("Unable to connect to the auth", err)
    });


// EXPRESS LISTENING
app.listen(3000, () => {
    console.log(`Serving on http://localhost${PORT}`);
})