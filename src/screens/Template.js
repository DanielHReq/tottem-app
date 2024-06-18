import { Outlet } from "react-router-dom";

export default function Template () {

    return (
        <div className="d-flex flex-column gap-5">
            <header className="w-100">
                <img src="../../Header_BurguerEGrill_Tottem.jpg" className="img-fluid"></img>
            </header>
            <Outlet />
        </div>
    )
}