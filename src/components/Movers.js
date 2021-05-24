//import {useState, useEffect} from "react"
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
import TinyChart from './TinyChart';
import '../components/Movers.css';

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
         <div className="col-8">
         <p className="symbol">{props.symbol}</p>
         <p className="name">{props.name}</p>
         <p className="price">${parseFloat(props.price).toFixed(2)}</p>
        </div>
        <div className="col-4" style={{margin: "10px 0px", borderLeft: "1px solid #eaecfb"}}>
        {props.change > 0 ?
            <div style={{marginTop:"4px"}}><TinyChart data={props.sparkline}/>{console.log(props.sparkline)}<p className="changePos">{props.change}%</p></div>
            :
            <div style={{marginTop:"4px"}}><MdTrendingDown size="2.4em" color="#fa5b5b"/><p className="changeNeg">{props.change}%</p></div>
            }
        </div>
     </div>
 )
}

export default Movers