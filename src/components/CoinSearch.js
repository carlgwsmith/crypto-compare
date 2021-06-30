import React, {useState, useEffect} from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import { BiSearchAlt } from "react-icons/bi";

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
  fetch("https://coinranking1.p.rapidapi.com/coins?limit=100", {
      "method": "GET",
      "headers": {
          "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
          "x-rapidapi-host": "coinranking1.p.rapidapi.com"
      }
  })
  .then(response => {
      if(response.ok){
      response.json().then((json) => {
          setCoins(json.data.coins)
          setLoading(false);
          console.log(coins)
      })
      }
  })
  .catch(err => {
      setError('No Coins Yet')
  });
  }, []);

return(
  <>
  <h2 className="text-center">Search for a coin</h2>
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
            onClick={() => window.open(result.path)}
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
