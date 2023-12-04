import { FaFlag, FaClipboardCheck,  } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaPeopleGroup } from 'react-icons/fa6';

const AboutUs = () => {
    return (
        <div className="mt-10">
            <SectionTitle heading="About Us" subHeading="How We Work"></SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                <div className="card bg-base-100 shadow-xl">
                    <figure className="text-7xl text-[#f04336]">
                        <FaFlag></FaFlag>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-center font-outfit font-bold text-xl">
                            Find And Register for the New Pet
                        </h2>
                        <p>We take Pet and Take Care of it and we also Inspired People for the Adopt</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <figure className="text-7xl text-[#f04336]">
                        <FaClipboardCheck></FaClipboardCheck>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-center font-outfit font-bold text-xl">
                            Check The Health And Give Treatment to pet
                        </h2>
                        <p>We are serious about Pet Health...We seriously take care Our pets</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <figure className="text-7xl text-[#f04336]">
                        <FaPeopleGroup></FaPeopleGroup>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-center font-outfit font-bold text-xl">
                            Delivered Pet To Your Door
                        </h2>
                        <p>We delivered Pet door to door and Inspired People...</p>
                    </div>
                </div>



            </div>
            {/* New section for website introduction */}
            <div className="card mt-10 bg-base-100 shadow-xl">
                <figure className="text-7xl text-[#f04336]">
                   
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-center font-outfit font-bold text-xl">
                        About Pet Adoption and Donation
                    </h2>
                    <p>
                        Welcome to our website dedicated to pet adoption and donation. We believe in making a
                        positive impact on the lives of animals and connecting them with loving homes. Here is how
                        our website works:
                    </p>
                    <ul className="list-disc mt-4 ml-6">
                        <li>Find and register for a new pet that steals your heart.</li>
                        <li>Check the health of the pet and provide necessary treatments.</li>
                        <li>We deliver pets right to your door, ensuring a seamless and joyful experience.</li>
                    </ul>
                    <p className="mt-4">
                        Our mission is to inspire people to adopt and care for pets, creating a world where every
                        pet finds a loving home. Your support and contributions make a significant difference in
                        the lives of these animals. Thank you for being a part of our journey.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
