import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function PriceDataItem({text, value}: any) {
    return (
        <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary={text} />
            <Typography variant="body2">{value}</Typography>
        </ListItem>
    )
}

export default PriceDataItem;
