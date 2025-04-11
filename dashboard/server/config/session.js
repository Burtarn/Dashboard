const session = require('express-session');

const sessionOptions = (secret) => ({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,      // Sätt till true om du använder HTTPS
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 timme
        sameSite: 'Strict', // Förhindra tredjepartsförfrågningar
    },
});

module.exports = sessionOptions;
