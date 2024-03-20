import React, { useState } from 'react';
import { BACKEND_URL } from '../../constants';
import { Link } from 'react-router-dom';

// main component
function Register() {
    const [email, setEmail] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        password: '',
        password2: ''
    });

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (email.trim() === '') {
            setError('Email cannot be empty');
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/user/sentverification/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            if (!response.ok) {
                throw new Error('Failed to send verification email');
            }
            setCurrentPage(2);
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };
    const handleTokenSubmit = async (e) => {
        e.preventDefault();
        if (token.trim() === '') {
            setError('Token cannot be empty');
            return;
        }
    
        try {
            let url = `${BACKEND_URL}/api/user/verify/?token=${token}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                // Handle successful token verification
                const data = await response.json();
                // Assuming the access token is returned in the response data
                const accessToken = data.access_token;
                // Store access token to local storage
                localStorage.setItem('access_token', accessToken);
                setCurrentPage(3);
                console.log('Token verified successfully');
            } else {
                // Handle error response
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to verify token');
            }
        } catch (error) {
            setError(error.message);
        }
    };
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { name, phone_number, password, password2 } = formData;
        if (name.trim() === '' || phone_number.trim() === '' || password.trim() === '' || password2.trim() === '') {
            setError('All fields are required');
            return;
        }
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }

        try {
            let formUrl = `${BACKEND_URL}/api/user/register/?token=${token}`
            const response = await fetch(formUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            // Handle successful registration
            setCurrentPage(4);
        } catch (error) {
            setError(error.message);
        }
    };

    function currentSectiontoUser(id) {
        switch (id) {
            case 1:
                return <SubmitMail setEmail={setEmail} handleEmailSubmit={handleEmailSubmit} error={error} />;
            case 2:
                return <SubmitToken email={email} setToken={setToken} handleTokenSubmit={handleTokenSubmit} error={error} />;
            case 3:
                return <RegisterForm formData={formData} setFormData={setFormData} handleFormSubmit={handleFormSubmit} error={error} />;
            case 4:
                return <SuccessMessage />;
            default:
                return null;
        }
    }

    return (
        <main className="min-h-screen flex flex-col items-center p-3">
            {currentSectiontoUser(currentPage)}
        </main>
    );
}

const RegisterForm = ({ formData, setFormData, handleFormSubmit, error }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleFormSubmit} className="p-12 w-full lg:w-1/2 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-6">Register</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input w-full mb-4" placeholder="Name" required />
            <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} className="input w-full mb-4" placeholder="Phone Number" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input w-full mb-4" placeholder="Password" required />
            <input type="password" name="password2" value={formData.password2} onChange={handleChange} className="input w-full mb-6" placeholder="Confirm Password" required />
            <button type="submit" className="btn bg-red-500 hover:bg-red-400 text-white w-full">Register</button>
        </form>
    );
};

const SubmitToken = ({ email, setToken, handleTokenSubmit, error }) => {
    return (
        <form onSubmit={handleTokenSubmit} className="p-12 w-full lg:w-1/2 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
            <div>
                <img className="h-64 w-64" src="/logo/email.svg" alt="Email Image" />
            </div>
            <h2 className="text-2xl font-bold">Verify Your Email</h2>
            <h3 className="font-bold">Check your Inbox <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="underline text-red-500">{email}</a></h3>
            <input onChange={(e) => setToken(e.target.value)} type="text" className="input w-full m-3" placeholder="Please Enter Your Token...." required />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="btn bg-red-500 hover:bg-red-400 text-white w-full">Submit</button>
        </form>
    );
};

const SubmitMail = ({ setEmail, handleEmailSubmit, error }) => {
    return (
        <form onSubmit={handleEmailSubmit} className="h-64 w-full lg:w-1/2 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold">Submit Your Email..</h3>
            {error && <p className="text-red-500">{error}</p>}
            <input onChange={(e) => setEmail(e.target.value)} type="email" className="input w-80" placeholder="Please Enter Your Email..." required />
            <button type="submit" className="btn bg-red-500 hover:bg-red-600 text-white mt-6">Submit</button>
        </form>
    );
};

const SuccessMessage = () => {
    return (
        <div className="p-12 w-full lg:w-1/2 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h2>
            <p className="text-gray-800">You have successfully registered.</p>
            <Link to="/login" className="text-center font-bold underline text-red-500">Login</Link>
        </div>
    );
};

export default Register;

