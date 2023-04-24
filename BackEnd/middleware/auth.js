const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { compareSync, hashSync } = require('bcrypt');
const { checkUserController, newUserController } = require("../controllers/usersControler");

const users = [];
let userMongo = [];

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (email, done) {
    const user = users.find(user => user.email === email);
    done(null, user);
});

passport.use('login', new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    const user = users.find(user => user.email === email && compareSync(password, user.password));
    const usersDB = await checkUserController(email)

    if (usersDB) {
        let userMongoDB = []
        userMongoDB.push(usersDB)
        userMongo = userMongoDB.find(user => user.email === email && compareSync(password, user.password));
    }

    if (user) {
        done(null, user);

    } else if (userMongo?.email) {
        done(null, userMongo);

    } else {
        done(null, false, { message: 'Nombre de usuario o contraseña incorrectos' });
    }

}));


passport.use('register', new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {

        const email = req.body.email
        const existentUser = users.find(user => user.username === username);

        if (existentUser) {
            done(null, false, { message: 'El usuario o el email ya existe' });
            return;
        }

        const user = { email, password: hashSync(password, 10) };
        users.push(user);
        done(null, user);
    }));