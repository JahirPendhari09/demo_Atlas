const express = require("express");
const { UserModel } = require("../model/UserModel");

const userRoutes = express.Router();

//Get 

userRoutes.get("/",async (req,res)=>{
    try{
        const data = await UserModel.find(req.query);
        res.status(200).send(data)
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

//Post 

userRoutes.post("/add",async (req,res)=>{
    try{
        const data = new UserModel(req.body);
        await data.save();
        res.status(200).send({"new_user":req.body})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

// Patch 

userRoutes.patch("/update/:userID",async (req,res)=>{
    const {userID}= req.params
    try{
        await UserModel.findByIdAndUpdate({_id:userID},req.body)
        res.status(200).send({"new_user":"user Has been updated"})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

// Delete 

userRoutes.delete("/delete/:userID", async(req,res)=>{
    const {userID}=req.params;
    try{
        await UserModel.findByIdAndDelete({_id:userID});
        res.status(200).send({"msg":"User has been Deleted Succusseful"})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

module.exports ={userRoutes}