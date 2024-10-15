import './FormLogin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../Input/Input';
import Button from '../Button/Button';

const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://test1.focal-x.com/api/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { token, user } = response.data;
            localStorage.setItem('token', `Bearer ${token}`);
            localStorage.setItem('profileImage', user.profile_image_url);
            localStorage.setItem('username', user.user_name);
            navigate('/dashboard');
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="input-container">
                <Input
                    id="email"
                    type="email"
                    labelText="Email"
                    placeholderText="Enter your email"
                    handleChange={(e) => setEmail(e.target.value)}
                    containerClass="input-field"
                />
            </div>
            <div className="input-container">
                <Input
                    id="password"
                    type="password"
                    labelText="Password"
                    placeholderText="Enter your password"
                    handleChange={(e) => setPassword(e.target.value)}
                    containerClass="input-field"
                />
            </div>
            <Button type="submit" styleButton="submit-btn" buttonText="Login" />
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default FormLogin;
