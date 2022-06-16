import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import "./Slide.css";


const images = [
  'https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg',
  'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Beauty_v2_en_US_1x._CB429089975_.jpg',
  'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/Holiday/GiftGuide/Fuji_TallHero_GG2_en_US_1x._CB418256337_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img20/Fashion/EVENT/WRS_Dec/GW/ATF/Brown-Prime/GW_PC_Prime_1500x600._CB413569294_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img20/Toys/HTL2020/DesktopTallhero_1500x600._CB413492549_.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/GW/TeaCoffee/GW_Grocery_hero_DesktopTallhero_1500x600._CB406487454_.jpg'
];

const properties = {
    duration: 5000,
    transition: 500,
    scale:0.4,
    autoplay: true,
    pauseOnHover:true,
    infinite: true,
    
    prevArrow: <div className="slide-prevarrow">
     </div>,
    nextArrow: <div className="slide-nextarrow">
    </div>
  };

const Slide = () => {
    return (
      <div className="slide-container">
        <Zoom {...properties} 
          >
          {
            images.map((each, index) => <img key={index} style={{width: "100%"}} src={each} alt="" />)
          }
        </Zoom>
      </div>
    )
}

export default Slide