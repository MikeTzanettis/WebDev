const express = require('express');
const session = require('express-session');
var mysql = require('mysql');
const router = express.Router();
const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '9de07afe9b',
	database : 'har_db'
});

router.get('/updateus',(req,res)=>{
    res.render('updateus.ejs',{uerror:session.uerror, u1error:session.u1error, u2error:session.u2error})
})

router.post('/updateus',(req,res)=>{
    session.u2error = false;
    session.uerror = false;
    session.u1error = false;

    
    var oldusername = req.body.oldusername;
    var newusername = req.body.newusername;
    console.log(newusername)
    var sql = "SELECT * from users where username=?"
    db.query(sql,[newusername],function(err,results1) {
            if(results1.length == 0) {
           
    db.query(sql,[oldusername],function(err,results) {
        if(results.length>0){
        if (err) {
            throw err;
        }
        usid = results[0].user_id
       if(usid==session.uid){
            var sql1="UPDATE users SET username=? where user_id=?"
            db.query(sql1,[newusername,usid],function(err,results1){
                if(err){
                    throw err;
                }
                res.redirect('/home');
                console.log("Username updated")
            })
        }
        else {
            session.uerror=true;
            res.redirect('/updateus')
        }
    }
    else{
        session.u1error=true;
        res.redirect('/updateus')
    }
        
     
    })
}
else {
    session.u2error=true;
    res.redirect('/updateus')
}
})

})

router.post("/updateacc",(req,res)=>{
    session.loggedin=false;
    session.role=0;
    res.redirect("/login")
})
module.exports = router;