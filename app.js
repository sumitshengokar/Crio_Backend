const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require('body-parser')
var http = require("http");
var mysql= require('mysql');
const {v4 : uuidv4} = require('uuid');



var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password: '',
  database:'memeDB'
});

connection.connect(function(error){
  //callback
  if(!!error){
    console.log("error");
  }
  else
  {
    console.log("connected");
  }

});

const app= express();
app.use(cors());     // to support JSON-encoded bodies
app.use(express.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var server = app.listen(5000,  "127.0.0.1", function () {
 
var host = server.address().address
var port = server.address().port
 
  console.log("Example app listening at http://%s:%s", host, port)
 
});




app.get('/memes',function(req,res){
  connection.query("select * from myMemes",function(error,rows,fields){
    if(!!error)
    {
      console.log("error in query");
    }
    else
    {
      console.log("successfull  query");
      res.send(rows);
    }
  });
  
})

app.post('/memes',function(req,res){

  const newName = req.body.name;
  const Caption = req.body.caption;
  const Url = req.body.url; 
  let sqlInsert="INSERT INTO myMemes (name ,caption , url) VALUES (?,?,?);"
  // let data = {name:req.body.name, caption:req.body.caption , url: req.body.url};
  let insertedId;
  connection.query(sqlInsert,[newName,Caption,Url],function(err,result){
    if(err)
    {
      console.error(err);
      return;
      // console.log("error in queryyyyyyyyyyyyy");
    }
      insertedId= result.insertId;
      console.log(" insertedId is ",insertedId);
      let obj={
        "id":insertedId
      }
      res.status(200).send(obj);
  });
  
})

app.put('/updateMeme/:id',function(req,res){
  const id=req.params.id;
  const newName=req.body.newNname;
  const newCaption = req.body.newCaption;
  const newUrl = req.body.newUrl;
  const sql="UPDATE myMEME SET name= ? , caption = ?, url = ? where id = ?";

  connection.query(sql,[newName,newCaption,newUrl,id],function(err,res){
    if(err)
    {
      console.log(err)
    }
    // res.send("updated id is",id);
  })
})

app.delete('/deleteMeme/:id',function(req,res){
  const id=req.params.id;
  console.log("somethings happening")
  console.log("id is ",id)
  const sql= "DELETE FROM myMemes where id = ?";
  connection.query(sql,id,function(err,res){
    if(err)
    {

      console.log(err)
    }
    // res.send("deleted id is",id);
  })

})


// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())
// app.use(cors());
// const port=5000;
// mongoose.connect("mongodb+srv://volley_sum:Sumit@123@cluster0.ynmii.mongodb.net/memedatabase?retryWrites=true&w=majority",
//     {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongo DB connected"));
//     const memeSchema=new mongoose.Schema({
//         id:String,
//         name:String,
//         caption:String,
//         url:String
//       });
//       const memes=mongoose.model("meme",memeSchema);
//     app.get('/memes', async (req,res)=>{
//     //   let data,output;
//     // await memes.find((err,ans)=>{
//     //   if(!err)
//     //   {
//     //     data=ans;
//     //     output = data.map((key,index)=>{
//     //      return{
//     //       id:key.id,
//     //       name:key.name,
//     //       caption:key.caption,
//     //       url:key.url
//     //       }
//     //      })
//     //   }
//     //   else
//     //   {
//     //     output="Error occured";
//     //   }
      
//     //  })    
//     //  res.send(output);
    

// })

// app.put('/updateData',function(req,res){
//    let newId=req.body.id;
//    memes.findOne({id:newId},function(err,foundObject){
//      if(err) {
//        console.log("err is ",err);
//        res.status(500).send();
//      }
//      else{
//         if(foundObject){
//           res.status(404).send();
//         }
//         else
//         {
//           if(req.body.name)
//           {
//             foundObject.name=req.body.name;
//           }

//           if(req.body.caption)
//           {
//             foundObject.caption=req.body.caption;
//           }

//           if(req.body.url)
//           {
//             foundObject.url=req.body.url;
//           }
//         }

//         foundObject.save(function(err,updateObj){
//           if(err){
//             console.log(err);
//             res.status(500).send();
//           }
//           else
//           {
//             res.send(updateObj);
//           }
//         });
//      }
//    });
// });
// //to insert in database
// app.post('/memes',(req,res)=>{
//   const newId = uuidv4();
//   const obj={
//     id:newId,
//     name:req.body.name,
//     caption:req.body.caption,
//     url:req.body.url
//   }
//   memes.insertMany(obj);
//   const response=obj.id;
//   res.send(response);
// });
// //to update in database
// //api for Update data from database  
// // app.post("/updateData",function(req,res){   
// //   memes.findByIdAndUpdate(
// //     req.body.id, 
// //     {
// //        name:  req.body.name, 
// //        caption: req.body.caption,
// //        url: req.body.url
// //     },
// //     {new: true},   
// //  function(err,docs) {  
// //   if (err) {  
// //   console.log(err); 
// //   res.send(err);
// //   }
// //   else
// //   {  
// //     console.log("this docs" , docs)
// //   res.send({data:"Record has been Updated..!!"});  
// //   }  
// // });  
// //  })    

// app.listen(port,() =>console.log(`Server Started on Port ${port}`));