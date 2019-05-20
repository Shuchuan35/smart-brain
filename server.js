const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());



// app.get('/', (req, res) => {
//     res.send('This is public folder');
// })



app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})