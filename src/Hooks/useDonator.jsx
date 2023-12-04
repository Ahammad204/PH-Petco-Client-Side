import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useDonator = (petName) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch, data: donator = [] } = useQuery({
        queryKey: ['donator', user?.email, petName], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/donator?email=${user?.email}&petName=${petName}`);
            return res.data;
        }
    });

    return [donator, refetch];
};

export default useDonator;
