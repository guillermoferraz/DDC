const express = require('express');
const path = require('path') 
const app = express();


const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const multer = require('multer');
const {uuid} = require('uuidv4')


app.set('port', process.env.PORT || 3300);

//initializations
require('./database');
require('./config/passport');

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'mysecretkey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


//global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.email = req.email || null;
        
    next();

});

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});

app.use(multer({
    storage: storage
}).single('img'));


app.use(require('./routes/global_api'));

app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));
app.use(require('./routes/blog'));
app.use(require('./routes/tables'));
app.use(require('./routes/user'));
app.use(require('./routes/avatar'));



app.use(express.static(path.join(__dirname,'public')));





app.listen(app.get('port'), () => {
    console.log('DCC server on port', app.get('port'));

});
