import express from 'express';
const app=express();
import dotenv from 'dotenv'
import Connection from './db/conn.js';
import dataModel from './modal/jsonModel.js';
import cors from 'cors'
import fs from 'fs'
dotenv.config()


const port=process.env.PORT || 5000

Connection()

app.use(cors())
  
app.get('/savedata',(req,res)=>{
  fs.readFile('./data/jsondata.json','utf-8',async(err,data)=>{
    if(err){
      console.log(err)
      return
    }
    const dataArray = JSON.parse(data);

    // for upload data in mongodb cloud
    try{
        const data=await dataModel.find()
        if(data.length){
            res.send('Data already saved in database')
        }else{
            await dataModel.insertMany(dataArray)
            res.send(data)
          console.log(dataArray.length + ' data saved successfully')
        }
    }catch(err){
      res.send(err)
      console.log(err)
    }
  });
})


app.get('/getdata',async(req,res)=>{
  try{
    const data=await dataModel.find();
    res.status(200).json(data)
    console.log('data send from server')
  }catch(err){
    console.log(err)
    res.status(500).json({message:'server error'})
  }
})

app.listen(port,()=>{
    console.log(`server start at ${port}`)
})