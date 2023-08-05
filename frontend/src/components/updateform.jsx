import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function UpdateForm() {
  const history = useHistory();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    hobbies: "",
  });

  useEffect(() => {
    // Fetch data for the specified ID and populate the form
    axios
      .get(`http://localhost:3001/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Performing the PATCH request with the updated data
    axios
      .patch(`http://localhost:3001/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        // Redirecting  back to the table after successful update
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card p-3">
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary" style={{ width: '150px' }}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
