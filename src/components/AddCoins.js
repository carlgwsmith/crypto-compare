import React, {useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {database} from "../firebase"
import { useAuth } from "../Context/AuthContext"

const AddCoins = () => {
    const [coin, setCoin] = useState('')
    const { currentUser} = useAuth()

    function handleSubmit(e){
        e.preventDefault()
        console.log(coin);
        database.users.doc(currentUser.uid).set({
            coin: coin
        })
    }

    return (
<div>
        <Card>
            <Card.Body>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
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
