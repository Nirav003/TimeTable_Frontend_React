import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../Api/server";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ 
    name : "",
    email : "",
    batch : "",
    year : "",
    division: "",
    phone : "",
    role: ""
   });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/users`, {
        withCredentials: true,
      });
      // console.log(response.data.user);
      setUsers(response.data.user)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editMode) {
//         await axios.patch(
//           `${API_URL}/user/users/${currentId}`,
//           formData,
//           { withCredentials: true }
//         );
//       }
//       setFormData({ 
//         name : "",
//         email : "",
//         batch : "",
//         year : "",
//         division: "",
//         phone : "",
//         role: ""
//        });
//       setEditMode(false);
//       setCurrentId(null);
//       fetchUsers();
//     } catch (error) {
//       console.error("Error saving user:", error);
//     }
//   };

  // Handle delete
//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this user?")
//     if (confirm) {
//       try {
//       await axios.delete(`${API_URL}/user/ussers/${id}`, {
//         withCredentials: true,
//       });
//       fetchUsers();
//       } catch (error) {
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

  // Populate form for editing
//   const handleEdit = (user) => {

//     const data = {
//         role: user.role || "student",
//         division: user.division || null
//     }

//     setFormData({ 
//         name : user.name,
//         email : user.email,
//         batch : user.batch,
//         year : user.year,
//         division: data.division,
//         phone : user.phone,
//         role: data.role
//     });
//     setEditMode(true);
//     setCurrentId(user._id);
//   };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">User Management</h1>

      {/* Form */}
      {/* <form
        onSubmit={handleSubmit}
        className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="w-full">
          <label
            htmlFor="division"
            className="block text-gray-700 text-sm font-bold mb-2"
            >
            Division
          </label>
        </div>
        <div className="mb-4 w-full flex items-center justify-between">
        <div className="w-1/2">
          <input
            type="text"
            id="division"
            value={formData.division}
            onChange={(e) => setFormData({ division: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter division (e.g., A, B, etc)"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-test2-3 hover:bg-test2-2 text-offwhite-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editMode ? "Update Division" : "Add Division"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setFormData({
                    name : "",
                    email : "",
                    batch : "",
                    year : "",
                    division: "",
                    phone : "",
                    role: ""
                });
                setCurrentId(null);
              }}
              className="ml-4 bg-red-500 hover:bg-red-700 text-offwhite-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </div>
        </div>
      </form> */}

      {/* User List */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Name
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Email
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Batch
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Year
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Phone
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Role
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Division
              </th>
              {/* <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {user.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {user.email}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {user.batch}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {user.year}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {user.phone}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {user.role}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    {user.division ? user.division : "No Division"}
                </td>
                {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button
                    onClick={() => handleEdit(division)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(division._id)}
                    className="text-red-500 hover:text-red-700 font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users
