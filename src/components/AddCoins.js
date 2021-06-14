import React, {useState, useEffect} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead';
import {database} from "../firebase"
import { useAuth } from "../Context/AuthContext"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Wallet from './Wallet'
import { data } from 'jquery';

const AddCoins = () => {
    const [items, setItems] = useState([])
    const [multiSelections, setMultiSelections] = useState([]);
    const [coins, setCoins] = useState([]);
    const [coin, setCoin] = useState('')
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
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
        console.error(err);
    });
    }, []);

    useEffect(() => {
        getCoins()
    }, []);

    const addCoinToList = (e) => {
       e.preventDefault()
        // if (!multiSelections.find((item) => item.name === coin)){
        //    setItems([...multiSelections, {id: multiSelections.length, name: coin}]);
        // setError('Coin Added')
        // } else{
        //     setError('Coin already added')
        // }
        console.log(items)
        let submitArray = []
        for(let i=0; i < multiSelections.length; i++){
           submitArray.push({
               id:i,
               name: multiSelections[i].name,
               symbol: multiSelections[i].symbol
           })
        }
        database.users.doc(currentUser.uid).set({
            coins: submitArray
    });
        
    }

    
    function getCoins(){
        setLoading(true)
        database.users.doc(currentUser.uid).get().then(
        doc => {
            let data = (doc.data());
            console.log(data);
            const dataArray = Object.entries(data);
            console.log(dataArray.coins)
        }
        )
        setLoading(false)
        // setMultiSelections([{id:multiSelections.length, name:'btc', }])
        // })
        console.log('success')
    }

    return (
<div>
        <Card>
            <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={addCoinToList}>
                    {/* <Form.Group id="coins">
                        <Form.Label>Coins</Form.Label>
                        <Form.Control type="text" onChange={e => setCoin(e.target.value)} required />
                    </Form.Group> */}
                    <Form.Group style={{ marginTop: '20px' }}>
                        <Form.Label>Select Multiple Coins</Form.Label>
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
                    {multiSelections.length !== 6}
                    {multiSelections.slice(0,20).map((coin, index) => (
                    <div key={index}>
                        <Wallet symbol={coin.symbol} price={coin.price} name={coin.name} change={coin.change} history={coin.history}/>
                    </div>
                    ))}
                    <Button type="submit" className="w-100">Add Coins</Button>
                </Form>
            </Card.Body>
        </Card>
        </div>
    );
}

export default AddCoins;
