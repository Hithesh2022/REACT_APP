import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableRows from './Tablerows';
import TableButtons from './TableButton';


function Table(props) {
  {/* sets data from database */}
  const [data, setData] = useState([]);

  {/* check checkbox rows */}
  const [selectedRows, setSelectedRows] = useState([]);

//check if email is sent
  const [successMessage, setSuccessMessage] = useState('');

  // If no checkboxes are selected, show the message
  const [showMessage, setShowMessage] = useState(false);

  //get data from database
  useEffect(() => {
   
    axios.get('http://localhost:3001/')
      .then((response) => {
        setData(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //handle update button 
  const handleUpdate = (id, updatedData) => {
    console.log(id, updatedData);
    axios.put(`http://localhost:3001/${id}`, updatedData)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        // Update the data in the state after successful update
        setData((prevData) =>
          prevData.map((item) => (item._id === id ? { ...item, ...updatedData } : item))
        );
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const handleDelete = (id) => {
  
    axios.delete(`http://localhost:3001/${id}`)
      .then((response) => {
       
        console.log(response.data);
  
        axios.get('http://localhost:3001/')
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
       
        console.error(error);
      });
  };
  
  
   //check checkbox rows
    function  handleCheckboxChange  (event, id)  {
        const selectedRow = data.find((item) => item.ID === id);
        if (event.target.checked) {
          setSelectedRows((prevSelectedRows) => [...prevSelectedRows, selectedRow]);
        } else {
          setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.filter((row) => row.ID !== id)
          );
        }
      };


      useEffect(() => {
        console.log(selectedRows);
      }, [selectedRows]);



      const handleSendEmail = () => {
        if (selectedRows.length === 0) {
          // If no checkboxes are selected, show the message
          setShowMessage(true);
          setSuccessMessage('');
        } else {
        
        axios.post('http://localhost:3001/sendEmail', selectedRows)
        .then((response) => {
          console.log('Email sent successfully:', response.data);
        })
        
        .catch((error) => {
          console.error('Error sending email:', error);
        });
        setShowMessage(false);
        setSuccessMessage('Email sent successfully!');
        setTimeout(() => {
          // Reload the page
          window.location.reload();
        }, 1000);
      }
      };
      useEffect(() => {
      if (selectedRows.length > 0) {
        setShowMessage(false);
      }
    }, [selectedRows]);


  return (
   
    <div className="container mt-4">
       {showMessage && (
      <div style={{ color: 'red', textAlign: 'center' }}>
        Click checkbox to send
      </div>
    )}
    
    {successMessage && (
        <div style={{ color: 'green', textAlign: 'center' }}>
          {successMessage}
        </div>
      )}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>checkbox</th>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Hobbies</th>
            <th>Delete</th>
            <th>Update </th>
          </tr>
        </thead>
        <TableRows
          data={data}
          selectedRows={selectedRows}
          handleCheckboxChange={handleCheckboxChange}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </table>
      <TableButtons onClick={() => props.onClick()} handleSendEmail={handleSendEmail} />
    </div>
    
  );
}

export default Table;
