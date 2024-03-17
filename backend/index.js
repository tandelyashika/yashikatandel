const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));


const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));

  //schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
  });
  
//
const usersModel = mongoose.model("user", userSchema);



//api
app.get("/", (req, res) => {
    res.send("Server is running");
  });
  
  //sign up
  app.post("/signup",async(req,res) =>{
    try{
      const { email } = req.body;
      const existingUser =await usersModel.findOne({email: email});

      if(existingUser){
        res.send({ message: "email id is already registered", alert:false});
      }else{
        const data = new usersModel(req.body);
        const saveUser = await data.save();
        res.send({ message: "successfully signed up", alert: true});
      }
      } catch(err){
        console.error(err);
        res.status(500).send({ message: "server error"});
      }
  });

  //api login
  app.post("/login", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
  
    try {
      const result = await usersModel.findOne({ email: email });
  
      if (result) {
        const dataSend = {
          _id: result._id,
           firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
        console.log(dataSend)
        res.send({ message: "Login is successful", alert: true,data : dataSend});
      } else {
        res.send({ message: "User not found , please sign up", alert: false });
      }
    } catch (err) {
      console.error("Error while searching for user:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  });
  

  //product section


  const schemaProduct = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    price : String,
    description : String,
  });
  const productModel = mongoose.model("product",schemaProduct)

  //save product in data
  //api
  app.post("/uploadProduct",async(req,res)=>{
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "upload successsfully"})
  })

//
app.get("/product", async (req, res) => {
  try {
    const data = await productModel.find({});
    res.json(data); // Send the JSON response directly
  } catch (error) {
    // Handle errors, e.g., send an error response with a status code
    res.status(500).json({ error: "Internal server error" });
  }
});

//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));