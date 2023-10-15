import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { PricerState } from '../state/GlobalState';
import { onNumericalDataChange } from '../views/Pricer';

export default function MarketDataForm() {

    const {
        spot: [spot, setSpot],
        volatility: [volatility, setVolatility],
        interestRate: [interestRate, setInterestRate],
        isMarketDataFormModified: [, setIsMktDataModified],
        isPriceCalculated: [, setIsPriceCalculated]
    } = useContext(PricerState);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Market Data
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="number"
                        id="volatility"
                        name="volatility"
                        label="Volatility"
                        fullWidth
                        autoComplete="Volatility*"
                        variant="standard"
                        value={volatility}
                        onChange={e => {
                            onNumericalDataChange(e.target.value, setVolatility);
                            setIsMktDataModified(true);
                            setIsPriceCalculated(false);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="number"
                        id="spot"
                        name="spot"
                        label="Spot"
                        fullWidth
                        autoComplete="Spot*"
                        variant="standard"
                        value={spot}
                        onChange={e => {
                            onNumericalDataChange(e.target.value, setSpot);
                            setIsMktDataModified(true);
                            setIsPriceCalculated(false);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="number"
                        id="interestrate"
                        name="interestrate"
                        label="Interest Rate"
                        fullWidth
                        autoComplete="Interest Rate*"
                        variant="standard"
                        value={interestRate}
                        onChange={e => {
                            setIsMktDataModified(true);
                            setIsPriceCalculated(false);
                            onNumericalDataChange(e.target.value, setInterestRate);
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}