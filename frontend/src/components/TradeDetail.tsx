import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function TradeDetail({name, value }: any) {
    return (
        <React.Fragment key={name}>
            <Grid item xs={6}>
                <Typography gutterBottom>{name}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom>{value}</Typography>
            </Grid>
        </React.Fragment>
    )
}


export default TradeDetail;