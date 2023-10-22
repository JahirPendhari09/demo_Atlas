const express = require("express");
const { ProductModel } = require("../model/ProductModel");

const productRoutes = express.Router();

productRoutes.get("/", async(req,res)=>{
    try{
        const products = await ProductModel.find(req.query);
        res.status(200).send(products)
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

productRoutes.post("/add", async(req,res)=>{
    try{
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.status(200).send({"msg":"New Product has been added", "new_user":req.body})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

productRoutes.patch("/update/:productID",async (req,res)=>{
    const {productID}= req.params
    try{
        await ProductModel.findByIdAndUpdate({_id:productID},req.body)
        res.status(200).send({"new_user":"Product Has been updated"})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})


productRoutes.delete("/delete/:productID", async(req,res)=>{
    const {productID}=req.params;
    try{
        await ProductModel.findByIdAndDelete({_id:productID});
        res.status(200).send({"msg":"Product has been Deleted Succusseful"})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

module.exports = {productRoutes}