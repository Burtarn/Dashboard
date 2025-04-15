require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db.js');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servern körs på http://localhost:${PORT}`);
    });
});
