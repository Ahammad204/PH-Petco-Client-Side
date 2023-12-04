import axios from "axios";

const axiosPublic = axios.create({

    baseURL: 'https://php-etco-server-side.vercel.app'

})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;