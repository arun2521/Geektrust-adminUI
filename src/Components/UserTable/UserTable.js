import React, { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import "../UserTable/UserTable.css";

export default function UserTable({
  users,
  setUsers,
  currentPage,
  setCurrentPage,
  handleEdit,
}) {
  const [selectedRows, setSelectedRows] = useState([]);

  let itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);

  const isAllSelected = selectedRows.length === itemsPerPage;

  const handleSelectAll = (event, users) => {
    const isAllChecked = event.target.checked;

    if (isAllChecked) {
      const startIndex = (currentPage - 1) * itemsPerPage;

      let rowSelected = [];
      for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
        if (i < users.length) {
          rowSelected.push(users[i].id);
        } else {
          rowSelected.push(Math.random());
        }
        setSelectedRows(rowSelected);
      }
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((user) => user !== id));
    }
  };

  const handleDelete = (id) => {
    const updatedData = users.filter((ele) => ele.id !== id);

    const updatedTotalPages = Math.ceil(updatedData.length / itemsPerPage);
    if (currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages);
    }
    setUsers(updatedData);
    setSelectedRows([]);
  };

  const handleDeleteAllSelected = () => {
    if (selectedRows.length === 0) return;
    const updatedData = users.filter(
      (property) => !selectedRows.includes(property.id)
    );
    const updatedTotalPages = Math.ceil(updatedData.length / itemsPerPage);
    if (currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages);
    }
    setUsers(updatedData);
    setSelectedRows([]);
  };

  return (
    <div className="listing-table-container">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(event) => handleSelectAll(event, users)}
              />
            </th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user, index) => (
            <tr
              className={`table-row ${
                selectedRows.includes(user.id) ? "selected-row" : ""
              }`}
              key={user.id}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={(event) => handleRowSelect(event, user.id)}
                />
              </td>
              <td className="item-name">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="action-items">
                <FaEdit onClick={() => handleEdit(user)} />
                <RiDeleteBin2Fill onClick={() => handleDelete(user.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="user-deleteAll" onClick={handleDeleteAllSelected}>
        Delete Selected
      </button>
    </div>
  );
}
