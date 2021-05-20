//import {useState, useEffect} from "react"
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";

function Movers (props) {
//const [cryptoName, setCryptoName] = useState("")

// changeType () {
//     if ({props.change} > 0){
//         return (<span className="negative">{props.change}</span>);
//     } else {
//         return (<span className="positive">{props.change}</span>);
//     }
// }

 return (
     <div className="box row">
         <div className="col-sm-8">
         <p className="symbol">{props.symbol}</p>
         <p className="name">{props.name}</p>
         <p className="price">${parseFloat(props.price).toFixed(2)}</p>
        </div>
        <div className="col-sm-4">
        {props.change > 0 ?
            <div><MdTrendingUp size="3em" color="#fa5b5b"/><p className="changePos">{props.change}%</p></div>
            :
            <div><MdTrendingDown size="3em" color="#fa5b5b"/><p className="changeNeg">{props.change}%</p></div>
            }
        </div>
     </div>
 )
}

export default Movers