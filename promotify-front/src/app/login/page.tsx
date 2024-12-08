"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        user_type: 'Influencer',
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
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to log in.');
            }

            const data = await response.json();
            alert(data.message);
        } catch (error: any) {
            console.error('Error during login:', error);
            alert(error.message || 'An error occurred during login.');
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="flex flex-col lg:flex-row w-11/12 max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Quote Section */}
                <div className="lg:w-1/2 flex flex-col justify-center bg-gradient-to-r from-purple-700 to-blue-500 text-white p-8 lg:p-16">
                    <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
                    <p className="text-lg">
                        “Promotify connects Sponsors and Influencers seamlessly with the power of AI.” 
                    </p>
                </div>

                {/* Login Form Section */}
                <div className="lg:w-1/2 flex items-center justify-center p-8">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 w-full max-w-md"
                    >
                        <h2 className="text-3xl font-bold text-purple-700 text-center">Login</h2>
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
                        <div>
                            <label htmlFor="user_type" className="block text-gray-700 font-semibold mb-2">
                                User Role
                            </label>
                            <select
                                id="user_type"
                                name="user_type"
                                value={formData.user_type}
                                onChange={handleChange}
                                className="w-full text-black p-3 bg-gray-50 border cursor-pointer border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                            >
                                <option value="Influencer">Influencer</option>
                                <option value="Sponsor">Sponsor</option>
                            </select>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-purple-700 text-white"
                        >
                            Login
                        </Button>
                        <p className="text-center text-gray-500 text-sm">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-purple-700">
                                Sign Up
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
