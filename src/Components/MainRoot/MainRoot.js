import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import PaginationLogic from "../PaginationLogic/PaginationLogic";
import UserTable from "../UserTable/UserTable";
import EditModal from "../EditModal/EditModal";
import "../MainRoot/MainRoot.css";

export default function MainRoot() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedUser, setEditedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  let itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.backendEndpoint}`);
        const data = response.data;
        // console.log(data);
        setUsers(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataLoaded(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Update the total pages whenever the search results change
    setTotalPages(Math.ceil(users.length / itemsPerPage));
  }, [users]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
    setIsSearching(!!searchTerm);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEdit = (item) => {
    setEditedUser(item);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (editUser) => {
    const updatedData = [...users];

    const indexToBeEdited = updatedData.findIndex(
      (user) => user.id === editUser.id
    );

    if (indexToBeEdited !== -1) {
      updatedData[indexToBeEdited] = editUser;
      setUsers(updatedData);
    }
    setEditedUser(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditedUser(null);
  };

  // Filter the users based on search term
  const filteredUsers = users.filter((user) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTermLower) ||
      user.email.toLowerCase().includes(searchTermLower) ||
      user.role.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className="main-root">
      <input
        className="search-bar"
        type="text"
        placeholder="Search by name, email, or role"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {dataLoaded ? (
        <>
          {filteredUsers.length > 0 ? (
            <UserTable
              users={filteredUsers}
              setUsers={setUsers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleEdit={handleEdit}
            />
          ) : (
            <div className="error-message">No such details found 😔</div>
          )}
        </>
      ) : (
        <div className="error-message">No Details Found 😔</div>
      )}

      <PaginationLogic
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isSearching={isSearching}
      />
      {isEditModalOpen && (
        <EditModal
          user={editedUser}
          onSave={handleEditSave}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}
