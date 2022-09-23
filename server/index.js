const exp = require("express");
const mycon = require("mysql");
var bodyParser = require('body-parser');
const cors = require("cors");
const multer = require('multer');
const upload = multer();
var path = require('path');

const app = exp();
app.use(cors());
app.use(exp.json()); 
app.use(upload.array());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(exp.static('public'));


const c = mycon.createConnection({
    host : "localhost",
    port : 3312,
    user : "root",
    password : "",
    database : "ecom"
});

c.connect(function(err){
    if(err){console.log(err);}
    else{console.log("Database Connected")}
})

app.post('/signup',(req,res)=>{
    let name = req.body.sname;
    let email = req.body.semail;
    let phone = req.body.sphone;
    let password = req.body.spassword;

    let sql = 'insert into signup(username,password,name,email,phone,status)values(?,?,?,?,?,?)';

    c.query(sql,[email,password,name,email,phone,0],(err,result)=>{
        if(err){
            let s = {"status":"error"};
            res.send(s);
        }
        else{
            let s = {"status":"Created"};
            res.send(s);
        }
    });

});

app.post('/signin',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    let sql = 'select * from signup where username=?';

    c.query(sql,[username],(err,result)=>{
        if(result.length > 0){
            let username1 = result[0].username;
            let password1 = result[0].password;
            let id = result[0].id;
            if(username1 == username && password1 == password){
                let s = {status : id};
                res.send(s);
            }
            else{
                let s = {status:"error"};
                res.send(s);
            }
        }
        else{
            let s  ={"status":"error"};
            res.send(s);}
    })

});

app.post('/getuserdetails',(req,res)=>{
    let id = req.body.id;
    let sql = 'select * from signup where id=?';
    c.query(sql,[id],(error,result)=>{
        res.send(result);
        
    })
});




app.post('/getimgdetails',(req,res)=>{
    let id = req.body.id;
    let sql = 'select * from images_section where emp_id=?';
    c.query(sql,[id],(error,result)=>{
        res.send(result);
        
    })
});

app.listen(3004);
