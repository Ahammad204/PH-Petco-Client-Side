// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAddedDonation = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: donation = [] } = useQuery({
        queryKey: ['donation', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/donation?email=${user.email}`);
            return res.data;
        }
    })

    return [donation, refetch]
};

export default useAddedDonation;