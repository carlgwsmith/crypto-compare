import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap'
import {database} from "../firebase"
import firebase from 'firebase/app'
import {FaRegEye} from "react-icons/fa"
import { GoTrashcan } from "react-icons/go"
import { useAuth } from "../Context/AuthContext"

import '../components/CSS/Wallet.css';

const Wallet = (props) => {
    const { currentUser } = useAuth()
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const [active, setActive] = useState(false)
    const history = useHistory();

function truncateString(string, limit) {
    if (string.length > limit) {
      return string.substring(0, limit) + "..."
    } else {
      return string
    }
  }

  const viewCoin = () =>{
    let path = '/coin/' + props.name +'/' + props.id;
    history.push(path)
  }

  function deleteCoin(){
    setLoading(true)
    const coin = {
      id: props.id,
      uuid: props.uuid,
      name: props.name,
      price: props.price,
      symbol: props.symbol,
      history: props.history,
      color: props.color
    }
    console.log(coin)
    database.users.doc(currentUser.uid).update({coins: firebase.firestore.FieldValue.arrayRemove(coin)});
    setLoading(false)
}

useEffect(() => {
  if(props){
    setLoading(false)
  }
  
}, [props]);

if(loading){
  return <h1 className="text-center pt-4">loading...</h1>;      
}
if(error){
  return <h1 className="text-center pt-4">No Coins, please add a coin to view your portfolio.</h1>
}
 return (
     <div className={active ? 'slide-out-top box row' : 'box row'} style={{marginLeft:"0px", marginRight:"0px"}}>
         <div className="col-sm-4">
          <p className="coinRowTop">Name</p>
          <p className="symbol" style={{paddingTop:"0px", marginTop:"7px"}}>{props.symbol} <span className="name">{props.name}</span></p>
        </div>
        <div className="col-sm-4">
          <p className="coinRowTop">Price</p>
          <p className="price" style={{marginTop:"7px"}}>${parseFloat(props.price).toFixed(2)}</p>
        </div>
        <div className="col-4">
        <p className="coinRowTop">Actions</p>
          <Button onClick={viewCoin} className="viewBtn" variant="success"><FaRegEye style={{fontSize:"1.2em"}}/> View</Button>
          <Button onClick={deleteCoin} className="delBtn" variant="danger"><GoTrashcan style={{fontSize:"1.2em"}}/> Delete</Button>
        </div>
     </div>
 )
}

export default Wallet;
