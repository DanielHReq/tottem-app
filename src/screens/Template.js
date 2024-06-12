import { Outlet } from "react-router-dom";

export default function Template () {

    return (
        <div>
            <header> Pizzaria </header>
            <Outlet />
            <footer>Pizza bye</footer>
        </div>
    )
}