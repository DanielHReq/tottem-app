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



/**
 * 
 */
export default function Pagamento() {

    return (
        <div>

            <h3>Pagamento</h3>

            <RevisaoPedido />

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
                const response = await axios.get("http://localhost:8080/cardapio/"+key_name, {
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
            <li>
                <ItemQuantidadeListGroupItem pair={itemQuantidadePair} />
            </li>
        )
    }

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            { itemList ? (
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
function ItemQuantidadeListGroupItem ({pair}) {

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

}

function PaymentArea() {

}

