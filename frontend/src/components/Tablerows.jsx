import React,{useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "../App.css"
import 'material-icons/iconfont/material-icons.css';

const EditableField = ({ value, isEditing, onChange }) => {
  return isEditing ? (
    <input type="text" value={value} onChange={onChange} />
  ) : (
    <span>{value}</span>
  );
};

const TableRow = ({
  item,
  selectedRows,
  handleCheckboxChange,
  handleDelete,
  handleUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(item);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    handleUpdate(item._id, editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(item);
  };

  return (
    <tr key={item._id}>
      <td>
        <input
          type="checkbox"
          onChange={(event) => handleCheckboxChange(event, item.ID)}
          checked={selectedRows.some((row) => row.ID === item.ID)}
        />
      </td>
      <td>{item.ID}</td>
      <td>
        <EditableField
          value={editedData.name}
          isEditing={isEditing}
          onChange={(event) =>
            setEditedData({ ...editedData, name: event.target.value })
          }
        />
      </td>
      <td>
        <EditableField
          value={editedData.mobilenumber}
          isEditing={isEditing}
          onChange={(event) =>
            setEditedData({ ...editedData, mobilenumber: event.target.value })
          }
        />
      </td>
      <td>
        <EditableField
          value={editedData.email}
          isEditing={isEditing}
          onChange={(event) =>
            setEditedData({ ...editedData, email: event.target.value })
          }
        />
      </td>
      <td>
        <EditableField
          value={editedData.hobbies}
          isEditing={isEditing}
          onChange={(event) =>
            setEditedData({ ...editedData, hobbies: event.target.value })
          }
        />
      </td>
      <td>
        <button onClick={() => handleDelete(item._id)} className="button">
          <DeleteIcon />
        </button>
      </td>
      <td>
        {isEditing ? (
          <>
            <button onClick={handleSave} className="button">
              Save
            </button>
            <button onClick={handleCancel} className="button">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleEdit} className="button">
            Update
          </button>
        )}
      </td>
    </tr>
  );
};

const TableRows = ({ data, selectedRows, handleCheckboxChange, handleDelete, handleUpdate }) => {
  return (
    <tbody>
      {data.length === 0 ? (
        // Placeholder row when data array is empty
        <tr>
          <td colSpan="8" style={{ textAlign: "center" }}>
            Press on + to Add
          </td>
        </tr>
      ) : (
        // Regular rows when data array is not empty
        data.map((item) => (
          <TableRow
            key={item._id}
            item={item}
            selectedRows={selectedRows}
            handleCheckboxChange={handleCheckboxChange}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))
      )}
    </tbody>
  );
};
export default TableRows;
