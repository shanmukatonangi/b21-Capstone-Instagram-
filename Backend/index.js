const express = require("express")
const app = express()
const helmet=require("helmet")
const morgan = require("morgan")
const AuthRoute = require("./Routes/Auth")
const userRoute = require("./Routes/User")
const mongoose = require('mongoose');

app.use(express.json())
app.use(morgan("common"))
app.use(helmet());



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://b21:b21@cluster0.8gkub.mongodb.net/',console.log("DB CONNECTED"));
}

app.use("/api/ig/auth",AuthRoute)  //localhost:8888/api/ig/auth/jfzkjdkjgseousroih
app.use("/api/ig/profile",userRoute)

app.listen(8888,()=>{
    console.log("server is running on port 8888")
})