const router = require("express").Router()
const Post = require("../Models/Postmodel")


// router.get("/shanmukh",(req,res)=>{  //localhsot:8888/api/ig/post/shanmukh
//     res.send("shanmukh")
// })

router.post("/create",async(req,res)=>{
    try{
        await new Post(req.body).save()
        res.send("posted")


    }catch(err){

    }

})    //localhsot:8888/api/ig/post/create

router.put("/edit/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)

        if(post.userid == req.body.userid){
            await post.updateOne({$set:req.body})
            res.send("updated")
        }
        

    }catch(err){

    }

})

router.delete("/delete/:id", async(req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.send("deleted")
        
    } catch (error) {
        
    }
})

router.put("/like/:id",async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userid)){
            await post.updateOne({$push:{likes:req.body.userid}})
            res.send("liked")
        }else{
            await post.updateOne({$pull:{likes:req.body.userid}})
            res.send("unliked")
        }
        
    } catch (error) {
        
    }
})

module.exports=router