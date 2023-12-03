// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAllPets = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: allPets = [] } = useQuery({
        queryKey: ['allPets', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/allPets?email=${user.email}`);
            return res.data;
        }
    })

    return [allPets, refetch]
};

export default useAllPets;