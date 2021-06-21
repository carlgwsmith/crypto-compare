import React, {useEffect, useState} from 'react';

const CoinOverview = (props) => {
    const [coin, setCoin] = useState({})
    const [error, setError] = useState(false)

    const coinId = props.match.params.coinId

    useEffect(() => {
        fetch("https://coinranking1.p.rapidapi.com/coin/" + coinId, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
                "x-rapidapi-host": "coinranking1.p.rapidapi.com"
            }
        })
        .then(response => {
            if(response.ok){
            response.json().then((json) => {
                // setCoin(json.data.coins)
                // setLoading(false);
                setCoin(json.data.coin)
            })
            }
        })
        .catch(err => {
            setError('No Coins Yet')
        });
        }, []);

    return (
        <div>
            coin overview
            {coin.name}
            {coin.id}
            {coin.price}
            
        </div>
    );
}

export default CoinOverview;
