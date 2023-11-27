
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/normal/pet.jpg';
import './Featured.css';


const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle subHeading="Love Your Pet" heading="Pet Season" ></SectionTitle>
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-60 pb-20 pt-12 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">Its Fill your Free</p>
                    <p>
                        Adopting a pet brings companionship, health benefits, and a sense of routine and responsibility. Pets encourage exercise, outdoor activities, and socialization. Their unconditional love fosters emotional well-being and teaches empathy. The daily interactions provide a sense of purpose and reduce stress, creating a fulfilling bond.</p>

                </div>
            </div>
        </div>
    );
};

export default Featured;