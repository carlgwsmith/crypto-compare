import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, {useEffect, useState} from "react";
import Movers from "./Movers";
//import { CoinContext } from '../Context/CoinContext';

export default function TopSlider () {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
fetch("https://api.coinranking.com/v2/coins?orderBy=change", {
	"method": "GET",
	"headers": {
    "x-access-token": process.env.REACT_APP_COINRANKING_API_KEY
	}
})
.then(response => {
  if(response.ok){
    response.json().then((json) => {
     // console.log(json.data.coins)
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
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 6,
    slidesToScroll: 1,
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
  if(isLoading){
    return (<p className="text-center mt-5">Loading Coins...</p>)
  }
  return (
    <div>
      {/* <p className="moversTitle">🔥 Today's Top Movers 🔥</p> */}
      <Slider {...settings}>
            {coins.length !== 6}
            {coins.slice(0,20).map((coin, index) => (
              <div key={index}>
                <Movers icon={coin.iconUrl} symbol={coin.symbol} price={coin.price} name={coin.name} change={coin.change} history={coin.history} id={coin.id}/>
              </div>
            ))}
      </Slider>
    </div>
  );
}