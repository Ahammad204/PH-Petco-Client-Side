// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useMyDonation = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: myDonation = [] } = useQuery({
        queryKey: ['myDonation', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/myDonation?email=${user?.email}`);
            return res.data;
        }
    })

    return [myDonation, refetch]
};

export default useMyDonation;