import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap'
import numeral from 'numeral'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const currencyFormatter = (item) => numeral(item).format('$0,0')


const DetailTable = (props) => {
const [data, setData] = useState([])

useEffect(() => {
  fetch("https://api.coinranking.com/v2/markets", {
	"method": "GET",
	"headers": {
    "x-access-token": process.env.REACT_APP_COINRANKING_API_KEY
    }
})
.then(response => {
	if(response.ok){
    response.json().then((json) => {
      setData(json.data.markets)
      console.log(json.data.markets)
    })
    }
})
.catch(err => {
	console.error(err);
});
}, []);

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
        {/* <Table striped bordered hover variant="light">
            <tbody>
                <tr>
                    <td>Market Cap</td>
                    <td>$ {Number(props.price).toFixed(2)}</td>
                </tr>
                    {marketCapPercentage.map((cap, index) => (
                      <tr key={index}>
                        <td>{cap.[1]}</td>
                      </tr>
                    ))}
                <tr>
                    <td>Volume</td>
                    <td>{currencyFormatter(props.volume)}</td>
                </tr>
                <tr>
                    <td>Total Supply</td>
                    <td>{props.supply}</td>
                </tr>
                <tr>
                    <td>Total Circulating Supply</td>
                    <td>{props.circulating}</td>
                </tr>
                <tr>
                    <td>Rank</td>
                    <td>#{props.rank}</td>
                </tr>
            </tbody>
</Table> */}
    </div>
);
}

export default DetailTable;
