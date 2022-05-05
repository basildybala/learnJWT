const { urlencoded } = require('express');
const express=require('express');
const app=express()
const adminRouter=require("./routes/admin")
const jwt=require('jsonwebtoken');
   


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/admin',adminRouter)
app.use(express.static("public"));




function verifyToken(req,res,next){

    let authHeader=req.headers.authorization;
    if(authHeader==undefined){
        res.send('No Token Header')
    }
    let token=authHeader.split(" ")[1]
    jwt.verify(token,"basil123",function(err,decoded){
        if(err){
            res.send('Token Veryfy Failed')
        }else{
            res.send(decoded)
            next()
        }
    })
}


let userDB="basil";
let passDB="123"


app.post('/',(req,res)=>{
   let {user,pass}=req.body;

   if(user===userDB&&pass===passDB){
     let resp=user
    let token=jwt.sign(resp,"basil123");
       console.log('Login Success'+token);
       res.send(token)
   }else{
       console.log('Login Failed');
       res.send('Login Failed')
   }
})

app.get('/shopping',verifyToken,(req,res)=>{
    console.log('Haiii');
})




app.listen(3000)