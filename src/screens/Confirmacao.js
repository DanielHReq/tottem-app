import { Link } from "react-router-dom";

export default function Confirmacao() {
    return (
        <div >
            <h3>Confirmacao</h3>

            <ConfirmacaoPedido />

            <BtnConfirmacao />
        </div>
    );
}


function ConfirmacaoPedido() {

    return (
        <div className="d-flex justify-content-center">
            <h5>Pedido realizado com sucesso!</h5>
        </div>
    )
}

function BtnConfirmacao() {

    return (
        <div className="d-flex justify-content-center">
            <Link className="btn btn-warning" to="/cardapio">Ok</Link>
        </div>
    )
}