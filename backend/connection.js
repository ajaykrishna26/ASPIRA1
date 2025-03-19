var mongoose =require('mongoose')

require('dotenv').config();

mongoose.connect('mongodb+srv://ajaykrishnapr45:ajaykrishna@cluster0.lnyso.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("connected to db")
})
.catch((err)=>{
    console.log(err)
})
