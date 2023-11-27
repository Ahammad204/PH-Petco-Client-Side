import { FaAppStore, FaGooglePlay } from "react-icons/fa6";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const DownloadApp = () => {
    return (
        <div>
<SectionTitle heading="App Section" subHeading="Download Our App"></SectionTitle>
        <div className="md:flex ml-32 mt-10 gap-20">

            <div className="mt-7">
                <h1 className="font-bold text-5xl">Download <span className="text-[#f04336]">Our Petco</span> <br />  App For Free</h1>

                <p className="mt-8 font-medium text-lg">Download our Petco app for free... <br /> And Adopt your pet from mobile.</p>

                <div className=" md:flex mt-10 gap-5">
                    
                    <div className="flex gap-3 bg-[#f04336] text-white rounded-xl justify-center items-center  btn h-auto hover:bg-[#f04336]">
                       <FaGooglePlay className="w-10 h-20"></FaGooglePlay>
                      <div className=""> 
                      <span>Get it on</span><br />
                       <p>Play Store</p>
                      </div>
                      
                    </div>
                    <div className="flex gap-3 bg-[#f04336] text-white pl-5 pr-5 rounded-xl justify-center items-center cursor-pointer btn h-auto hover:bg-[#f04336]">
                       <FaAppStore className="w-10 h-20"></FaAppStore>
                      <div className=""> 
                      <span>Get it on</span><br />
                       <p>App Store</p>
                      </div>
                      
                    </div>
                    
                </div>

            </div>
            <div className="ml-6">
                <img className="w-full h-96" src={"https://i.ibb.co/820p6R1/73-730368-social-media-app-buffer-also-recently-released-a-1.png"} alt="" />
            </div>
        </div>
    </div>
    );
};

export default DownloadApp;