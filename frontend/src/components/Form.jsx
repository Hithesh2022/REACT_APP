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
          
            console.log(response.data);
           
          })
          .catch((error) => {
            
            console.error(error);
           
          });
          setFormData({
            name:"",
            email:"",
            mobilenumber:"",
            hobbies:"",
            });
            window.location.reload();

      }

  return (
    <div className="container mt-5">
    <div className="card p-3">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Name</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Email</label>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Mobile Number</label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              placeholder="Enter your mobile number"
              name="mobilenumber"
              value={formData.mobilenumber}
              pattern="[0-9]{10}"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Hobbies</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your hobbies"
              name="hobbies"
              required
              value={formData.hobbies}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary" style={{ width: '150px' }}>SAVE</button>
        </div>
      </form>
    </div>
  </div>
  );
}
export default Form;
