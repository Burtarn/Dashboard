const session = require('express-session');

const sessionOptions = (secret) => ({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,     
        httpOnly: true,
        maxAge: 60 * 60 * 1000, 
        sameSite: 'Strict', 
    },
});

module.exports = sessionOptions;
