const express=require('express');
const app=express();// express is in form of a class therefore we need to define it 

const port=3000;


app.use(express.json())

app.get("/",(req,res)=>{

    const {name,age}=req.query;   // extract name and age from the query

    res.send(`${name},${age}`);   // send the name and age as the response
    
});

app.post("/contact",(req,res)=>{

    const { name,phone,email }=req.body;  // you can also give name='Hari' to giv default name
    if(!name){
        res.status(400).json({message:'there is no name'})
    }

    res.status(200).json({message:`the name is ${name}, the phone is ${phone} and the mail is ${email}`});


});

app.listen(port,()=>{

    console.log(`The port running is ${port}`);

});

