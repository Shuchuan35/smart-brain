const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());


mongoose.connect('mongodb://localhost/smartbrain', { useNewUrlParser: true, useFindAndModify: false });

// app.get('/', (req, res) => {
//     res.send('This is public folder');
// })

require('./routes/api-routes')(app);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})