import React from 'react';
import {Table} from 'react-bootstrap'
import numeral from 'numeral'

const currencyFormatter = (item) => numeral(item).format('$0,0')


const DetailTable = (props) => {
return (
    <div>
        <Table striped bordered hover variant="light">
            <tbody>
                <tr>
                    <td>Current Price</td>
                    <td>$ {Number(props.price).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Market Cap</td>
                    <td>{currencyFormatter(props.cap)}</td>
                </tr>
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
</Table>
    </div>
);
}

export default DetailTable;
