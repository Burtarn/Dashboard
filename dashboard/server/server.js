const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();


require('dotenv').config();
console.log('🔍 MONGO_URI:', process.env.MONGO_URI);

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('✅ Ansluten till MongoDB'))
.catch((err) => console.error('❌ MongoDB-anslutningsfel:', err));


app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
}));
app.use(express.json()); 


app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  
        httpOnly: true, 
    }
}));

const authRoutes = require('./routes/AuthRoutes');
app.use(authRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`);
});