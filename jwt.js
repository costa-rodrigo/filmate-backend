// IMPORTS
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
var jwtOptions = {};

const auth = require('./controllers/auth')

// EXPORTS
exports.use = () => {

    let ExtractJwt = passportJWT.ExtractJwt
    let JwtStrategy = passportJWT.Strategy
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    jwtOptions.secretOrKey = "ice-cream"


    let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
        let user = auth.getUser({ id: jwt_payload.id })

        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    })

    passport.use(strategy);
}

exports.passport = passport;
exports.jwtOptions = jwtOptions;
exports.jwt = jwt;