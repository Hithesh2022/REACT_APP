import React from 'react';

const TableButtons = ({ onClick, handleSendEmail }) => {
  return (
    <div className="d-flex justify-content-between mb-3">
      <button onClick={onClick}>ADD</button>
      <button className="btn btn-primary" onClick={handleSendEmail}>
        Send Email
      </button>
    </div>
  );
};

export default TableButtons;
