import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Confirmacao() {

    useEffect(() => {
        localStorage.clear()
    },[])
    
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">

            <ConfirmacaoPedido />

            <img className="img-fluid w-25" src="https://img.freepik.com/vetores-premium/ilustracao-de-marca-de-verificacao-verde_645153-10.jpg"/>
                    
            <BtnConfirmacao />

        </div>
    );
}

function ConfirmacaoPedido() {

    return (
        <div className="text_avisos">
            <h5>Pedido realizado com sucesso!</h5>
        </div>
    )
}

function BtnConfirmacao() {

    return (
        <div className="d-flex justify-content-center">
            <Link className="text_avisos" to="/cardapio">Cardápio</Link>
        </div>
    )
}