const express =require("express") //type: Commonjs | module


const app =express();



app.get("/",(req,res)=>{
    res.send("server is ready")
})









const port = 5000
app.listen(port,()=>{
    console.log(`server started at ${port}` );
    
})



