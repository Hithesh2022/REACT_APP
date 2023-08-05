import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableRows from './Tablerows';
import TableButtons from './TableButton';


function Table(props) {
  const [data, setData] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
   
    axios.get('http://localhost:3001/')
      .then((response) => {
        setData(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



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
        
        axios.post('http://localhost:3001/sendEmail', selectedRows)
        .then((response) => {
          console.log('Email sent successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
      };




  return (
    <div className="container mt-4">
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
          </tr>
        </thead>
        <TableRows
          data={data}
          selectedRows={selectedRows}
          handleCheckboxChange={handleCheckboxChange}
          handleDelete={handleDelete}
        />
      </table>
      <TableButtons onClick={() => props.onClick()} handleSendEmail={handleSendEmail} />
    </div>
    
  );
}

export default Table;
