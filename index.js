const express = require("express");

const { connection } = require("./db");

const { userRoutes } = require("./Routes/users.route");
const { productRoutes } = require("./Routes/products.route");
const app = express();
app.use(express.json())

app.use("/users",userRoutes);
app.use("/products",productRoutes)


app.listen(8080, async()=>{
    try{
       await connection;
        console.log("server is Running at port 8080");
        console.log("DB is Connected")

    }catch(err){
        console.log(err)
    }
})