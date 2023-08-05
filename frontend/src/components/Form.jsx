import React ,{useState} from "react";
import axios from "axios";

function Form() {
const [formData,setFormData]=useState({
    name:"",
    email:"",
    mobilenumber:"",
    hobbies:"",
    });

    function handleChange (event){
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
       
      }
      function handleSubmit(event){
        console.log(formData);
        event.preventDefault();
        axios.post("http://localhost:3001/",formData) 
        .then((response) => {
            // Handle the response if needed
            console.log(response.data);
            // Display a success message or perform other actions here
          })
          .catch((error) => {
            // Handle errors if necessary
            console.error(error);
            // Display an error message or perform other error-handling actions here
          });
          setFormData({
            name:"",
            email:"",
            mobilenumber:"",
            hobbies:"",
            });

      }

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <label>NAME</label>
    <input type="text" placeholder="Enter your name"  onChange={handleChange} value={formData.name} name="name"/>
        <label>EMAIL</label>
        <input type="email" placeholder="Enter your email"  onChange={handleChange} value={formData.email} name="email"/>
        <label>MOBILE NUMBER</label>
        <input type="number" placeholder="Enter your mobile number" onChange={handleChange} value={formData.mobilenumber} name="mobilenumber" />
       <label>HOBBIE</label>
        <input type="text" placeholder="Enter your HOBBIES" onChange={handleChange} value={formData.hobbies} name="hobbies"/>
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
}
export default Form;