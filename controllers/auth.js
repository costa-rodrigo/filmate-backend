const models = require("../models");
const User = models.user;


exports.createUser = async ({ name, password, email }) => {
    User
        .findOne({
            where: {
                email: email
            }
        })
        .then((user) => {
            // If there is already a user with that username, returns a massage. 
            if (user) {
                console.log('That email is already taken.')
            }
            // If not, creates a new user.
            else {

                console.log("User account created");

                // const userPassword = generateHash(password);
                const data = {
                    name: name,
                    password: password,
                    email: email
                };

                User
                    .create(data);
            }
        });
}

exports.getAllUsers = async () => {
    return await User.findAll()
}

exports.getUser = async obj => {
    let res = await User.findOne({
        where: obj
    })

    if (res) return res.dataValues
    else return false
}