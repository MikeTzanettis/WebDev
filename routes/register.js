const express = require('express');
var mysql = require('mysql');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '9de07afe9b',
	database : 'har_db'
});
router.get('/register', (req,res)=>{
  res.render('register.ejs')
})

router.post('/register',check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), async (req,res)=>{
  const errors = validationResult(req)   
  console.log(errors.isEmpty())
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var reppass = req.body.rep_password;
  
  if(errors.isEmpty() && password == reppass) {
     
         
          var values = [email,username,password,0];
          var sql="INSERT INTO users (email, username, password, role) VALUES (?)";
          db.query(sql,[values],function(error, results){
          if(error) {
              throw error;  
          }
          console.log("1 record inserted");
          res.redirect('/login');
          })
      
  }
  else
      res.send("Password does not match the requirements")
  
  
})
module.exports=router;