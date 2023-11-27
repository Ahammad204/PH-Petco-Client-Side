import Banner from "../Banner/Banner";
import CallToActionSection from "../CallToActionSection/CallToActionSection";
import Categories from "../Category/Categories";
import DownloadApp from "../DownloadApp/DownloadApp";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <CallToActionSection></CallToActionSection>
            <DownloadApp></DownloadApp>
        </div>
    );
};

export default Home;