import { Outlet } from "react-router-dom";

export default function Template () {

    return (
        <div className="d-flex flex-column gap-5">
            <header className="text-center">
                <img src="../../Header_BurguerEGrill_Tottem.jpg" class="w-100"></img>
            </header>
            <Outlet />
        </div>
    )
}