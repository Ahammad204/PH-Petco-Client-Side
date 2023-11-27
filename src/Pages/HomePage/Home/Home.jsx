import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import CallToActionSection from "../CallToActionSection/CallToActionSection";
import Categories from "../Category/Categories";
import DownloadApp from "../DownloadApp/DownloadApp";
import Featured from "../Featured/Featured";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <CallToActionSection></CallToActionSection>
            <DownloadApp></DownloadApp>
        <Featured></Featured>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;