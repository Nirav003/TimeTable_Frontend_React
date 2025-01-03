import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../server";

const CommitteeMembers = () => {
  const [professors, setProfessors] = useState([]);

  // Fetch all professors
  const fetchProfessors = async () => {
    try {
      const response = await axios.get(`${API_URL}/college/professor`, {
        withCredentials: true,
      });
      setProfessors(response.data.professor);
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  return (

    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-test2-3">Committee Members</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
              Members Name
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Designation
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Email
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal">
                Phone No
              </th>
            </tr>
          </thead>
          <tbody>
            {professors.map((professor) => (
              <tr key={professor._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {professor.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {professor.designation}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {professor.emailId}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  {professor.phoneNumber}/
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommitteeMembers;

