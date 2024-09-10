const router = require("express").Router()
const User = require("../Models/Usermodel")



// router.get("/create",(req,res)=>{   //localhost:8888/api/ig/profile/craete
//     res.send("hello")
// })

router.get("/:name",async(req,res)=>{   
    try {
        const user = await User.findOne({username:req.params.name}) //stark  //user =  !true = flase   !false= true
        if(!user) return res.status(404).send("user not found")
            res.send(user)
        
    } catch (error) {
        
    }
})


router.put("/edit/:id",async(req,res)=>{   //localhist:8888/api/ig/profile/edit/:id = localhost:8888/api/ig/profile/edit/66d728836e753535861a23ce
    try{
        const id= req.params.id;
        await User.findByIdAndUpdate(id,req.body)
res.send("profile updated")

    }
    catch (error) {
        
    }
})

router.delete("/delete/:id",async(req,res)=>{   //localhist:8888/api/ig/profile/edit/:id = localhost:8888/api/ig/profile/edit/66d728836e753535861a23ce
    try{
        const id= req.params.id;
        await User.findByIdAndDelete(id)
res.send("profile deleted")

    }
    catch (error) {
        
    }
})

router.put("/follow/:id",async(req,res)=>{  //localhost:8888/api/ig/profile/follow/66d728836e753535861a23ce==localhost:8888/api/ig/profile/follow/:id
    try {
        const usertobefollowed= await User.findById(req.params.id)  //aadi
        const currentuser = await User.findById(req.body.userid)  //saiteja

        if(!usertobefollowed.followers.includes(req.body.userid)){
            await usertobefollowed.updateOne({$push:{followers:req.body.userid}})
            await currentuser.updateOne({$push:{followings:req.params.id}})

            res.send("profile followed")
        }else{
            res.send("profile already followed")
        }



        
    } catch (error) {
        
    }
})


router.put("/unfollow/:id",async(req,res)=>{  //localhost:8888/api/ig/profile/follow/66d728836e753535861a23ce==localhost:8888/api/ig/profile/follow/:id
    try {
        const usertobeunfollowed= await User.findById(req.params.id)  //aadi
        const currentuser = await User.findById(req.body.userid)  //saiteja

        if(usertobeunfollowed.followers.includes(req.body.userid)){
            await usertobeunfollowed.updateOne({$pull:{followers:req.body.userid}})
            await currentuser.updateOne({$pull:{followings:req.params.id}})

            res.send("profile unfollowed")
        }else{
            res.send("profile already unfollowed")
        }



        
    } catch (error) {
        
    }
})

module.exports = router