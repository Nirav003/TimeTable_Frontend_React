import React from 'react';

const CommitteeMembers = () => {
  
  const professors = [
    { _id: "1", name: "Prof. John Doe", designation: "Assistant Professor", emailId: "johndoe@example.com", phoneNo: "1234567890" },
    { _id: "2", name: "Dr. Jane Smith", designation: "Professor", emailId: "janesmith@example.com", phoneNo: "0987654321" },
    { _id: "3", name: "Mr. Michael Johnson", designation: "Associate Professor", emailId: "michaeljohnson@example.com", phoneNo: "9876543210" },
  ]

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
                  {professor.phoneNo}
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

