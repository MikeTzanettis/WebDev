const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');



const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: '9de07afe9b',
  database: 'har_db',
  port: '3306'
  
});

con.connect(function(err) {
    if(err) {
        throw err;
    } else 
    console.log("database connected!!!");
});
app = express();
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

app.set('view-engine','ejs');
app.use(bodyParser.json({limit: '120mb'}));
app.use(bodyParser.urlencoded({limit:"120mb",extended:true}));
app.use(express.static("public"))
app.use('/', require('./routes/updateus'));
app.use('/', require('./routes/updatepass'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/upload'));
app.use('/', require('./routes/home'));
app.get('/', (req,res)=>{
  res.render('index.ejs')
})
app.use('/', require('./routes/updateacc'));

app.use('/',require('./routes/Info'));
app.use('/',require('./routes/Owner'));
app.use('/',require('./routes/chart1'))
app.use('/',require('./routes/chart2'))
app.use('/',require('./routes/chart3'))
app.use('/',require('./routes/chart4'))
app.get('/about',(req,res)=>{
  res.render('about.ejs')
})
app.listen("3000", (err) => {
  if(err) throw err;
  console.log("Server started on port 3000")

});