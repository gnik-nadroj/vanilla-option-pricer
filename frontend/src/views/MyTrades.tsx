import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import NavBar from '../components/Navbar';
import { useQuery } from '@apollo/client';
import { GET_TRADES } from '../backend/apollo/query';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Code', type: 'number'},
    { field: 'instrument', headerName: 'Instrument'},
    { field: 'price', headerName: 'Price', type: 'number'},
    { field: 'quantity', headerName: 'Quantity', type: 'number'},
    { field: 'date', headerName: 'Date', },
    { field: 'strike', headerName: 'Strike', type: 'number' },
    { field: 'maturity', headerName: 'Maturity', type: 'number' },
    { field: 'spot', headerName: 'Spot', type: 'number' },
    { field: 'volatility', headerName: 'Volatility',  type: 'number' },
    { field: 'interestRate', headerName: 'InterestRate', type: 'number' },
];

type row =
    {
        id: number,
        instrument: string
        price: number,
        quantity: number,
        date: string,
        strike: number,
        maturity: string,
        spot: number,
        volatility: number,
        interestRate: number
    }
export default function DataTable() {

    const [isEvent, setIsEvent] = React.useState(false);
    const [eventMessage, setEventMessage] = React.useState("");
    const [rows, setRows] = React.useState<Array<row>>([]);
    const { loading, error, data } = useQuery(GET_TRADES);

    function getTrades() {
        if (error) {
            setIsEvent(true);
            setEventMessage("An error occured");
        }
        if (loading) {
            setIsEvent(true);
            setEventMessage("Loading...");
        }
        if (data) {
            
            const res = data.me;
            let newRow: Array < row > = [];
            if (rows.length !== res.trades.length) {
                for (const elm of res.trades) {
                    newRow = [{
                        id: Number(elm.id),
                        instrument: elm.financialDef.instrument.name,
                        price: Number(elm.price),
                        quantity: Number(elm.quantity),
                        date: elm.date,
                        strike: Number(elm.financialDef.strike),
                        maturity: elm.financialDef.maturity,
                        spot: Number(elm.marketData.spot),
                        volatility: Number(elm.marketData.volatility),
                        interestRate: Number(elm.marketData.interestRate)
                    }
                        , ...newRow];
                }
                setRows(newRow);
            }
            setIsEvent(false)
        }
    }
    useEffect(() => {
        getTrades()
    }, [getTrades])
    
    return (
        <div>
            <div style={{ marginBottom: '3rem' }}>
                <NavBar />
            </div>
            <div style={{ margin: 'auto', height:'50.5rem', width: '66.5rem' }}>
                {isEvent ? <h1>{ eventMessage }</h1>:<DataGrid
                                                            rows={rows}
                                                            columns={columns}
                                                            pageSize={15}
                                                            rowsPerPageOptions={[15]}
                                                            checkboxSelection
                                                        />}
            </div>
        </div>
        
    );
}
