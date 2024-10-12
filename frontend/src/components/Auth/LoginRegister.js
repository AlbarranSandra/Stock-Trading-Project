import React, { useState } from 'react';
import { login, register } from '../../services/authService';
// import { fetchPortfolioById } from '../../services/portfolioService';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        fullName: '', // New fullName field
    });
    const [role, setRole] = useState('customer'); // New state for role
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Handle form input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle role change
    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            if (isLogin) {
                const data = await login(formData.email, formData.password);
                
                // Save token to localStorage
                localStorage.setItem('token', data.token);
                // Check role and redirect
                if (data.role === 'admin') {
                    navigate('/admin');
                } else {
                    
                    // const portfolioData = await fetchPortfolioById();

                    // Redirect to the unique portfolio page
                    navigate(`/portfolio`);
                }

                setMessage('Login successful!');
            } else {
                // Register with full data, including role
                await register({
                    email: formData.email,
                    password: formData.password,
                    username: formData.username,
                    fullName: formData.fullName,
                    role: role, // Pass selected role
                });
                setMessage('Registration successful! Please login.');
            }
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <div>
                            <label>Full Name:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Role:</label>
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="customer"
                                    checked={role === 'customer'}
                                    onChange={handleRoleChange}
                                />
                                Customer
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={role === 'admin'}
                                    onChange={handleRoleChange}
                                />
                                Admin
                            </label>
                        </div>
                    </>
                )}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                <p onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'No account? Register here.' : 'Already have an account? Login here.'}
                </p>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginRegister;
