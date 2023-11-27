import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaAnglesRight } from "react-icons/fa6";

const CallToActionSection = () => {
    return (
        <div>
            <SectionTitle heading={"Adopt A Pet"} subHeading={"Call To Action Section"}></SectionTitle>
            <div className="md:flex mt-4 gap-20 ">
                <div >
                    <img className="w-full h-96 rounded-lg" src={"https://i.ibb.co/gMF6fSf/Brewer-Companion-Dog-Application.webp"} alt="" />
                </div>
                <div className="mt-7">
                    <h1 className="font-bold text-5xl">Adopt Your <span className="text-[#f04336]">Pet</span> <br /> <span className="text-[#f04336]">Take </span>Responsibility </h1>

                    <p className="mt-8 font-medium text-lg">Adopting a pet is a wonderful and inspiring decision that <br /> can bring immense joy and fulfillment to your life.</p>

                    <div className="flex mt-14 gap-3 ">
                     <FaAnglesRight className="text-3xl text-[#f04336]"></FaAnglesRight> 
                        <p>Save A pet Life</p>
                    </div>
                    <div className="flex mt-4 gap-3">
                    <FaAnglesRight className="text-3xl text-[#f04336]"></FaAnglesRight> 
                        <p>Unconditional Love </p>
                    </div>
                    <div className="flex mt-4 gap-3">
                    <FaAnglesRight className="text-3xl text-[#f04336]"></FaAnglesRight> 
                        <p>Social Connection</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallToActionSection;