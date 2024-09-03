const router = require("express").Router()
const User = require("../Models/Usermodel")
const bcrypt = require("bcrypt")





router.post("/register", async(req,res)=>{     //localhost:8888/api/ig/auth/register
  try{

    //req.body.password=123456
    const salt = await bcrypt.genSalt(10)
    const bcryptedpassword=await bcrypt.hash(req.body.password,salt)

  await  new User({
        username:req.body.username,
        email:req.body.email,
        password:bcryptedpassword
       }).save()

res.send("Account Created")

  }catch(err){
    res.status(404).send(err)
  }
   
})

router.post("/login", async(req,res)=>{
  try {
    const user= await User.findOne({email:req.body.email}) //"shanmukh@gmail.com" user=  falsy   !false= true
//     {        
// _id:66d72d340f0c629e6864910d
// username:"shanmukh"
// email:"shanmukh@gmail.com"
// password:"$2b$10$XnXfGB0HVA60U5ump55ViOVC.fbzGSlmtkZRU3U97CFT91yShik6G"
// bio:""
// followers:Array (empty)
// followings:Array (empty)
//  }
    if(!user) return res.status(404).send("User Not Found")

        const validpassword = await bcrypt.compare(req.body.password,user.password)  //bcrypt.compare(qwertyuiop,$2b$10$XnXfGB0HVA60U5ump55ViOVC.fbzGSlmtkZRU3U97CFT91yShik6G)  // false
        if(!validpassword) return res.status(404).send("Invalid Password")
            res.send("Logged In")
    
  } catch (error) {
    res.status(404).send(error)
  }
})

module.exports=router