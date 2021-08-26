const mongoose = require('mongoose')
require('dotenv').config()

const server = mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ixmje.mongodb.net/dreamfood`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('Connected to DB')).catch(error => console.log('something happened'))

module.exports = server