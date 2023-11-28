/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PetListingCard from "./PetListingCard";
// import SearchForm from "../../../Components/SearchForm/SearchForm";
// import SearchBarWithCategories from "../../../Components/SearchForm/SearchForm";
import { faSearch } from '@fortawesome/free-solid-svg-icons';



const Petlisting = () => {


    const [pet, setPet] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState('');

    //Fetch book data by category
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


    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            alert('Hello, ' + inputValue + '!');
        }
    };

    return (
        <div>
            <div>
                <div className="flex">
                    <select className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Who shot first?</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                    <input onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleSearch} type="text" placeholder="Type here" className="input input-bordered w-full "></input>
                
                </div>
                <div>
                    {pet.length > 0 ? (

                        <div>
                            <h1 className="text-center font-bold text-6xl mb-5 mt-5"> Available <span className="text-[#E59285]">  Pets</span></h1>
                            <hr />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 ">
                                {

                                    pet?.map(bookItem => <PetListingCard key={bookItem._id} bookItem={bookItem}></PetListingCard>)

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