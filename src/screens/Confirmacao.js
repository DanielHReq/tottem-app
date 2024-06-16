
export default function Confirmacao() {
  return (
    <div >
        <h3>Confirmacao</h3>

        <confimacaoPedido />

    </div>
  );
}


function confirmacaoPedido(){
  return(
    <div className="d-flex justify-content-center">
      <h5>Pedido realizado com sucesso!</h5>

      <BtnConfirmacao />

    </div>
  )
}

function BtnConfirmacao () {
  return (
      <div className="d-flex w-100">
          <Link className="btn btn-warning" to="/home">Ok</Link>
      </div>
  )
}