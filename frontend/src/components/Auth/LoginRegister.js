import React, { useState } from 'react';
import { login, register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css'; 

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        fullName: '',
    });
    const [role, setRole] = useState('customer');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            if (isLogin) {
                const data = await login(formData.email, formData.password);
                localStorage.setItem('token', data.token);
                if (data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate(`/portfolio`);
                }
                setMessage('Login successful!');
            } else {
                await register({
                    email: formData.email,
                    password: formData.password,
                    username: formData.username,
                    fullName: formData.fullName,
                    role: role,
                });
                setMessage('Registration successful! Please login.');
            }
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    return (
        <div className="auth-container form">
            <ul className="tab-group">
                <li className={`tab ${isLogin ? '' : 'active'}`}>
                    <a onClick={() => setIsLogin(false)}>Register</a>
                </li>
                <li className={`tab ${isLogin ? 'active' : ''}`}>
                    <a onClick={() => setIsLogin(true)}>Login</a>
                </li>
            </ul>

            <div className="tab-content">
                <div>
                    <h1>{isLogin ? 'Welcome To SAZ' : 'Sign Up for SAZ'}</h1>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <div className="field-wrap role-selection">
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
                                <div className="field-wrap">
                                    <label>Full Name<span className="req">*</span></label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="field-wrap">
                                    <label>Username<span className="req">*</span></label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                            </>
                        )}

                        <div className="field-wrap">
                            <label>Email<span className="req">*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="field-wrap">
                            <label>Password<span className="req">*</span></label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        
                        <button type="submit" className="button button-block">
                            {isLogin ? 'Log In' : 'Register'}
                        </button>
                    </form>
                    <p className="forgot" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'No account? Register here.' : 'Already have an account? Login here.'}
                    </p>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
        
    );
};

export default LoginRegister;
