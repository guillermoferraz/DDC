const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dcc', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('Data Base connected'))
    .catch(err => cosnsole.log('err'));
