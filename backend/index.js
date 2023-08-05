require('dotenv').config();
const express=require('express');
const body=require('body-parser');
const mongoose=require('mongoose');
const app=express();
const cors=require('cors');
const nodemailer = require('nodemailer');
const port=process.env.PORT || 3001;
app.use(cors());//using cros to connect frontend and backend
app.use(body.urlencoded({extended:true}));
app.use(body.json());//using body parser json  to parse the json  data
//connecting to mongodb using mongoose
const password=process.env.PASSWORD;
mongoose.connect(`mongodb+srv://admin:${password}@cluster0.lwpeyjs.mongodb.net/mydatabase?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true})   
//creating schema for the database
const UsersSchema={
    ID:Number,
    name:String,
    email:String,
    mobilenumber:Number,
    hobbies:String,
}
let id=1;
const Users=mongoose.model('User',UsersSchema);
app.post('/',async(req,res)=>{   
    try {
        const user = new Users({
            ID:id,
          name: req.body.name,
          email: req.body.email,
          mobilenumber: req.body.mobilenumber,
          hobbies: req.body.hobbies,
        });
        id++;
         await user.save();
        console.log('Data saved');
        console.log(req.body);
        res.status(200).send('Data saved successfully.');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error saving data.');
      }
    });

    app.get('/',async(req,res)=>{
        try{
            const user=await Users.find();
            res.json(user);
            console.log(user);
        }
        catch(err){
            res.json({message:err});
        }
    }
    )
    app.delete('/:id',async(req,res)=>{
        const userId = req.params.id;
        try {
          // Find the user by ID and remove it
          const deletedUser = await Users.findByIdAndRemove(userId);
          
          if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
          
          res.json({ message: 'User deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error deleting user' });
        }
    }
    )
    app.patch('/:id',async(req,res)=>{
    
        const ID = req.params.id;
        console.log(ID);
        try {
            const Id= Number(ID);
            console.log(Id);
            console.log(req.body);
        const result=await Users.updateOne( { ID: Id }, { $set: req.body } );
        
        console.log(result);
        if(result)
        res.send('Updated successfully');
        else
        res.send('Not updated');
        }
        catch(err){ 
            console.log(err);
            res.status(500).json({ message: 'Error updating user' });
        }
    }
    )

    app.post('/sendEmail', (req, res) => {
        // Get the data from the request body
        const data = req.body;
      console.log(data);
        
        const transporter = nodemailer.createTransport({
          service:'Gmail',
          auth: {
            user: process.env.USER, 
            pass: process.env.PASS, 
          }
        });
      
       
        const mailOptions = {
          from: process.env.USER, // 
          to: 'hitheshkp100@gmail.com', 
          subject: 'Selected Data',
          text: JSON.stringify(data, null, 2), 
        };
      
        // Sending  the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending email' });
          } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
          }
        });
      });
      
    

app.listen(port,()=>{
    console.log('Server is running on port '+port);
}   
)