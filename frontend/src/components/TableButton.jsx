import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import AddBoxIcon from '@mui/icons-material/AddBox';
const TableButtons = ({ onClick, handleSendEmail }) => {
  return (
    <div className="d-flex justify-content-between mb-3">
      <button onClick={onClick} className="button"><AddBoxIcon/></button>
      <button className="btn btn-primary " onClick={handleSendEmail} >
        <EmailIcon/>
      </button>
    </div>
  );
};

export default TableButtons;
