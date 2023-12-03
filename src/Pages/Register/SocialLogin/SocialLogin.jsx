import { useContext, } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import axios from "axios";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const {  googleLogin, githubLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleSocialLogin = async (social) => {
        try {
            const result = await social();
            console.log(result.user);

            const statusResponse = await axios.get(`http://localhost:5000/usersInfo`);
            const usersData = statusResponse.data;
          console.log(statusResponse)
            const foundUser = usersData.find(user => user.email === result.user.email);

            if (foundUser) {
                // Check if the user is banned
                if (foundUser.status === 'banned') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Your account is banned. Please contact support for assistance.',
                    });
                    return;
                }

                // Continue with the social login
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                    role: "user",
                    status: "active"
                };

                const postResponse = await axiosPublic.post('/users', userInfo);
                console.log(postResponse.data);
                navigate(location?.state ? location.state : '/');
            } else {
                toast.error("User not found or data not available.");
            }
        } catch (error) {
            toast.error("Oops, something went wrong");
            console.log(error);
        }
    };

    return (
        <div>
            <>
                <div className="divider">continue with</div>
                <div className="flex justify-around">
                    <button
                        onClick={() => handleSocialLogin(googleLogin)}
                        className="btn text-white border-none bg-[#f04336] hover:bg-[#f04336]">
                        <FaGoogle className="text-2xl"></FaGoogle>Google
                    </button>
                    <button
                        onClick={() => handleSocialLogin(githubLogin)}
                        className="btn text-white border-none bg-[#f04336] hover:bg-[#f04336]">
                        <FaGithub className="text-2xl"></FaGithub> Github
                    </button>
                </div>
            </>
        </div>
    );
};

export default SocialLogin;
