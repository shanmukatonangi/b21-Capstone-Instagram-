const mongoose=require("mongoose")



const UserSchema = new mongoose.Schema({

username:{                                  
    type:String,
    required:true,
    unique:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
profilePicture:{
    type:String,
},
bio:{
    type:String,
    default:""
},
followers:{
    type:Array,    
},
followings:{
    type:Array
}





})

// {
//     username:"Shanmukh",
//     email:"shanmukh@gmail.com",
//     password:"shanmukh",
//     profilePicture:"shanmukh.jpg",
//     bio:"shanmukh is a good boy",
//     followers:["joe","sink"],
//     followings:["joe","sink"]
// }


module.exports= mongoose.model("User",UserSchema)