import { Link } from "react-router-dom";

function RouteLink({ name, path }: any) {
    return (
        <Link style={{ textDecoration: "none", color: "inherit" }} to={path}>
            { name }
        </Link>
    )
}

export default RouteLink;