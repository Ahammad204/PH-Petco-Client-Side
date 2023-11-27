
import { Link } from 'react-router-dom';

import './Error.css'

const Error = () => {
  return (
    <div>
      <header>
        <h4 className="header-title">404 Not Found</h4>
      </header>
      <main>
        <div className="main-container">
          <div className="error-image">
            <img className="error-img" src="https://i.ibb.co/8jMS4dr/Scarecrow.png" alt="" />
          </div>
          <div className="error-details">
            <h1 className="error-title">I have bad news <br /> for you</h1>
            <p className="error-detail">The page you are looking <br /> for might be removed or is <br /> temporarily unavailable</p>
          <Link to="/"> <button className="btn text-white border-none bg-[#f04336]">Back to homepage</button></Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Error;
