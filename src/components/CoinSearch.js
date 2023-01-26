import React, {useState, useEffect} from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import { BiSearchAlt } from "react-icons/bi";
import {useHistory} from 'react-router-dom';

import {
  Highlighter,
  ClearButton,
  Menu,
  MenuItem,
  Typeahead,
} from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import '../components/CSS/CoinSearch.css'

const CoinSearch = (props) => {

const [coins, setCoins] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
const [options, setOptions] =useState([])
const history = useHistory()

useEffect(() => {
  let optionsArray = []
    for(let i=0; i < coins.length; i++){
        optionsArray.push({
            id:i,
            label: coins[i].symbol + " (" + coins[i].name + ")",
            path: '/coin/' + coins[i].name +'/' + coins[i].id
        })
    }

    let sortedArray = optionsArray.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
  })
  setOptions(sortedArray)
}, [coins]);


useEffect(() => {
  fetch("https://api.coinranking.com/v2/coins?limit=100", {
      "method": "GET",
      "headers": {
        "x-access-token": process.env.REACT_APP_COINRANKING_API_KEY
        }
  })
  .then(response => {
      if(response.ok){
      response.json().then((json) => {
          setCoins(json.data.coins)
          setLoading(false);
          //console.log(coins)
      })
      }
  })
  .catch(err => {
      setError('No Coins Yet')
  });
  }, []);

  function viewCoin(e, path){
    if(e.charCode === 13) {
      window.open(path)
  }
  }

return(
  <>
  <inputGroup>
  <Typeahead
    id="open-window"
    options={options}
    placeholder="Search for a coin..."
    renderMenu={(results, menuProps, props) => (
      <Menu {...menuProps}>
        {results.map((result, idx) => (
          <MenuItem
            key={idx}
            onClick={() => history.push(result.path)}
            selected={(e) => console.log(e)}
            option={result}
            position={idx}>
            <Highlighter search={props.text}>{result.label}</Highlighter>
          </MenuItem>
        ))}
      </Menu>
    )}>
      {({ onClear, selected }) => (
      <div className="rbt-aux">
        {!!selected.length && <ClearButton onClick={onClear} />}
        {!selected.length && <BiSearchAlt size="2em"/>}
      </div>
    )}
    </Typeahead>
  </inputGroup>
  </>
)
}

export default CoinSearch
