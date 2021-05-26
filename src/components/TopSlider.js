import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, {useEffect, useState} from "react";
import Movers from "./Movers";
import {GiFirewall} from "react-icons/gi"
//import { CoinContext } from '../Context/CoinContext';

export default function TopSlider () {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
fetch("https://coinranking1.p.rapidapi.com/coins", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "576a270f4emshce03cc0d892e394p15648fjsnddb66ef301e9",
		"x-rapidapi-host": "coinranking1.p.rapidapi.com"
	}
})
.then(response => {
  if(response.ok){
    response.json().then((json) => {
      //console.log(json.data.coins)
      setCoins(json.data.coins)
      setIsLoading(false);
    })
  }
})
.catch(err => {
	console.error(err);
});
}, []);


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    centerPadding: 10,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1256,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div style={{padding:"0px 10px"}}>
      <p className="moversTitle">🔥 Today's Top Movers 🔥</p>
      <Slider {...settings}>
      {isLoading && <p>Loading Coins</p>}
            {coins.length !== 6}
            {coins.slice(0,20).map((coin, index) => (
              <div key={index}>
                <Movers symbol={coin.symbol} price={coin.price} name={coin.name} change={coin.change} history={coin.history}/>
              </div>
            ))}
      </Slider>
    </div>
  );
}