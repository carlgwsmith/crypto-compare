import React, {useState, useEffect} from 'react';
import {Card, Alert} from 'react-bootstrap'
import {database} from "../firebase"
import { useAuth } from "../Context/AuthContext"

const Wallet = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()
    const [error, setError] = useState('')

    function getCoins(){
        setLoading(true)
        database.users.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
        setItems(items)
        console.log(items)
        setLoading(false)
        })
        console.log('success')
    }

    useEffect(() => {
        getCoins()
    }, []);

    if(loading){
        return <h1>loading...</h1>;      
    }

    return (
        <Card>
            {error && <Alert variant="danger">{error}</Alert>}
            <h1>Wallet</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </Card>
    );
}

export default Wallet;
