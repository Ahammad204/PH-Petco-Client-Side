/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './../Register/SocialLogin/SocialLogin';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Login = () => {
    const { login } = useAuth();
    const location = useLocation();
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        // Fetch user status
        try {
            const statusResponse = await axios.get(`http://localhost:5000/usersInfo`);
            const usersData = statusResponse.data;
          console.log(statusResponse)
            const foundUser = usersData.find(user => user.email === email);

            if (foundUser) {
                const userStatus = foundUser.status;
                console.log(userStatus);
        
                if (userStatus === 'banned') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Your account is banned. Please contact support for assistance.',
                    });
                    return;
                }
             // Continue with password validation and login
            if (password.length < 6) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password must be 6 characters long',
                });
                return;
            } else if (!/[A-Z]/.test(password)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password must contain at least one capital letter',
                });
                return;
            } else if (!/[\W_]/.test(password)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password must contain at least one special character',
                });
                return;
            }

            // Login user
            login(email, password)
                .then(result => {
                    toast.success('User logged in successfully');
                    navigate(location?.state ? location.state : '/');

                    // Get Access Token
                    axios.post('http://localhost:5000/jwt', { email }, { withCredentials: true })
                        .then(res => {
                            if (res.data.success) {
                                navigate(location?.state ? location.state : '/');
                            }
                        })
                        .catch(error => {
                            console.error('Error getting access token:', error);
                        });
                })
                .catch(error => {
                    toast.error('Please Check Your Password or Email Again');
                    console.log(error);
                });

        } 
            else {
                // Handle the case where the target email is not found in usersData
                console.log(`User with email  not found`);
            }
        } catch (error) {
            // Handle errors that might occur during the fetch
            console.error('Error fetching user information:', error);
        }
         
    };

    return (
        <div>
            <div>
                <h2 className="text-3xl my-10 text-center">Please Login</h2>
                <form onSubmit={handleLogin} className=" md:w-3/4 lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" required name="email" placeholder="Email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" required name="password" placeholder="Password" className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary text-white border-none bg-[#f04336]  hover:bg-[#f04336] ">Login</button>
                    </div>
                    <SocialLogin></SocialLogin>
                </form>
                <p className="text-center mt-4">
                    Do not have an account? <Link className="text-[#f04336] font-bold" to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
