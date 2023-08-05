import React from 'react';

const TableRows = ({ data, selectedRows, handleCheckboxChange, handleDelete }) => {
  return (
    <tbody>
      {data.map((item) => (
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
            <button onClick={() => handleDelete(item._id)}>Delete</button>
            {/*  */}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableRows;
