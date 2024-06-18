import { Outlet } from "react-router-dom";
import styles from '../styles/styles.module.css';

export default function Template() {

    return (
        <div className="d-flex flex-column gap-5">
            <header>
                <div className={styles.header}></div>
            </header>
            <Outlet />
        </div>
    )
}