// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAllDonation = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: allDonation = [] } = useQuery({
        queryKey: ['allDonation', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/allDonation?email=${user.email}`);
            return res.data;
        }
    })

    return [allDonation, refetch]
};

export default useAllDonation;