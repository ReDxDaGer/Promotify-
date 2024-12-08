"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        user_type: 'Influencer',
        company_name: '',
        budget: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to register.');
            }

            const data = await response.json();
            alert(data.message);
        } catch (error: any) {
            console.error('Error during signup:', error);
            alert(error.message || 'An error occurred during registration.');
        }
    };

    return (
        <motion.div 
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        name="username" 
                        placeholder="Username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                    <Input 
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <Input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <Input 
                        name="instagram-username" 
                        type="text" 
                        placeholder="instagram-username" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <Input 
                        name="youtube-username" 
                        type="text" 
                        placeholder="youtube-username (optional)" 
                        value={formData.password} 
                        onChange={handleChange} 
                    />
                    <Input 
                        name="twitter-username" 
                        type="text" 
                        placeholder="twitter-username (optional)" 
                        value={formData.password} 
                        onChange={handleChange} 
                    />

                    <div>
                        <label htmlFor="user_type" className="block text-gray-700 font-semibold mb-2">
                            User Type
                        </label>
                        <select
                            id="user_type"
                            name="user_type"
                            value={formData.user_type}
                            onChange={handleChange}
                            className="w-full text-black 
                            p-3 bg-gray-50 border 
                            cursor-pointer border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                        >
                            <option value="Influencer">Influencer</option>
                            <option value="Sponsor">Sponsor</option>
                        </select>
                    </div>

                    {formData.user_type === 'Sponsor' && (
                        <>
                            <Input 
                                name="company_name" 
                                placeholder="Company Name (Optional)" 
                                className="mt-2 text-black"
                                value={formData.company_name} 
                                onChange={handleChange} 
                            />
                            <Input 
                                name="budget" 
                                type="number" 
                                placeholder="Budget (Optional)"
                                className="mt-2 text-black" 
                                value={formData.budget} 
                                onChange={handleChange} 
                            />
                        </>
                    )}
                    <Button type="submit" className="w-full bg-purple-700 text-white">
                        Register
                    </Button>
                    <p className="text-center text-gray-500 text-sm">
                        Already have an account?{' '}
                        <a href="/login" className="text-purple-700">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </motion.div>
    );
};

export default Signup;
