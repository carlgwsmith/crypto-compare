import React, {useState, useEffect} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {database} from "../firebase"
import { useAuth } from "../Context/AuthContext"

const AddCoins = () => {
    const [items, setItems] = useState([])
    const [coin, setCoin] = useState('')
    const { currentUser } = useAuth()
    const [error, setError] = useState('')

    const addCoinToList = () => {
        if (!items.find((item) => item.name === coin)){
            setItems([...items, {id: items.length, name: coin}])
            console.log('coin set')
            database.users.doc(currentUser.uid).set({
                coins: items
            });
        } else{
            setError('Coin already added')
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        addCoinToList()
        console.log(items);
        console.log('done')
    }

    // useEffect(() => {
    //     database.users.doc(currentUser.uid).set({
    //         coins: items
    //     });
    // }, []);

    return (
<div>
        <Card>
            <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="coins">
                        <Form.Label>Coins</Form.Label>
                        <Form.Control type="text" value={coin} onChange={e => setCoin(e.target.value)} required />
                    </Form.Group>
                    <Button type="submit" className="w-100">Add Coins</Button>
                </Form>
            </Card.Body>
        </Card>
        </div>
    );
}

export default AddCoins;
