import React from "react";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin2Line } from "react-icons/ri";
import "../UserTable/UserTable.css";

export default function UserRow({
  user,
  selected,
  handleRowSelect,
  handleEdit,
  handleDelete,
}) {
  return (
    <tr className={`table-row ${selected ? "selected-row" : ""}`} key={user.id}>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={(event) => handleRowSelect(event, user.id)}
        />
      </td>
      <td className="item-name">{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td className="action-items">
        <TbEdit onClick={() => handleEdit(user)} />
        <RiDeleteBin2Line onClick={() => handleDelete(user.id)} />
      </td>
    </tr>
  );
}
