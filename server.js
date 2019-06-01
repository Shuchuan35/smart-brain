const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = require('./config/keys');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


//connect to production mongodb
mongoose.connect(MONGODB_URI || 'mongodb://localhost/smartbrain', {useNewUrlParser: true, useFindAndModify: false });

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/smartbrain', { useNewUrlParser: true, useFindAndModify: false });

require('./routes/api-routes')(app);

if (process.env.NODE_ENV === 'production') {
    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/client/build/index.html');
    });
}

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})