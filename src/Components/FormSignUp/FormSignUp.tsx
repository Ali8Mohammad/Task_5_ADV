import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormSignUp.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import uploadIcon from '../../assets/img/UploadIcon.svg';

const FormSignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
            setProfileImage(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('user_name', firstName + "_" + lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', confirmPassword);
        if (profileImage) {
            formData.append('profile_image', profileImage);
        }

        axios.post('https://test1.focal-x.com/api/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                    localStorage.setItem('token', `Bearer ${response.data.data.token}`);
                    localStorage.setItem('username', response.data.data.user.user_name || '');
                    localStorage.setItem('image', response.data.data.user.profile_image_url || '');
                    console.log(response);
            navigate('/dashboard')
            })
            .catch(error => {
                setError(
                    error.response?.data?.message || 'An error occurred during registration.'
                );
            });
            
    };
    

    return (
        <form onSubmit={handleSubmit} className="sign-up-form">
            <div className="input-group">
                <Input
                    id="firstName"
                    type="text"
                    labelText="First Name"
                    placeholderText="Enter your first name"
                    handleChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                    id="lastName"
                    type="text"
                    labelText="Last Name"
                    placeholderText="Enter your last name"
                    handleChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="input-group">
                <Input
                    id="email"
                    type="email"
                    labelText="Email"
                    placeholderText="Enter your email"
                    handleChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-group">
                <Input
                    id="password"
                    type="password"
                    labelText="Password"
                    placeholderText="Enter your password"
                    handleChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                />
                <Input
                    id="confirmPassword"
                    type="password"
                    labelText="Confirm Password"
                    placeholderText="Confirm your password"
                    handleChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                />

            </div>
            <div className="file-upload">
                <Input
                    type="file"
                    labelText="Upload Profile Image"
                    styleImageInput="upload-input"
                    src={uploadIcon}
                    imagePreview={previewImage || ''}
                    handleChange={handleFileChange}
                />
            </div>
            <Button type="submit" styleButton="submit-btn" buttonText="Sign Up" />

            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default FormSignUp;
