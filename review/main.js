const express=require('express');
const app=express();// express is in form of a class therefore we need to define it 

const port=3000;

app.get("/",(req,res)=>{

    res.send("Welcome");
})

app.listen(port,()=>{

    console.log(`The port running is ${port}`);

});

