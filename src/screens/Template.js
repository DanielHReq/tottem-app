import { Outlet } from "react-router-dom";

export default function Template () {

    return (
        <div>
            <header>
                <div className="fluid-container text-center text-bg-warning">
                    <div className="col-2">Header</div>
                    <div className="col"/>
                </div>
            </header>
            <Outlet />
        </div>
    )
}