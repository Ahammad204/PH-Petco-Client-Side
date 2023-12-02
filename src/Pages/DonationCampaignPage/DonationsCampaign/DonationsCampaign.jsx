/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import DonationCampaignCard from "./DoantionsCampaignCard";


const DonationsCampaign = () => {


    const [donation, setDonation] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


   // Fetch donation data
    const fetchDonationData = async (pageNumber) => {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/donationCampaign?page=${pageNumber}`);
        const data = await response.json();

        if (data.length === 0) {
            setHasMore(false);
        } else {
            const filteredProducts = data.filter((item) => item.status === "active");

            setDonation((prevPet) => (pageNumber === 1 ? filteredProducts : [...prevPet, ...filteredProducts]));
        }

        setIsLoading(false);
    };

    //Initial data fetch
    useEffect(() => {
        fetchDonationData(page);
    }, [page]);

  
    // Handle infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            // Check if the user has scrolled to the bottom of the page and there's more data
            if (
                window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
                hasMore
            ) {
                // Increment the page number to fetch more data
                setPage((prevPage) => prevPage + 1);
            }
        };

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore]);

    

    return (
        <div>
            <div>
                <div>
                    {donation.length > 0 ? (

                        <div>
                            <h1 className="text-center font-bold text-6xl mb-5 mt-5"> Available <span className="text-[#E59285]">  Donations</span></h1>
                            <hr />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 ">
                                {

                                    donation?.map(donationItem => <DonationCampaignCard key={donationItem._id} donationItem={donationItem}></DonationCampaignCard>)

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
                                                <p className="mb-5 text-xl ">There is noting to show </p>
                                               
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

export default DonationsCampaign;