const express=require('express')
const client = require('./connection.js')

const app=express()

const Client = require('pg')
const path=require('path')
const fs=require('fs')
const bodyParser=require('body-parser')
const multer=require('multer')
const e = require('express')
const upload =multer({dest:"uploads/"})
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

client.connect();

app.post('/upload',upload.single('productimage'),async(req,res)=>{
try{
   
const imageData=req.file


   const binary=Buffer.from(imageData.path)
    let data=req.body
    let  id=900
    const insertQuery='insert into images(id,imagedata) values ($1,$2)'
    const result=await client.query(insertQuery,[id,binary], (err, result)=>{
    if(!err){
    res.send('Insertion was successful')
    }
    else{ console.log(err.message) }
    })



client.end;

}
catch(error){
console.error('error uploading image:'+error)
res.status(500).send('error handling request')
}


})


app.get('/upload', (req, res)=>{
    client.query(`Select * from images`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})



app.listen(4500)




