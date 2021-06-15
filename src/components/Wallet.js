import React, {useState, useEffect} from 'react';
import {Card, Alert} from 'react-bootstrap'
import {database} from "../firebase"
import { MdDeleteForever } from "react-icons/md";
import { useAuth } from "../Context/AuthContext"

const Wallet = (props) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()
    const [error, setError] = useState('')


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

 return (
     <div className="box row">
         <div className="col-6">
         <p className="symbol">{props.symbol}</p>
         <p className="name">{props.name}</p>
         <p className="price">${parseFloat(props.price).toFixed(2)}</p>
        </div>
        <div className="col-6">
          <MdDeleteForever style={{fontSize:"2em", marginTop:"22px", float:'right'}}/>
        </div>
     </div>
 )
}

export default Wallet;
