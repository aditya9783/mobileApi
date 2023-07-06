let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
    res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port = process.env.PORT || 2410
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
let mysql=require("mysql");
let {mobiles}=require("./mobileData");
let conData={
    host:"localhost",
    user:"root",
    password:"",
    database:"test"
}
// let connection=mysql.createConnection(conData);
// let sql="INSERT INTO mobiles2 (name,price,brand,RAM,ROM,OS) VALUES ?";
// let arr=mobiles.map((mob)=>[mob.name,mob.price,mob.brand,mob.RAM,mob.ROM,mob.OS])
// connection.query(sql,[arr],function(err,result){
//     if(err) console.log(err);
//     else console.log(result);
// });

app.get("/mobiles/:name",function(req,res){
  let name=req.params.name;
  let connection=mysql.createConnection(conData);
  let sql="SELECT * FROM mobiles2 where name=?";
  connection.query(sql,name,function(err,result){
      if(err) console.log(err);
      else res.send(result)
  })
});
app.get("/mobiles",function(req,res){
  let brand=req.query.brand;
  let RAM=req.query.RAM;
  let ROM=req.query.ROM
    let connection=mysql.createConnection(conData);
    let options="";
    let optionArr=[];
    if(brand){
      let brandArr=brand.split(",");
      options= options ?  `${options} AND Brand IN (?)`  : " WHERE brand IN (?)";
      optionArr.push(brandArr);
    }
    if(RAM){
      let RAMArr=RAM.split(",");
      options=options ?  `${options} AND RAM IN (?)`  :" WHERE RAM IN (?)";
      optionArr.push(RAMArr);
    }
    if(ROM){
      let ROMArr=ROM.split(",");
      options=options ?  `${options} AND ROM IN (?)`  :" WHERE ROM IN (?)";
      optionArr.push(ROMArr);
    }

    let sql=`SELECT * FROM mobiles2 ${options}`;
    connection.query(sql,optionArr,function(err,result){
        if(err) console.log(err);
        else res.send(result)
    })
});


app.get("/mobiles/brand/:brand",function(req,res){
  let brand=req.params.brand;
  let connection=mysql.createConnection(conData);
  let sql="SELECT * FROM mobiles2 where brand=?";
  connection.query(sql,brand,function(err,result){
      if(err) console.log(err);
      else res.send(result)
  })
});

app.get("/mobiles/RAM/:RAM",function(req,res){
  let RAM=req.params.RAM;
  let connection=mysql.createConnection(conData);
  let sql="SELECT * FROM mobiles2 where RAM=?";
  connection.query(sql,RAM,function(err,result){
      if(err) console.log(err);
      else res.send(result)
  })
});

app.get("/mobiles/ROM/:ROM",function(req,res){
  let ROM=req.params.ROM;
  let connection=mysql.createConnection(conData);
  let sql="SELECT * FROM mobiles2 where ROM=?";
  connection.query(sql,ROM,function(err,result){
      if(err) console.log(err);
      else res.send(result)
  })
});

app.get("/mobiles/OS/:OS",function(req,res){
  let OS=req.params.OS;
  let connection=mysql.createConnection(conData);
  let sql="SELECT * FROM mobiles2 where OS=?";
  connection.query(sql,OS,function(err,result){
      if(err) console.log(err);
      else res.send(result)
  })
});

app.post("/newMobile",function(req,res){
    let body=req.body
    let connection=mysql.createConnection(conData);
    let sql="INSERT INTO mobiles2 (name,price,brand,RAM,ROM,OS) VALUES (?,?,?,?,?,?)";
    let params=[body.name,body.price,body.brand,body.RAM,body.ROM,body.OS];
    connection.query(sql,params,function(err,result){
        if(err) console.log(err);
        else{
            res.send(result)
        }
    })
});

app.put("/mobiles/:name/edit",function(req,res){
  let name=req.params.name;
  let body=req.body;
  let connection=mysql.createConnection(conData);
  let sql="UPDATE mobiles2 SET name=?,price=?,brand=?,RAM=?,ROM=?,OS=? WHERE name=?";
  let params=[body.name,body.price,body.brand,body.RAM,body.ROM,body.OS,name];
  connection.query(sql,params,function(err,result){
    if(err){
      console.log(err);
      res.status(404).send("No Mobile Found")
    }
    else{
      console.log(result);
      res.send(result)
    }
  })

});
app.delete("/mobiles/:name/delete",function(req,res){
  let name=req.params.name
  let connection= mysql.createConnection(conData);
  let sql= "Delete From mobiles2 where name=?";
  connection.query(sql,name,function(err,result){
    if(err) {
      console.log(err);
      res.status(404).send("No Mobile Found");
    }
    else{
      res.send(result)
    }
  })
})