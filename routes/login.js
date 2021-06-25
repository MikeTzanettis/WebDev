const express = require('express');
var mysql = require('mysql');
const router = express.Router();
var session = require('express-session');
const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '9de07afe9b',
	database : 'har_db'
});


router.get('/login', (req,res)=> {
  if(session.loggedin)
    res.redirect("/home")
  else
    res.render("login.ejs",{perror: session.error})
})

router.post('/login',(req,res)=>{
    
      
  var username=req.body.username;
  var password=req.body.password;
  
 
  
  if(username && password )   {
      var sql="SELECT * from users WHERE username=? AND password=?";
      db.query(sql,[username,password],function(error,results){
          if (error) throw error;
          if(results.length>0) {
              session.error=0;
              console.log("authentication success");
              session.loggedin = true;
              session.uid = results[0].user_id
            if(!results[0].role) 
              res.redirect('/home')
            
            else{
                session.posted=false;
                res.redirect('/Owner')
            }
          }
          else {
                session.error=1;
                res.redirect("/login")
                }

         

      })
  }

})
module.exports=router;
