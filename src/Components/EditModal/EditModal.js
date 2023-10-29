import React, { useState } from "react";
import "../EditModal/EditModal.css";

export default function EditModal({ user, onClose, onSave }) {
  const [editingUser, setEditingUser] = useState({ ...user });
  const [formValid, setFormValid] = useState(true);

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    if (isFormValid()) {
      onSave(editingUser);
      onClose();
    }
  };

  const isFormValid = () => {
    const { name, email, role } = editingUser;
    const isValid =
      name.trim() !== "" && role.trim() !== "" && emailPattern.test(email);
    setFormValid(isValid);
    return isValid;
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Details</h2>
        <label>NAME: </label>
        <input
          type="text"
          name="name"
          value={editingUser.name}
          onChange={handleInputChange}
          required
        />
        <label>EMAIL: </label>
        <input
          type="text"
          name="email"
          value={editingUser.email}
          onChange={handleInputChange}
          required
        />
        <label>ROLE: </label>
        <input
          type="text"
          name="role"
          value={editingUser.role}
          onChange={handleInputChange}
          required
        />
        {!formValid && (
          <div className="validation-error">Please fill out all Details.</div>
        )}
        <div className="modal-buttons">
          <button type="submit" onClick={handleSave}>
            Save
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
