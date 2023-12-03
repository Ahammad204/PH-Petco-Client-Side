// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useUser = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        }
    })

    return [users, refetch]
};

export default useUser;