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
  fetch("https://coinranking1.p.rapidapi.com/markets", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
		"x-rapidapi-host": "coinranking1.p.rapidapi.com"
	}
})
.then(response => {
	if(response.ok){
    response.json().then((json) => {
      setData(json.data.markets)
      console.log(json.data.markets)
      // let dataArr = []
      // for(let i=0; i<json.data.markets.length; i++){
      //   dataArr.push({
      //     symbol: '<img src="'+json.data.markets[i].sourceIconUrl+'"></img>"',
      //     name: json.data.markets[i].sourceName
      //   })
      // }
      // console.log(dataArr)
      // const DataArr = []
      // const totalMarketCap = Object.entries(json.data.total_market_cap)
      // const totalVolume = Object.entries(json.data.total_volume)
      // for (let i = 0;  i < 10; i++){
      //   DataArr.push({
      //     name: totalMarketCap.[i].[0],
      //     marketcap: totalMarketCap.[i].[1],
      //     volume: totalVolume.[i].[1]
      //   })
      // }
      // setData(DataArr)
      //setData(dataArr)
    })
    }
})
.catch(err => {
	console.error(err);
});
}, []);

function imageFormatter(cell, row){
  return (<span><img src={row.sourceIconUrl} width="25px" style={{paddingRight:"10px"}}alt="market logo"/>{row.sourceName}</span>) ;
}

function twoDeci(cell, row){
  return(Number(cell).toFixed(2))
}
function twoDeciDollar(cell, row){
  return('$' + Number(cell).toFixed(2))
}

const columns = [
  {
    text: "Market Name",
    dataField:"sourceIconUrl",
    width:"40",
    sort: false,
    formatter: imageFormatter
  },
  {
    text: "Market Symbol",
    dataField:"baseSymbol",
    width:"40",
    sort: false,
  },
  {
    dataField: "marketShare",
    text: "Market Share",
    formatter:twoDeci,
    sort: true
  },
  {
    dataField: "rank",
    text: "Market Rank",
    sort: true
  },
  {
    dataField: "volume",
    text: "Total Volume",
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
