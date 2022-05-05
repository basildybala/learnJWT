const express =require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');


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


router.post('/',(req,res)=>{
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

router.get('/shopping',verifyToken,(req,res)=>{
    console.log('Haiii');
})





module.exports=router