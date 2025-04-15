import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { deleteUser, getUsers } from "../../services/usersApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Add from "../../components/add/Add";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setIsOpen] = useState(false);
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getUsers,
  });

  const handleOpen = (val: boolean) => {
    setIsOpen(val);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="users">
      <div className="info">
        <h1>All Users</h1>
        <button onClick={() => handleOpen(true)}>Add New User</button>
      </div>
      {users && (
        <DataTable
          slug="User"
          columns={columns}
          rows={users}
          onDelete={deleteUser}
        />
      )}
      {open && <Add slug="User" columns={columns} setOpen={handleOpen} />}
    </div>
  );
};

export default Users;
