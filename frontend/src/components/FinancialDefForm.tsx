import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { PricerState } from '../state/GlobalState';
import { onNumericalDataChange } from '../views/Pricer';
import { useQuery } from '@apollo/client';
import { GET_INSTRUMENTS } from '../backend/apollo/query';


export default function FinancialDefForm() {
    const {
        instr: [instrument, setInstrument],
        type: [type, setType],
        maturity: [maturity, setMaturity],
        strike: [strike, setStrike],
        quantity: [quantity, setQuantity],
        isFinancialDefinitionFormModified: [, setIsFindefFormModified],
        isPriceCalculated: [, setIsPriceCalculated]
    } = useContext(PricerState);

    const { loading, error, data } = useQuery(GET_INSTRUMENTS);

    if (error)
        return <p>An error occured</p>
    if (loading)
        return <p>Loading...</p>
  
    const res = data.getInstruments;

    if (res.sucess)
        return <p>{ res.messages[0] }</p>

    const { instruments } = res;

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Financial definition
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-standard-label">Instrument</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="instruments"
                            label="Instrument"
                            defaultValue=""
                            value={instrument}
                            onChange={e => {
                                setIsFindefFormModified(true);
                                setIsPriceCalculated(false);
                                setInstrument(e.target.value.toString())
                            }}
                        >
                            {instruments.map((instr: any) => (
                                <MenuItem value={instr.name}>{instr.name}</MenuItem>
                             ))} 
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl sx={{ m: 2, minWidth: 12 }}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="Type"
                            value={type}
                            onChange={e => {
                                setIsFindefFormModified(true);
                                setIsPriceCalculated(false);
                                setType(e.target.value.toString())
                            }}
                        >
                            <FormControlLabel  value="call" control={<Radio />} label="Call" />
                            <FormControlLabel value="put" control={<Radio />} label="Put" />

                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="number"
                        id="strike"
                        name="strike"
                        label="Strike"
                        value={strike}
                        onChange={e => {
                            setIsFindefFormModified(true);
                            setIsPriceCalculated(false);
                            onNumericalDataChange(e.target.value, setStrike)
                        }}
                        fullWidth
                        autoComplete="Strike*"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    type="number"
                    id="strike"
                    name="strike"
                    label="Quantity"
                    value={quantity}
                        onChange={e => {
                            setIsFindefFormModified(true);
                            setIsPriceCalculated(false);
                            onNumericalDataChange(e.target.value, setQuantity)
                        }}
                    fullWidth
                    autoComplete="Quantity*"
                    variant="standard"
                />
            </Grid>
          
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Maturity"
                            value={maturity}
                            onChange={(newValue) => {
                                setIsFindefFormModified(true);
                                setIsPriceCalculated(false);
                                setMaturity(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}