// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAdoptDonation = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: adopt = [] } = useQuery({
        queryKey: ['adopt', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/adopt?email=${user.email}`);
            return res.data;
        }
    })

    return [adopt, refetch]
};

export default useAdoptDonation;