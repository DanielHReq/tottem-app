/**
 * PÁGINA DE PAGAMENTO
 * 
 * contém funcionalidades e input relacionados ao login do cliente e pagamento dos itens selecionados
 * 
 * SEÇÕES DA PÁGINA
 * 
 * 1. Revisão do pedido
 * 2. Input para login
 * 3. Input / botão para pagamento
 * 
 * pagamento ---> pedido_realizado
 * 
 */

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



/**
 * 
 */
export default function Pagamento() {

    return (
        <div className="mx-5 mt-5">

            <Link to="http://localhost:3000/cardapio"><h3>Pagamento</h3></Link>

            <PaymentArea />

            <LoginArea />
            
            <RevisaoPedido />

            <BtnPagamento />

        </div>
    );
}


/**
 * Resgata Itens e quantidades do localStorage
 * @returns container com lista dos Itens adquiridos de localStorage
 */
function RevisaoPedido() {

    return (
        <div>
            <h4>Revise os itens do pedido</h4>
            <ItemList />
        </div>
    )
}


/**
 * 
 * @returns list-group de Item
 */
function ItemList() {

    const [errorMessage, setErrorMessage] = useState(null);

    const [itemList, setItemList] = useState(null);

    let localItemList = [];


    useEffect(() => {
        showItens();
    }, [])


    const showItens = async () => {

        localItemList = []

        for (let i = 0; i < localStorage.length; i++) {
            let key_name
            key_name = localStorage.key(i)

            if (key_name == "token") continue;

            try {
                const response = await axios.get("http://localhost:8080/cardapio/" + key_name, {
                    responseType: "json"
                })

                console.log([response.data[0], localStorage.getItem(key_name)]);

                localItemList.push([response.data[0], localStorage.getItem(key_name)]);

            } catch (error) {
                console.error("Error getting id ", key_name, error);
            }
        }

        setItemList(localItemList);

        console.log(localItemList);
    }


    const showItem = (itemQuantidadePair) => {
        return (
            <ItemQuantidadeListGroupItem pair={itemQuantidadePair} />
        )
    }

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            {itemList ? (
                <div>
                    <div className="list-group">
                        {itemList.map(showItem)}
                    </div>
                </div>
            ) : null
            }
        </div>
    );
}


/**
 * 
 * @param {*} pair Array com 0: Dicionário com 1 Item ; 1: Quantidade associada ao Item
 * @returns list-group-item
 */
function ItemQuantidadeListGroupItem({ pair }) {

    return (
        <div className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
                <div className="col-8">
                    <h5 className="mb-1">{pair[0].nome}</h5>
                    <small>Valor: {pair[0].valor}</small>
                </div>
                <div className="col-4">
                    <small>Quantidade: {pair[1]}</small>
                </div>
            </div>
        </div>
    )
}




function LoginArea() {

    return (
        <div>
            <h4>Confirme seu cadastro</h4>
            <div className="row">
                <div className="mb-3 col-6">
                    <label for="name" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="customer-name"/>
                </div>
                <div className="mb-3 col-6">
                    <label for="name" className="form-label">Celular</label>
                    <input type="text" className="form-control" id="customer-phone"/>
                </div>
                <div className="mb-3 col-6">
                    <label for="name" className="form-label">Mesa</label>
                    <input type="number" className="form-control" id="customer-table"/>
                </div>
            </div>
        </div>
    )
}

function PaymentArea() {
    return (
        <div>
            <h4>Realize o pagamento</h4>
            código-pix-código-pix-código-pix-código-pix-código-pix-código-pix-código-pix-código-pix-código-pix-código-pix-código-pix-código-pix-código-pix-código-pix
        </div>
    )
}


/**
 * Assim que este botão for apertado, deve acontecer a chamada de POST Pedido no backend
 * 
 * o body da requisição recebe BigDecimal valor, String status, String comentario, Map<Long, Integer> itensPedido
 * 
 * @returns 
 */
function BtnPagamento() {
    
    return (
        <div className="col">
            <Link className="btn btn-warning float-end" to="/confirmacao">Finalizar Pedido</Link>
        </div>
    )
}
