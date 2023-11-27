/* eslint-disable no-unused-vars */

import { useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';


const Categories = () => {

    const [category,setCategory] = useState()

    const axiosPublic = useAxiosPublic();

    axiosPublic.get('/category')
    .then(res => {

        setCategory(res.data);

    })

    return (
        <div>
            
        </div>
    );
};

export default Categories;