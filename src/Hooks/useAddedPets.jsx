// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAddedPets = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: pet = [] } = useQuery({
        queryKey: ['petAl', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/petAl?email=${user.email}`);
            return res.data;
        }
    })

    return [pet, refetch]
};

export default useAddedPets;