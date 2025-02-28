import React, { useEffect, useState } from 'react'
import axios from 'axios';;
import { API_URL } from '../../Api/server.js';
import toast from 'react-hot-toast';

const SignUp = () => {

  const [users, setUsers] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    batch: "",
    year: "",
    phone: "",
    password: "",
    role: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChange = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setFormData({
       ...formData,
        [name]: value,
    })

  };

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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/user/register`, 
      formData, { 
        withCredentials: true
      });
      setFormData({
        name: "",
        email: "",
        batch: "",
        year: "",
        phone: "",
        password: "",
        role: ""
      });
      toast.success("User Added Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }

  }

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this timeslot?")
    if (confirm) {
      try {
      await axios.delete(`${API_URL}/college/timeslot/${id}`, {
        withCredentials: true,
      });
      fetchTimeSlot();
      } catch (error) {
        console.error("Error deleting timeslot:", error);
      }
    }
  };

  // Populate form for editing
  const handleEdit = (user) => {
    setFormData({ 
      name: "",
      email: "",
      batch: "",
      year: "",
      phone: "",
      password: "",
      role: ""
    });
    setEditMode(true);
    setCurrentId(timeslot._id);
  };

  return (
    <>
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold mb-6 text-center text-red-500">*Incomplete*</h1>
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">User Management</h1>

        <form 
          onSubmit={handleSignUp} 
          className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
        >
          <div className='flex items-center justify-between gap-5 w-full'>
            <div className="w-full mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex items-center justify-between gap-5 w-full'>
            <div className='w-full mb-5'>
              <label
                htmlFor="batch"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Batch
              </label>
              <select
                id="batch"
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                className="block w-full p-2.5 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Batch</option>
                <option value="BSc IT">BSc IT</option>
                <option value="BSc CS">BSc CS</option>
                <option value="BSc GS">BSc GS</option>
              </select>
            </div>
            <div className='w-full mb-5'>
              <label
                htmlFor="year"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Year
              </label>
              <select
                id="year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="block w-full p-2.5 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Year</option>
                <option value="FY">FY</option>
                <option value="SY">SY</option>
                <option value="TY">TY</option>
              </select>
            </div>
          </div>
          <div className='flex items-center justify-between gap-5 w-full'>
            <div className='w-full mb-5'>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Phone No
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                placeholder="Enter Your Phone No"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='w-full mb-5'>
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="management">Management</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>

          </div>
          <div className="flex items-center justify-between w-full">
            <button
              type="submit"
              className="bg-test2-3 hover:bg-test2-2 text-offwhite-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {editMode ? "Update User Details" : "Add User"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData({ 
                    name: "",
                    email: "",
                    batch: "",
                    year: "",
                    phone: "",
                    password: "",
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

        </form>

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
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th>
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
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default SignUp