// IMPORTS
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const authentication = require('./jwt')

// Models
const models = require("./models");

// Routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const listFriends = require('./routes/friends');
const groupRoute = require('./routes/groups');
const updateGroupRoute = require('./routes/updateGroup');
const groupMembersRoute = require('./routes/groupMembers');
const startSwapRoute = require('./routes/swap');
const startVoteRoute = require('./routes/vote');

// Express PORT
const PORT = process.env.PORT || 3000;


// APP USES
authentication.use()
app.use(authentication.passport.initialize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//Routes API
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/friends', listFriends)
app.use('/groups', groupRoute)
app.use('/groups-update', updateGroupRoute)
app.use('/group', groupMembersRoute)
app.use('/swap', startSwapRoute)
app.use('/vote', startVoteRoute)

// Baisc Routes
app.get('/', (req, res) => {
    res.send({ message: "FILMATE API" })
})

app.get('/restricted', authentication.passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: "Token verified and approved!" })
})


// Sync Database
models.sequelize
    .sync()
    .then(() => {
        console.log('Connected to the auth.')
    })
    .catch((err) => {
        console.log("Unable to connect to the auth", err)
    });


// Listening 
app.listen(3000, () => {
    console.log(`Serving on http://localhost${PORT}`);
})

