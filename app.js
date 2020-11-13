const path = require ('path')
const express = require('express')
const dotenv = require('dotenv')
const serviceAccount = require('./express-9240a-firebase-adminsdk-xtj9p-b2546f3ccf.json')
const admin = require('firebase-admin')
const connectDB = require('./config/db')
const morgan = require ('morgan')
const exphbs = require('express-handlebars')


//load config 
dotenv.config({ path: 'config/config.env' })

connectDB()
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://express-9240a.firebaseio.com"
});

const app = express()
//login 
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}    

// Routes 
app.use ('/', require('./routes/index'))   

// handlebars  template engin

app.engine('hbs', exphbs({defaultLayout:'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// static folder 
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))