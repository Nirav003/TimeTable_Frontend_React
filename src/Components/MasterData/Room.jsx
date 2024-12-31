import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../server";

const Room = () => {

  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ 
    roomType: "",
    floor: "",
    room_no: "",
    dimensions: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all rooms
  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/rooms`, {
        withCredentials: true,
      });
      // console.log(response.data.room);
      
      setRooms(response.data.room);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(
          `${API_URL}/college/room/${currentId}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(`${API_URL}/college/create-room`, formData, {
          withCredentials: true,
        });
      }
      setFormData({ 
        roomType: "",
        floor: "",
        room_no: "",
        dimensions: "",  
      });
      setEditMode(false);
      setCurrentId(null);
      fetchRooms();
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this room?")
    if (confirm) {
      try {
      await axios.delete(`${API_URL}/college/room/${id}`, {
        withCredentials: true,
      });
      fetchRooms();
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  // Populate form for editing
  const handleEdit = (room) => {    
    setFormData({ 
      roomType: room.roomType,
      floor: room.floor,
      room_no: room.room_no,
      dimensions: room.dimensions, 
    });
    setEditMode(true);
    setCurrentId(room._id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">Room Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-offwhite-light w-full flex flex-col items-center justify-between shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="w-full">
          <div className="flex items-center justify-between w-full gap-6 mb-3">
            <div className="w-full">
              <label
                htmlFor="roomType"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Room Type
              </label>
              <input
                type="text"
                id="roomType"
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Room Type (e.g., Classroom, Laboratory)"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="floor"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Floor  
              </label>
              <input
                type="text"
                id="floor"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Floor (e.g., 1, 2, etc)"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6 mb-3">
            <div className="w-full">
              <label
                htmlFor="roomNo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Room No  
              </label>
              <input
                type="text"
                id="roomNo"
                value={formData.room_no}
                onChange={(e) => setFormData({ ...formData, room_no: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter room no (e.g., 101, 201, etc)"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="dimensions"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Dimensions
              </label>
              <input
                type="text"
                id="dimensions"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter dimensions (e.g., 200x200 )"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-test2-3 hover:bg-test2-2 text-offwhite-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {editMode ? "Update Room" : "Add Room"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData({
                    roomType: "",
                    floor: "",
                    room_no: "",
                    dimensions: "",
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
      </form>

      {/* Room List */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Room Type
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Floor
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Room No
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Dimensions
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {room.roomType}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {room.floor}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {room.room_no}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {room.dimensions}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button
                    onClick={() => handleEdit(room)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room._id)}
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
  );
}

export default Room