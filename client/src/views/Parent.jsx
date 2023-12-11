import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

export default function Parent({ url }) {
    return (<>
        <Nav url={url} />
        <Outlet />
    </>)
}