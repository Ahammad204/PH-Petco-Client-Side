
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './../Register/SocialLogin/SocialLogin';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';

const Login = () => {


    const { login } = useAuth()
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (e) => {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        // Password validation

         if (password.length < 6) {
             toast.error('Password must be at least 6 characters long');
            return
         } else if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain at least one capital letter');
             return
         } else if (!/[\W_]/.test(password)) {
             toast.error('Password must contain at least one special character');
            return
         }

        //   Login user

        login(email, password)
            .then(result => {
                toast.success('User logged in successfully');

                console.log(result.user);
                navigate(location?.state ? location.state : '/');

                const user = { email }

                //Get Access Token 

                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(res => {

                        console.log(res.data)
                        if (res.data.success) {

                            navigate(location?.state ? location.state : '/')
                        }
                    })




            })
            .catch(error => {
                toast.error("Please Check Your Password or Email Again")
                console.log(error)
            })

    }

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
                <p className="text-center mt-4">Do not have an account? <Link className="text-[#f04336]  font-bold" to="/register">Register</Link></p>


            </div>
        </div>
    );
};

export default Login;