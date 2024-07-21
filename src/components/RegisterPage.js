// src/components/RegisterPage.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import QRCode from 'qrcode.react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        collegeName: '',
        email: '',
        name: '',
        phone: '',
        why: '',
        year: '',
    });
    const [docId, setDocId] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.collegeName) newErrors.collegeName = 'College name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.why) newErrors.why = 'Reason is required';
        if (!formData.year) newErrors.year = 'Year is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const docRef = await addDoc(collection(db, 'users'), {
                ...formData,
                flag: false, // Default to false
            });

            console.log("Generated Document ID:", docRef.id); // Debug log
            setDocId(docRef.id);
            setShowQRCode(true);
            setErrors({});
            setFormData({
                collegeName: '',
                email: '',
                name: '',
                phone: '',
                why: '',
                year: '',
            });
        } catch (e) {
            console.error('Error adding document: ', e);
            alert('Error adding document');
        }
    };

    return (
        <div>
            {showQRCode ? (
                <div>
                    <h2>Registration Successful!</h2>
                    <p>Your Document ID: {docId}</p>
                    <QRCode value={docId} size={256} /> {/* Generate QR code with document ID */}
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* Form fields */}
                    <div>
                        <input
                            type="text"
                            name="collegeName"
                            placeholder="College Name"
                            value={formData.collegeName}
                            onChange={handleChange}
                            required
                        />
                        {errors.collegeName && <span>{errors.collegeName}</span>}
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <span>{errors.name}</span>}
                    </div>
                    <div>
                        <input
                            type="number"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        {errors.phone && <span>{errors.phone}</span>}
                    </div>
                    <div>
                        <textarea
                            name="why"
                            placeholder="Why do you want to attend?"
                            value={formData.why}
                            onChange={handleChange}
                            required
                        />
                        {errors.why && <span>{errors.why}</span>}
                    </div>
                    <div>
                        <input
                            type="number"
                            name="year"
                            placeholder="Year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        />
                        {errors.year && <span>{errors.year}</span>}
                    </div>
                    <button type="submit">Register</button>
                </form>
            )}
        </div>
    );
};

export default RegisterPage;
