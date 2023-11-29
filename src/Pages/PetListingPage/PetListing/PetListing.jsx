/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PetListingCard from "./PetListingCard";

const Petlisting = () => {


    const [pet, setPet] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
   

    //Fetch pet data by category
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch('pet.json');
            const data = await response.json();
            const filteredProducts = data.filter((item) => item.pet_adoption === "not_adopted");
            setPet(filteredProducts);
            setIsLoading(false);

        };

        fetchData();
    }, []);


    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            setIsLoading(true);
             {
                const response = await fetch('pet.json');
                const data = await response.json();
                const filteredProducts = data.filter((item) => 
                    item.pet_adoption === "not_adopted" && item.pet_name.toLowerCase().includes(inputValue.toLowerCase())
                );
                setPet(filteredProducts);
                setIsLoading(false);
            } 
        }
    };
   

    // Fetch pet data by category
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch('pet.json');
            const data = await response.json();

            let filteredProducts = data.filter((item) => item.pet_adoption === "not_adopted");

            if (selectedCategory) {
                filteredProducts = filteredProducts.filter((item) => item.pet_category === selectedCategory);
            }

            setPet(filteredProducts);
            setIsLoading(false);
        };

        fetchData();
    }, [selectedCategory]);
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };


    return (
        <div>
            <div>
                <div className="flex my-4 gap-4">
                    <select onChange={handleCategoryChange} className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Select a Pet Category</option>
                        <option value="Birds">Birds</option>
                       
                    </select>
                    <input onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleSearch} type="text" placeholder="Search By Pet Name..." className="input input-bordered w-full "></input>
                
                </div>
                <div>
                    {pet.length > 0 ? (

                        <div>
                            <h1 className="text-center font-bold text-6xl mb-5 mt-5"> Available <span className="text-[#E59285]">  Pets</span></h1>
                            <hr />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 ">
                                {

                                    pet?.map(petItem => <PetListingCard key={petItem._id} petItem={petItem}></PetListingCard>)

                                }
                            </div>
                        </div>


                    ) : (

                        <div>
                            {isLoading ? (
                                <div className="flex justify-center items-center mt-20">
                                    <div className="hero w-2/3 h-2/3">
                                        <div className=""></div>
                                        <div className="hero-content text-center">
                                            <div className="max-w-md">
                                                <span className="loading loading-bars loading-lg"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (

                                <div className="flex justify-center items-center mt-20">
                                    <div className="hero w-2/3 h-2/3" >
                                        <div className=""></div>
                                        <div className="hero-content text-center ">
                                            <div className="max-w-md">
                                                <h1 className="mb-5 text-5xl font-bold">Hey Pet Lover</h1>
                                                <p className="mb-5 text-xl ">There is noting to show <br /> Do you Want to Request For A Pet</p>
                                                <button className="btn  text-white bg-[#E59285] hover:bg-[#E59285]">Request A Pet</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    )



                    }
                </div>

            </div>
        </div>
    );
};

export default Petlisting;