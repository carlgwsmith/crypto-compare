import React, {useState, useEffect} from 'react';
import {
  Highlighter,
  Menu,
  MenuItem,
  Typeahead,
} from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const CoinSearch = (props) => {

const [coins, setCoins] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')

const options = [
  {
    label: 'Item 1',
    path: 'http://localhost.com/item1',
  },
  {
    label: 'Item 2',
    path: 'http://localhost.com/item2',
  },
  {
    label: 'Item 3',
    path: 'http://localhost.com/item3',
  },
];

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
  <Typeahead
    id="open-window"
    options={options}
    placeholder="Select an item..."
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
    )}
  />
)
}

export default CoinSearch
