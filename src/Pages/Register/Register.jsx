import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import SocialLogin from './SocialLogin/SocialLogin';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Register = () => {

    const { register, handleSubmit } = useForm()
    const axiosPubic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { createUser, handleUpdateProfile } = useAuth();

    const onSubmit = async (data) => {

        createUser(data.email, data.password)
            .then( (result) => {
                const loggedUser = result.user
                console.log(loggedUser)
                handleUpdateProfile(data.name, data.photoUrl)
                    .then(async () => {

                        const imageFile = { image: data.image[0] }

                        const res = await axiosPubic.post(imageHostingApi, imageFile, {

                            headers: {

                                'content-Type': 'multipart/form-data'

                            }

                        })

                        if (res.data.success) {

                            const menuItem = {

                                name: data.name,
                                email: data.email,
                                image: res.data.data.display_url,
                                role: 'user'

                            }

                            const userResponse = await axiosSecure.post('/users', menuItem);
                            console.log(userResponse.data)

                            if (userResponse.data.insertedId) {

                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `Welcome ${data.name} `,
                                    showConfirmButton: false,
                                    timer: 1500
                                });

                            }

                        }

                        console.log(res.data)

                    })
                    .catch(error => {

                        console.log(error)

                    })


            })



    }

    return (
        <div className=" md:w-3/4 lg:w-1/2 mx-auto">

            <div >
                <h2 className="text-3xl my-10 text-center">Please Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>


                    {/* User Name */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Enter Your Name*</span>
                        </label>
                        <input {...register("name")} required type="text" placeholder="Enter Your Name" className="input input-bordered w-full" />

                    </div>
                    {/* User Email */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Enter Your Email*</span>
                        </label>
                        <input {...register("email")} required type="email" placeholder="Enter Your Email" className="input input-bordered w-full" />

                    </div>
                    {/* Password */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Enter Your password*</span>
                        </label>
                        <input {...register("password")} required type="password" placeholder="Password" className="input input-bordered w-full" />

                    </div>

                    {/* Image */}
                    <div>
                        <input {...register("image")} required type="file" className="file-input w-full my-6" />
                    </div>
                    <SocialLogin></SocialLogin>
                    <div className='form-control my-6'>
                        <button type="submit" className="btn mt-6 text-center">Register</button>
                    </div>
                </form>
                <p className="text-center mt-4 mb-10">Already have an account? <Link className="text-[#f04336]  font-bold" to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;