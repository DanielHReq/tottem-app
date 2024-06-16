import { Outlet } from "react-router-dom";

export default function Template () {

    return (
        <div>
            <header>Header</header>
            <Outlet />
            <footer>Footer</footer>
        </div>
    )
}