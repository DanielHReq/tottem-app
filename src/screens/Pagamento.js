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
import { Link, Navigate } from "react-router-dom";

// improviso
var globalCustomerName;
var globalPhoneNumber;
var globalMesa;

/**
 * 
 */
export default function Pagamento() {

    return (
        <div className="d-flex flex-column align-items-center gap-4">

            <ReturnHome />
            
            <PaymentArea />

            <LoginArea />
            
            <RevisaoPedido />

            <Footer />

        </div>
    );
}

function Footer() {

    return (
        <div className="fixed-bottom d-flex flex-column align-items-center">
            <div className="my-4 w-75">
                <BtnPagamento />
            </div>
        </div>
    )
}

function ReturnHome () {

    const [clicked, setClicked] = useState(false);

    return (
        <div>
            { clicked && (
                <Navigate to="/cardapio" />
            )}

            <button className="btn btn_finaliza_pedido" onClick={() => setClicked(true)}>
                <i className="bi bi-chevron-compact-left"/>Pagamento
            </button>
        </div>
    )
} 

/**
 * Resgata Itens e quantidades do localStorage
 * @returns container com lista dos Itens adquiridos de localStorage
 */
function RevisaoPedido() {

    return (
        <div className="d-flex flex-column align-items-center w-100">
            <h4 className="text_avisos pb-4 w-75">Revise os itens do pedido</h4>
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
        <div className="my-4 w-75">
            {errorMessage && <p>{errorMessage}</p>}
            {itemList ? (
                <div className="list-group">
                    {itemList.map(showItem)}
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
        <div className="list-group-item box_item rounded border-0 mb-4">
            <div className="d-flex text_item">
                
                <div className="col-2">
                    <div className="ratio ratio-1x1">
                        <img className="img-fluid object-fit-cover rounded" src="https://uploads.metropoles.com/wp-content/uploads/2022/05/03124339/hamburguer-8.jpg"/>
                    </div>
                </div>

                <div className="col p-2 pt-3">
                    <p className="mb-1">{pair[0].nome}</p>
                    <h5>R${pair[0].valor}</h5>
                </div>

                <div className="col-4 p-2 pt-3 text-end">
                    Quantidade: {pair[1]}
                </div>
            </div>
        </div>
    )
}

function LoginArea() {

    const [customerName, setCustomerName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [mesa, setMesa] = useState(null);

    useEffect(() => {
        globalCustomerName = customerName
    },[customerName])

    useEffect(() => {
        globalPhoneNumber = phoneNumber
    },[phoneNumber])

    useEffect(() => {
        globalMesa = mesa
    },[mesa])

    return (
        <div className="row w-75">
            <h4 className="text_avisos">Confirme seu cadastro</h4>
            <div className="row text_pagamento">
                <div className="mb-3 col-6">
                    <label for="name" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="customer-name" value={customerName} onChange={(e) => setCustomerName(e.target.value)}/>
                </div>
                <div className="mb-3 col-6">
                    <label for="name" className="form-label">Celular</label>
                    <input type="text" className="form-control" id="customer-phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
                <div className="mb-3 col-6">
                    <label for="name" className="form-label">Mesa</label>
                    <input type="number" className="form-control" id="customer-table" value={mesa} onChange={(e) => setMesa(e.target.value)}/>
                </div>
            </div>
        </div>
    )
}

function PaymentArea() {
    return (
        <div className="row  w-75">
            <h4 className="text_avisos">Realize o pagamento</h4>
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
    
    const [token, setToken] = useState(null);

    const [valorPedido, setValorPedido] = useState(0);
    const [itensPedido, setItensPedido] = useState(null);

    /**
     * Responsável pelo login 
     */
    const realizaLogin = async (e) => {
        e.preventDefault();

        const request_body = {
            "nome": globalCustomerName,
            "login": globalPhoneNumber,
            "role": "USER"
        }
        
        try {
            console.log(request_body);

            const response = await axios.post("http://localhost:8080/auth/loginreg", request_body);

            const t = response.data['token'];

            console.log("Login successful! Token:", t);

            setToken(t);

        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const realizaPedido = async (e) => {
        e.preventDefault();

        // BigDecimal valor, String status, **Integer mesa**, Map<Long, Integer> itensPedido
        const request_body = {
            "valor": valorPedido,
            "status": "Enviado",
            "mesa": globalMesa,
            "itensPedido": itensPedido
        }

        try {
            const response = await axios.post("http://localhost:8080/pedidos", request_body); // usando token para permissão

            console.log("POST de mesa feito!");
        } catch (error) {
            console.error("Error (POST): ", error);
        }
    }


    return (
        <div className="col">
            <btn className="btn" onClick={realizaLogin}>Login</btn>
            <btn className="btn" onClick={realizaPedido}>Pedido</btn>
            <Link className="btn btn_pagamento float-end" to="/confirmacao">Finalizar Pedido</Link>
        </div>
    )
}
