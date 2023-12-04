import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const SocialLogin = () => {

    // eslint-disable-next-line no-unused-vars
    const { user, googleLogin, githubLogin } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()

    const handleSocialLogin = (social) => {

        social()
            .then(async (result) => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                    role: "user",
                    status: "active"
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate(location?.state ? location.state : '/');
                    })


            })


    }

    return (
        <div>
            <>
                <div className="divider">continue with</div>
                <div className="flex justify-around">
                    <button
                        onClick={() => handleSocialLogin(googleLogin)}
                        className="btn text-white border-none bg-[#f04336] hover:bg-[#f04336]  "><FaGoogle className="text-2xl"></FaGoogle>Google</button>
                    <button
                        onClick={() => handleSocialLogin(githubLogin)}
                        className="btn text-white border-none bg-[#f04336] hover:bg-[#f04336] "><FaGithub className="text-2xl"></FaGithub> Github</button>

                </div>
            </>
        </div>
    );
};

export default SocialLogin;