//import {useState, useEffect} from "react"
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";

import '../components/Movers.css';

function Movers (props) {
//const [cryptoName, setCryptoName] = useState("")


 return (
     <div className="box row">
         <div className="col-7">
         <p className="symbol">{props.symbol}</p>
         <p className="name">{props.name}</p>
         <p className="price">${parseFloat(props.price).toFixed(2)}</p>
        </div>
        <div className="col-5" style={{margin: "10px 0px", borderLeft: "1px solid #eaecfb"}}>
        {props.change > 0 ?
            <div style={{marginTop:"4px"}}><Sparklines data={props.history}>
            <SparklinesLine color="#14ce71" />
            </Sparklines><MdTrendingUp size="1.4em" color="#14ce71"/><p className="changePos">{props.change}%</p></div>
            :
            <div style={{marginTop:"4px"}}><Sparklines data={props.history}>
            <SparklinesLine color="#fa5b5b" />
            </Sparklines><MdTrendingDown size="1.4em" color="#fa5b5b"/><p className="changeNeg">{props.change}%</p></div>
            }
        </div>
     </div>
 )
}

export default Movers