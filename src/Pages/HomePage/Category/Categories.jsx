import { useState, useEffect } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import PetCategory from './PetCategory';

const Categories = () => {
    const [category, setCategory] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/category')
            .then(res => {
                setCategory(res.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [axiosPublic]); 

    return (
        <div>
            <SectionTitle heading={"Categories"} subHeading={"Pet_Categories"}></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-20">
                {
                    category?.map(category => <PetCategory key={category._id} category={category}></PetCategory>)
                }
            </div>
        </div>
    );
};

export default Categories;
