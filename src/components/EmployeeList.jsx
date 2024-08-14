import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the employee list from the backend
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/api/v1/employee/employeelist');
                setEmployees(response.data.data); // Assuming the employee list is in response.data.data
            } catch (error) {
                console.error('Error fetching employee list:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleEdit = (id) => {
        // Navigate to edit page with the employee's ID
        navigate(`/edit-employee/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/v1/employee/${id}`);
            setEmployees(employees.filter(employee => employee._id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Employee List</h1>
            <table className="min-w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Unique Id</th>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Mobile No</th>
                        <th className="border px-4 py-2">Designation</th>
                        <th className="border px-4 py-2">Gender</th>
                        <th className="border px-4 py-2">Course</th>
                        <th className="border px-4 py-2">Create date</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee._id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">
                                <img
                                    src={``}
                                    alt={employee.name}
                                    className="w-16 h-16"
                                />
                            </td>
                            <td className="border px-4 py-2">{employee.name}</td>
                            <td className="border px-4 py-2">{employee.email}</td>
                            <td className="border px-4 py-2">{employee.mobile}</td>
                            <td className="border px-4 py-2">{employee.designation}</td>
                            <td className="border px-4 py-2">{employee.gender}</td>
                            <td className="border px-4 py-2">{employee.courses}</td>
                            <td className="border px-4 py-2">{new Date(employee.createdAt).toLocaleDateString()}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => handleEdit(employee._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDelete(employee._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
