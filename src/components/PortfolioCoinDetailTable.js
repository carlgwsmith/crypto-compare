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
  getHis()
}, [props.data]);


function getHis(){
  setLoading(true)
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
        id: props.data.[i].id,
        name: props.data.[i].name,
        history: json.data.history,
        color:props.data.[i].color
      }
    ])
  })
  }
})
  }
  setLoading(false)
}

function imageFormatter(cell, row){
  return (<span><img src={row.sourceIconUrl} width="25px" style={{paddingRight:"10px"}}alt="market logo"/>{row.sourceName} ({row.baseSymbol})</span>) ;
}

function twoDeci(cell, row){
  return(Number(cell).toFixed(2) + "%")
}
function twoDeciDollar(cell, row){
  return('$' + Number(cell).toFixed(2))
}

const columns = [
  {
    dataField: "rank",
    text: "Rank",
    sort: true,
    classes: 'rankCol'
  },
  {
    text: "Market Name",
    dataField:"sourceIconUrl",
    width:"40",
    sort: false,
    classes: 'mktNameCol',
    formatter: imageFormatter
  },
  {
    dataField: "marketShare",
    text: "Market Share",
    formatter:twoDeci,
    classes: 'mktShareCol',
    sort: true
  },
  {
    dataField: "volume",
    text: "Total Volume",
    classes: 'mktVolCol',
    formatter:twoDeciDollar,
    sort: true
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
