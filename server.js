const express = require("express");
const cors = require("cors");

const client = require('./config/db')
const client2 = require('./config/db2')
const app = express();


app.use(cors({
    origin:"*"
}));


// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
//db initialize
app.get("/",(req,res)=>{
   res.send("Kavin Kumar nodejs backend");
})



client.connect();

//POST API New User
app.post("/newuser",(req, res)=>{
 
  console.log(req.body.firstname);
  client.query(`INSERT INTO public."Student"(
     firstname, lastname)
    VALUES ( '${req.body.firstname}', '${req.body.lastname}');`, (err, result)=>{
      if(!err){
          res.send(result.rows);
          
      }
     
  });
 //client.end();
})


app.get("/users",(req, res)=>{
//  client.connect();
  client.query(`SELECT id, firstname, lastname
	FROM public."Student";`, (err, result)=>{
      if(!err){
          res.send(result.rows);
          
      }
     
  });
 //client.end();
})

 client2.connect();
//POST API Adding new user for book rent
app.post("/newbookuser",(req, res)=>{
 client2.query(`INSERT INTO public."Books"(
    authorname, borrowedby, dateofborrow, returndate)
   VALUES ( '${req.body.authorname}', '${req.body.borrowedby}', '${req.body.dateofborrow}', '${req.body.returndate}');`, (err, result)=>{
      if(!err){
          res.send(result.rows);
          console.log(req.body);
      }
      else{
        res.send(err);
      }
  });
  // client2.end();
})





// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});