/**
 * PÁGINA DE PEDIDOS
 * 
 * acesso aos pedidos no sistema pelo funcionário logado
 * 
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Link, Navigate } from "react-router-dom";


let refreshData = false;

export default function Pedidos() {

    return (
        <div>
            <div className="d-flex flex-column align-items-center gap-4">
                <h3 className="text_avisos">Pedidos</h3>
                <PedidoList />
            </div>
        </div>
    );
}


/**
 * 
 * @param {*} item Dicionário com 1 Item
 * @returns list-group-item
 */
function ItemListGroupItem({ item }) {

    const [marcado, setMarcado] = useState(false);

    const marcarItem = async () => {
        setMarcado(!marcado);
    }

    useEffect(() => {
        console.log("teste");
    })

    const areaInterna = () => {
        return (
            <div className="d-flex w-100 text_item2">
                {/*}
                {console.log(item)}
                {console.log(item.id)}
                {console.log(item.quantidade)}
                {console.log(item.item)}
                    */}
                <div className="col p-2 pt-3 d-flex">
                    <div className="col-2"><h5>{item.item.nome}</h5></div>
                    <div className="col-4">
                        <p className="my-1">{item.item.descricao}</p>
                    </div>
                </div>

                <div className="col px-2 pt-3">
                    <div className="float-end">
                        <h5>x {item.quantidade}</h5>
                        <Link className="text_item2" onClick={marcarItem}>Marcar como pronto</Link>
                    </div>
                </div>

            </div>
        )
    }

    if (marcado) {
        return (
            <div className="list-group-item marked_item rounded border-0 mb-2">
                {areaInterna()}
            </div>
        )
    } else {
        return (
            <div className="list-group-item box_item2 rounded border-0 mb-2">
                {areaInterna()}
            </div>
        )
    }
}


/**
 * 
 * @param {*} pedido Dicionário com 1 Pedido 
 * @returns list-group-item
 */
function PedidoListGroupItem({ pedido, refresh }) {

    /**
     * Concluí pedido e apaga card 
     */
    const concluirPedido = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.put("http://localhost:8080/pedidos/" + pedido.id, {
                responseType: "json",
            });

            console.log("PUT de pedido feito!");
        } catch (error) {
            console.error("Error (PUT):", error);
        }

        // refresh pedidos
        refresh();

    }

    const showItem = (item) => {
        return (
            <ItemListGroupItem item={item} />
        )
    }

    return (
        <div className="list-group-item box_item rounded border-0 mb-4">
            <div className="d-flex w-100 text_item mb-4">
                
                {console.log(pedido)}
                
                <div className="col">Pedido {pedido.id}</div>

                <div className="col">
                    <div className="float-end">Mesa {pedido.mesa}</div>
                </div>
                
            </div>

            <div className="d-flex w-100 text_item2">
                {pedido ? (
                    <div className="list-group w-100">
                        {pedido.itensPedido.map(showItem)}
                    </div>
                ) : null
                }
            </div>

            <div className="d-flex w-100 text_item2">
                <div className="col">
                    <Link className="text_item float-end" onClick={concluirPedido}>Concluir pedido</Link>
                </div>
            </div>
        </div>
    )
}


function PedidoList() {

    const [pedidos, setPedidos] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [redirect, setRedirect] = useState(false);

    
    /**
     * GET de pedidos em aberto
     */
    let refreshPedidos = React.useCallback(async () => {
        console.log("refreshing...")
        if (localStorage['token'] == null) { setRedirect(true); return; }
        try {
            const response = await axios.get("http://localhost:8080/pedidos/aberto", {
                headers: {
                    Authorization: 'Bearer ' + localStorage['token'],
                },
                responseType: "json"
            });

            //console.log(response.data)
            setPedidos(response.data);
        } catch (error) {
            console.error("Error on GET Pedidos:", error);
        }
    },[])


    useEffect(() => {
        refreshPedidos();

        // polling
        const interval = setInterval(() => {
            refreshPedidos();
            console.log(".");
        }, 5000);

        return () => clearInterval(interval);
    }, [])


    const showPedido = (pedido) => {
        return (
            <PedidoListGroupItem key={pedido.id} pedido={pedido} refresh={refreshPedidos} />
        )
    }

    return (
        <div className="my-4 w-75">
            {redirect && <Navigate to={"/admlogin"} />}
            {errorMessage && <p>{errorMessage}</p>}
            {pedidos ? (
                <div className="list-group">
                    {pedidos.map(showPedido)}
                </div>
            ) : (
                <p>Não há pedidos no momento.<br/>Tem certeza que você está logado?</p>
            )
            }
        </div>
    )
}