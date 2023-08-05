require('dotenv').config();
const express=require('express');
const body=require('body-parser');
const mongoose=require('mongoose');
const app=express();
const cors=require('cors');
const port=process.env.PORT || 3001;
app.use(cors());//using cros to connect frontend and backend
app.use(body.urlencoded({extended:true}));
app.use(body.json());//using body parser json  to parse the json  data
//connecting to mongodb using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1',{useNewUrlParser:true,useUnifiedTopology:true})   
//creating schema for the database
const UsersSchema={
    name:String,
    email:String,
    mobilenumber:Number,
    hobbies:String,
}
const Users=mongoose.model('User',UsersSchema);
app.post('/',async(req,res)=>{   
    try {
        const user = new Users({
          name: req.body.name,
          email: req.body.email,
          mobilenumber: req.body.mobilenumber,
          hobbies: req.body.hobbies,
        });
    
         await user.save();
        console.log('Data saved');
        console.log(req.body);
        res.status(200).send('Data saved successfully.');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error saving data.');
      }
    });
    

app.listen(port,()=>{
    console.log('Server is running on port '+port);
}   
)