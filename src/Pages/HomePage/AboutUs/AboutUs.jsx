import { FaFlag,FaClipboardCheck } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const AboutUs = () => {
    return (

        
        <div className="mt-10">
            <SectionTitle heading="About Us" subHeading="How We Work"></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                <div className="card  bg-base-100 shadow-xl">
                    <figure className="text-7xl text-[#f04336]"><FaFlag></FaFlag></figure>
                    <div className="card-body">
                        <h2 className="card-title text-center font-outfit font-bold text-xl">Find And Register for the New Pet</h2>
                        <p>We take Pet and Take Care of it and we also Inspired People for the Adopt</p>

                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <figure className="text-7xl text-[#f04336]"><FaClipboardCheck></FaClipboardCheck></figure>
                    <div className="card-body">
                        <h2 className="card-title text-center font-outfit font-bold text-xl">Check The Health And Give Treatment to pet</h2>
                        <p>We are serious about Pet Health...We seriously take care Our pets</p>

                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <figure className="text-7xl text-[#f04336]"><FaPeopleGroup></FaPeopleGroup></figure>
                    <div className="card-body">
                        <h2 className="card-title text-center font-outfit font-bold text-xl">Delivered Pet To Your Door</h2>
                        <p>We delivered Pet door to door and Inspired People...</p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;