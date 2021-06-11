import React, {useState, useEffect} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {database} from "../firebase"
import { useAuth } from "../Context/AuthContext"

const AddCoins = () => {
    const [items, setItems] = useState([])
    const [coin, setCoin] = useState('')
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const addCoinToList = (e) => {
       e.preventDefault()
        if (!items.find((item) => item.name === coin)){
           setItems([...items, {id: items.length, name: coin}]);
        setError('Coin Added')
        } else{
            setError('Coin already added')
        }
    }
    
    // function getCoins(){
    //     setLoading(true)
    //     database.users.onSnapshot((querySnapshot) => {
    //         const itemsArr = [];
    //         querySnapshot.forEach((doc) => {
    //             itemsArr.push(doc.data());
    //         });
    //    // console.log(itemsArr)
    //     setLoading(false)
    //     setItems([{id:1, name:'penis'}])
    //     // for(let i= 0; i < itemsArr.length; i++){
    //     //     if(itemsArr.[i].coins[i]){
    //     //     console.log(i)
    //     //     console.log(itemsArr.[i].coins[i].name)
    //     //     }
    //     // }
    //     })
    //     console.log('success')
    // }

    useEffect(() => {
        //getCoins()
        console.log(items)
    }, []);

    useEffect(() => {
        database.users.doc(currentUser.uid).set({
                coins: items
        });
    }, [items]);

    return (
<div>
        <Card>
            <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={addCoinToList}>
                    <Form.Group id="coins">
                        <Form.Label>Coins</Form.Label>
                        <Form.Control type="text" onChange={e => setCoin(e.target.value)} required />
                    </Form.Group>
                    <Button type="submit" className="w-100">Add Coins</Button>
                </Form>
            </Card.Body>
        </Card>
        </div>
    );
}

export default AddCoins;
