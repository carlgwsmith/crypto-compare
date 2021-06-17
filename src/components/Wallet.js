import React, {useState, useEffect} from 'react';
import {Card, Alert, Button} from 'react-bootstrap'
import {database} from "../firebase"
import firebase from 'firebase/app'
import { MdDeleteForever } from "react-icons/md";
import { useAuth } from "../Context/AuthContext"

import '../components/CSS/Wallet.css';

const Wallet = (props) => {
    const { currentUser } = useAuth()
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const [active, setActive] = useState(false)


    if(loading){
        return <h1>loading...</h1>;      
    }

function truncateString(string, limit) {
    if (string.length > limit) {
      return string.substring(0, limit) + "..."
    } else {
      return string
    }
  }

  function deleteCoin(){
    const coin = {
      id: props.id,
      name: props.name,
      price: props.price,
      symbol: props.symbol
    }
    console.log(coin)
    database.users.doc(currentUser.uid).update({coins: firebase.firestore.FieldValue.arrayRemove(coin)});
    setActive(true)
    window.location.reload(false);
}

 return (
     <div className={active ? 'slide-out-top box row' : 'box row'}>
         <div className="col-6">
         <p className="symbol">{props.symbol}</p>
         <p className="name">{props.name}</p>
         <p className="price">${parseFloat(props.price).toFixed(2)}</p>
        </div>
        <div className="col-6">
          <Button onClick={deleteCoin} style={{borderRadius:'40px', padding:'10px', marginTop:'20px', float:'right'}} variant="danger"><MdDeleteForever style={{fontSize:"1.5em"}}/></Button>
        </div>
     </div>
 )
}

export default Wallet;
