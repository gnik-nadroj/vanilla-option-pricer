import { Button } from "@mui/material";
import RouteLink from "./RouteLink";


function AuthComponent() {
    return (
        <div>
            <Button href="/signIn"  variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                <RouteLink path="/signIn" name="SIGN IN" />
            </Button>
            <Button href="/signUp"  variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                <RouteLink path="/signUp" name="SIGN UP" /> 
            </Button>
        </div>
);
}

export default AuthComponent;