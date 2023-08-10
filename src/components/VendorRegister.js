import React, { useState } from 'react';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        mobileNo: '',
        email: '',
        address1: '',
        address2: '',
        area: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
        status: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle form submission and API call to save data
        console.log(formData);
    };

    return (
        <div className="container">
            <h2>Vendor Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="male"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="male">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="female"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="female">
                            Female
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="others"
                            name="gender"
                            value="Others"
                            checked={formData.gender === "Others"}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="others">
                            Others
                        </label>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="mobileNo" className="form-label">Mobile Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="mobileNo"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address1" className="form-label">Address Line 1</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address1"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address2" className="form-label">Address Line 2</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address2"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="area" className="form-label">Area</label>
                    <input
                        type="text"
                        className="form-control"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pinCode" className="form-label">Pin Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pinCode"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <input
                        type="text"
                        className="form-control"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
