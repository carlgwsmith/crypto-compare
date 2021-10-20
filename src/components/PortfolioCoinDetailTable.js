import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap'
import numeral from 'numeral'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const currencyFormatter = (item) => numeral(item).format('$0,0')


const PortfolioDetailTable = (props) => {
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)

useEffect(() => {
  setData([])
  getCoinData()
}, [props.data]);


function getCoinData(){
  setLoading(true)
  console.log(props.data)
  for (let i = 0; i < props.data.length; i++){
    fetch("https://coinranking1.p.rapidapi.com/coin/"+props.data.[i].id, {
"method": "GET",
"headers": {
  "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  "x-rapidapi-host": "coinranking1.p.rapidapi.com"
}
}).then(response => {
  if(response.ok){
  response.json().then((json) => {
    setData(data => [...data,
      {

        name: json.data.coin.name,
        change: json.data.coin.change,
        markets:json.data.coin.markets,
        symbol: json.data.coin.symbol,
        listedAt: json.data.coin.listedAt,
        totalSupply: json.data.coin.totalSupply,
        circulatingSupply: json.data.coin.circulatingSupply,
        marketCap: json.data.coin.marketCap,
        rank:json.data.coin.rank,
        color:json.data.coin.color,
        icon: json.data.coin.iconUrl,
        price: json.data.coin.price,
      }
    ])
    console.log(data)
  })
  }
})
  }
  setLoading(false)
}

function imageFormatter(cell, row){
  return (<img src={row.icon} width="25px" style={{paddingRight:"10px"}} alt="market logo"/>) ;
}

function twoDeci(cell, row){
  return(Number(cell).toFixed(2) + "%")
}
function twoDeciDollar(cell, row){
  return('$' + Number(cell).toFixed(2))
}

const columns = [
  {
    text: "",
    dataField:"icon",
    width:"40",
    sort: false,
    classes: 'mktNameCol',
    formatter: imageFormatter,
  },
  {
    dataField:"name",
    text:"Name",
    sort: true,
  },
  {
    text: "Price",
    dataField:"price",
    sort: false,
    formatter: twoDeciDollar,
  },
  {
    dataField: "rank",
    text: "Rank",
    sort: true,
    classes: 'rankCol'
  },
  {
    dataField:"change",
    text:"Change",
    sort: true,
  },
  {
    dataField:"marketCap",
    text:"Market Cap",
    sort: true,
  },
  {
    dataField:"circulatingSupply",
    text:"Circulating Supply",
    sort: true,
  },
  {
    dataField:"listedAt",
    text:"Listed At",
    sort: true,
  }
];

const defaultSorted = [
  {
    dataField: "marketcap",
    order: "asc"
  }
];

return (
    <div class="statsTable">
      <BootstrapTable 
      bootstrap4
      striped
      bordered={false}
      headerWrapperClasses="statsTableHead"
      keyField='id'
      data={ data }
      columns={ columns }
      defaultSorted={defaultSorted}
      pagination={paginationFactory({
        hidePageListOnlyOnePage: true,
        showTotal: true,
        sizePerPage: 5
      })}
      />
    </div>
);
}

export default PortfolioDetailTable;
