const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, })); // This is important!
//app.use(methodOverride('_method')); // So is this!

app.get('/', (req, res) => {
    res.render('teams.ejs');
});

app.get('/drivers', (req, res) => {
    res.render('drivers.ejs');
});


app.listen(port, console.log(`Server runnning on port ${port}`));