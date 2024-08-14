import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [courses, setCourses] = useState([]);
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const validateMobile = (mobile) => {
        const mobileRegex = /^[0-9]+$/;
        return mobileRegex.test(mobile);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setImage(file);
        } else {
            setError('Only jpg/png files are allowed.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate mobile number
        if (!validateMobile(mobile)) {
            setError('Mobile number must be numeric.');
            return;
        }

        // Validate required fields
        if (!name || !email || !mobile || !designation || !gender || courses.length === 0) {
            setError('All fields are required.');
            return;
        }

        // Prepare form data
       console.log({ name,
        email,
        mobile,
        designation,
        gender,
        courses:courses[0]});
       

        try {
            const response = await axios.post('/api/v1/employee/', { name,
              email,
              mobile,
              designation,
              gender,
              courses:courses[0]});

            if (response.status === 201) {
                setSuccess('Employee added successfully.');
                // Clear form
                setName('');
                setEmail('');
                setMobile('');
                setDesignation('');
                setGender('');
                setCourses([]);
                setImage(null);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Server error',err);
            }
        }
    };

    const handleCourseChange = (e) => {
        const value = e.target.value;
        setCourses((prevCourses) =>
            prevCourses.includes(value)
                ? prevCourses.filter((course) => course !== value)
                : [...prevCourses, value]
        );
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">Create Employee</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300">Mobile No</label>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300">Designation</label>
                    <select
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    >
                        <option value="" disabled>Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300">Gender</label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="M"
                                checked={gender === 'M'}
                                onChange={(e) => setGender(e.target.value)}
                                className="form-radio text-indigo-600 dark:text-indigo-400"
                            />
                            <span className="ml-2">M</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="F"
                                checked={gender === 'F'}
                                onChange={(e) => setGender(e.target.value)}
                                className="form-radio text-indigo-600 dark:text-indigo-400"
                            />
                            <span className="ml-2">F</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300">Courses</label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="MCA"
                                checked={courses.includes('MCA')}
                                onChange={handleCourseChange}
                                className="form-checkbox text-indigo-600 dark:text-indigo-400"
                            />
                            <span className="ml-2">MCA</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="BCA"
                                checked={courses.includes('BCA')}
                                onChange={handleCourseChange}
                                className="form-checkbox text-indigo-600 dark:text-indigo-400"
                            />
                            <span className="ml-2">BCA</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="BSC"
                                checked={courses.includes('BSC')}
                                onChange={handleCourseChange}
                                className="form-checkbox text-indigo-600 dark:text-indigo-400"
                            />
                            <span className="ml-2">BSC</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300">Image Upload</label>
                    <input
                        type="file"
                        accept=".jpg,.png"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddEmployee;
