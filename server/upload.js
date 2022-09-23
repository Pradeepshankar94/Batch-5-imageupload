const exp = require("express");
const mycon = require("mysql");
var bodyParser = require('body-parser');
const cors = require("cors");
var multer = require('multer');
var path = require('path');

const app = exp();
app.use(cors());
app.use(exp.json()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(exp.static('public'));

var storage = multer.diskStorage({
    destination : function(req, file, cb){cb(null,'../client/public/images')},
    filename:function(req,file,cb){cb(null,file.originalname)}
})

var upload = multer({ storage : storage});

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

app.post('/image_upload',upload.single('img_file'),function (req,res) {
    var fileurl = 'http://localhost:3000/images/'+req.file.originalname;
    var filepath = 'images/';
    var filename = req.file.originalname;
     var id = req.body.id;
     var descr = req.body.img_descr;
 
     let sql = 'insert into images_section(emp_id,img_url,img_path,img_name,img_descr,status)values(?,?,?,?,?,?)';
 
    c.query(sql,[id,fileurl,filepath,filename,descr,0],(err,result)=>{
     if(err){let s={status:"error"};res.send(s);}
     else{let s ={status:"Uploaded"};res.send(s);}
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

app.listen(3005);
