import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FinancialDefForm from '../components/FinancialDefForm';
import MarketDataForm from '../components/MarketDataForm';
import PriceReview from '../components/PriceReview';
import Copyright from '../components/Copyright';
import NavBar from '../components/Navbar';
import { PricerState } from '../state/GlobalState';
import { useMutation, useQuery } from '@apollo/client';
import { GET_INSTRUMENT_BY_NAME } from '../backend/apollo/query';
import { BOOK_TRADE } from '../backend/apollo/mutation';

const steps = ['Financial Definition', 'Market Data', 'Pricing Review'];

export const onNumericalDataChange = (val: any, handle: (value: any) => void) => {
    if (val !== "" && val <= 0)
        handle(1);
    else
        handle(val);
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <FinancialDefForm />;
        case 1:
            return <MarketDataForm />;
        case 2:
            return <PriceReview />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();

export default function Pricer() {
    const [instrument, setInstrument] = React.useState("AIR LIQUIDE S.A.");
    const [strike, setStrike] = React.useState(1);
    const [tradeType, setTradeType] = React.useState("call");
    const [maturity, setMaturity] = React.useState(new Date());
    const [volatility, setVolatility] = React.useState(1);
    const [spot, setSpot] = React.useState(1);
    const [interestRate, setInterestRate] = React.useState(1);
    const [quantity, setQuantity] = React.useState(1);
    const [instrumentCurrency, setInstrumentCurrency] = React.useState("");
    const [finDefId, setFinDefId] = React.useState(0);
    const [mktDataId, setMktDataId] = React.useState(0);
    const [priceValue, setPriceValue] = React.useState(0);
    const [tradeID, setTradeID] = React.useState(0);
    const [tradeBookingStatus, setTradeBookingStatus] = React.useState({ title: "", message: "" });
    const [isFindefFormModified, setIsFindefFormModified] = React.useState(true);
    const [isMktDataFormModified, setIsMktDataModified] = React.useState(true);
    const [isPriceCalculated, setIsPriceCalculated] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);

    const { data } = useQuery(GET_INSTRUMENT_BY_NAME, { variables: { name: instrument } });

    useEffect(() => {
        if (data) {
            setInstrumentCurrency(data.getInstrumentByName.currency);
        }
    }, [data]);


    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            bookTradeHandler();
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const [bookTrade] = useMutation(BOOK_TRADE);

    const bookTradeHandler = async () => {
        const res = await bookTrade({ variables: { finDefId, marketDataId: mktDataId, price: priceValue, quantity: Number(quantity) } });

        if (res.errors) {
            setTradeBookingStatus({ title: "Booking error", message: "An error occured in booking" });
        }

        if (res.data) {
            if (res.data.bookTrade.success) {
                setTradeID(res.data.bookTrade.messages[0]);
                setTradeBookingStatus({
                    title: "Trade Booked Successfully",
                    message: `Your trade number is ${res.data.bookTrade.messages[0]}. Next time, You can use this code to recover your trade`
                });
            }
            else {
                setTradeBookingStatus({ title: "Booking error", message: `on est al${res.data.bookTrade.messages[0]}` });
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Pricer
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    {tradeBookingStatus.title}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {tradeBookingStatus.message}
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {
                                    <PricerState.Provider
                                        value={
                                            {
                                                instr: [instrument, setInstrument],
                                                strike: [strike, setStrike],
                                                type: [tradeType, setTradeType],
                                                maturity: [maturity, setMaturity],
                                                volatility: [volatility, setVolatility],
                                                spot: [spot, setSpot],
                                                interestRate: [interestRate, setInterestRate],
                                                quantity: [quantity, setQuantity],
                                                instrCurrency: [instrumentCurrency, setInstrumentCurrency],
                                                financialDefinitionId: [finDefId, setFinDefId],
                                                marketDataId: [mktDataId, setMktDataId],
                                                price: [priceValue, setPriceValue],
                                                tradeId: [tradeID, setTradeID],
                                                isFinancialDefinitionFormModified: [isFindefFormModified, setIsFindefFormModified],
                                                isMarketDataFormModified: [isMktDataFormModified, setIsMktDataModified],
                                                isPriceCalculated: [isPriceCalculated, setIsPriceCalculated]
                                            }
                                        }
                                    >
                                        {getStepContent(activeStep)}
                                    </PricerState.Provider>

                                }
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === 0 ? 'next' : activeStep === 1 ? 'show price' : 'book'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}