import React, {useState, useEffect} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead';
import {database} from "../firebase"
import { useAuth } from "../Context/AuthContext"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Wallet from './Wallet'

const AddCoins = () => {
    const [multiSelections, setMultiSelections] = useState([]);
    const [coins, setCoins] = useState([]);
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    let coinArray = coins.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })

    useEffect(() => {
    fetch("https://coinranking1.p.rapidapi.com/coins?limit=100", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
            "x-rapidapi-host": "coinranking1.p.rapidapi.com"
        }
    })
    .then(response => {
        if(response.ok){
        response.json().then((json) => {
            setCoins(json.data.coins)
            setLoading(false);
        })
        }
    })
    .catch(err => {
        setError('No Coins Yet')
    });
    }, []);

    useEffect(() => {
        getCoins()
    }, []);

    const addCoinToList = (e) => {
       e.preventDefault()
        let submitArray = []
        for(let i=0; i < multiSelections.length; i++){
           submitArray.push({
               id:i,
               name: multiSelections[i].name,
               symbol: multiSelections[i].symbol,
               price: multiSelections[i].price
           })
        }
        database.users.doc(currentUser.uid).set({
            coins: submitArray
    });
        setSuccess('Coin(s) Added')
    }

    if(loading){
        return <h1>loading...</h1>;      
    }
    
    function getCoins(){
        setLoading(true)
        database.users.doc(currentUser.uid).get().then(
        doc => {
            let data = (doc.data());
            console.log(data);
            if(data === undefined){
                console.log('first timer')
            }else{
                const dataArray = Object.entries(data);
            setMultiSelections(dataArray.[0].[1])
            }
        }
        )
        setLoading(false)
        console.log('success')
    }

    return (
<div className="row">
    <div className="col-6">
    <div className="col-12"><h2 className="pt-4">Add Coins</h2></div>
        <Card>
            <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={addCoinToList}>
                    <Form.Group style={{ marginTop: '20px' }}>
                        <Form.Label>Type in a coin and click the <strong>"Add Coins"</strong> button below to save to your wallet.</Form.Label>
                        <Typeahead
                        id="basic-typeahead-multiple"
                        labelKey="name"
                        multiple
                        onChange={setMultiSelections}
                        options={coinArray}
                        placeholder="Choose several coins..."
                        selected={multiSelections}
                        />
                    </Form.Group>
                    <Button type="submit" className="w-100">Add Coins</Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
    <div className="col-6">
    <h2 className="pt-4">Coin Wallet</h2>
        {multiSelections.length !== 6}
        {multiSelections.slice(0,20).map((coin, index) => (
        <div key={index}>
            <Wallet symbol={coin.symbol} price={coin.price} name={coin.name} change={coin.change} history={coin.history} id={coin.id}/>
        </div>
        ))}
    </div>
</div>
    );
}

export default AddCoins;
