import React, { useCallback, useContext, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import { PricerState } from '../state/GlobalState';
import PriceDataItem from './PriceDataItem';
import TradeDetail from './TradeDetail';
import {  GET_TRADE_PRICE } from '../backend/apollo/query';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_FINANCIAL_DEFINITION, CREATE_MARKET_DATA } from '../backend/apollo/mutation';



export default function PriceReview() {

    const {
        instr: [instrument, ],
        type: [type, ],
        maturity: [maturity, setMaturity],
        strike: [strike, ],
        spot: [spot, ],
        volatility: [volatility, ],
        interestRate: [interestRate,],
        instrCurrency: [instrumentCurrency, ],
        quantity: [quantity,],
        price: [priceValue, setPriceValue],
        financialDefinitionId: [finDefId, setFinDefId],
        marketDataId: [mktDataId, setMktDataId],
        isMarketDataFormModified: [isMktDataFormModified, setIsMktDataModified],
        isFinancialDefinitionFormModified: [isFindefFormModified, setIsFindefFormModified],
        isPriceCalculated: [isPriceCalculated, setIsPriceCalculated]
    } = useContext(PricerState);

    const [isEvent, setIsEvent] = useState(false);
    const [eventMessage, setEventMessage] = useState("");

    let strMaturity = "";
    try {
        strMaturity = new Date(maturity.toString()).toISOString().substring(0, 10);
        console.log(strMaturity);
    }
    catch (ex: any) {
        strMaturity = new Date().toISOString().substring(0, 10);
        setMaturity(new Date());
    }

    
    
    const [createFinancialDefinition] = useMutation(CREATE_FINANCIAL_DEFINITION);
    const [createMarketData] = useMutation(CREATE_MARKET_DATA);
    const [getTradePrice, { loading, data }] = useLazyQuery(GET_TRADE_PRICE, { variables: { finDefId, marketDataId: mktDataId, quantity: Number(quantity) } });

    const createFinancialDef = useCallback(async () => {
        const res = await createFinancialDefinition({ variables: { strike: Number(strike), maturity: strMaturity, type, instrumentName: instrument } })
        if (res.data.createFinancialDefinition.success === false) {
            setIsEvent(true);
            setEventMessage(res.data.createFinancialDefinition.messages[0]);
        }
        else {
            setIsFindefFormModified(false)
            setFinDefId(Number(res.data.createFinancialDefinition.id));
        }
    }, []);

    const createMketData = useCallback(async () => {
        const res = await createMarketData({ variables: { volatility: Number(volatility), spot: Number(spot), interestRate: Number(interestRate) } })
        if (res.data.createMarketData.success === false) {
            setEventMessage(res.data.createMarketData.messages[0]);
            setIsEvent(true);
        }
        else {
            setIsMktDataModified(false);
            setMktDataId(Number(res.data.createMarketData.id));
        }
    }, []);

    const getPrice = () => {
        if (loading) {
            setPriceValue("loading...");
        }

        if (data) {
            if (!data.getTradePrice.success) {
                setEventMessage(data.getTradePrice.messages[0]);
                setIsEvent(true);
            }
            else {
                setPriceValue(Number(data.getTradePrice.messages[0]));
                setIsPriceCalculated(true);
            }
        }
    }

    useEffect(() => {
        getPrice()
    }, [getPrice])

    useEffect(() => {
        if (isFindefFormModified) {
            createFinancialDef();
        }     
    }, [])

    useEffect(() => {
        if (isMktDataFormModified) {
            createMketData();
        }
            
    }, [])
   
    useEffect(() => {
        if (!isPriceCalculated && !isFindefFormModified && !isMktDataFormModified && finDefId && mktDataId && finDefId !== 0 && mktDataId !== 0) {
            console.log(finDefId, mktDataId);
            getTradePrice();
        }
    }, [isPriceCalculated, isFindefFormModified, isMktDataFormModified]);


    if (isEvent)
        return (<p>{eventMessage}</p>)

    return (
        <React.Fragment>
            <div style={{ textAlign: "center" }}>
                <Typography  variant="h4" gutterBottom>
                    Price {priceValue.toString()} {instrumentCurrency.toString() }
                </Typography>
            </div>
            <Typography variant="h6" gutterBottom>
               Summary
            </Typography>
            <List disablePadding>
                <PriceDataItem text="strike" value={strike.toString()} />
                <PriceDataItem text="spot" value={spot.toString()} />
                <PriceDataItem text="maturity" value={strMaturity } />
                <PriceDataItem text="volatility" value={volatility.toString()} />
                <PriceDataItem text="interestRate" value={interestRate.toString()} />
            </List>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Instrument
                    </Typography>
                    <Typography gutterBottom>{ instrument.toString() }</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Trade details
                    </Typography>
                    <Grid container>
                        <TradeDetail name="Trade type" value={type.toString()} />
                        <TradeDetail name="Trade quantity" value={quantity.toString()} />
                        <TradeDetail name="Trade date" value={new Date().toISOString().substring(0, 10) } />
                        <TradeDetail name="Price" value={priceValue} />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}