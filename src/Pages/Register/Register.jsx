import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "./SocialLogin/SocialLogin";




const Register = () => {

    // eslint-disable-next-line no-unused-vars
    const { createUser, user, handleUpdateProfile } = useContext(AuthContext);
    const navigate = useNavigate()


    const handleRegister = (e) => {

        e.preventDefault();

        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, name, photo, password)

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


        //   create user

        createUser(email, password)
            .then(result => {

                handleUpdateProfile(name, photo)
                    .then((res) => {
                        toast.success('User created successfully');

                        navigate('/login')

                        console.log(result)
                        console.log(res)



                    })

            })
            .catch(error => {
                toast.error('Error: ' + error.message)
            })




    }

    return (
        <div>
            <div>
                <h2 className="text-3xl my-10 text-center">Please Register</h2>
                <form onSubmit={handleRegister} className=" md:w-3/4 lg:w-1/2 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" required name="name" placeholder="Name" className="input input-bordered" />
                    </div>
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
                       
                    </div>
                    <div className="form-control">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Upload Your Photo</span>
                                
                            </label>
                            <input type="file" required className="file-input file-input-bordered w-full max-w-full" />
                          
                        </div>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary text-white border-none bg-[#E59285]  hover:bg-[#E59285] ">Register</button>
                    </div>
                    <SocialLogin></SocialLogin>

                </form>
                <p className="text-center mt-4">Already have an account? <Link className="text-[#E59285]  font-bold" to="/login">Login</Link></p>
            </div>
        </div>
    );
};


export default Register;