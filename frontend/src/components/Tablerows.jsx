import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "../App.css"
import 'material-icons/iconfont/material-icons.css';
const TableRows = ({ data, selectedRows, handleCheckboxChange, handleDelete }) => {
  return (
    <tbody>
      {data.length === 0 ? (
        // Placeholder row when data array is empty
        <tr>
          <td colSpan="7" style={{ textAlign: "center" }}>
            Press on + to Add
          </td>
        </tr>
      ) : (
        // Regular rows when data array is not empty
        data.map((item) => (
          <tr key={item._id}>
            <td>
              <input
                type="checkbox"
                onChange={(event) => handleCheckboxChange(event, item.ID)}
                checked={selectedRows.some((row) => row.ID === item.ID)}
              />
            </td>
            <td>{item.ID}</td>
            <td>{item.name}</td>
            <td>{item.mobilenumber}</td>
            <td>{item.email}</td>
            <td>{item.hobbies}</td>
            <td>
              <button onClick={() => handleDelete(item._id)} className="button">
                <DeleteIcon />
              </button>
              {/*  */}
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TableRows;
