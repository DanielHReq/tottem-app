/**
 * PÁGINA DE PEDIDOS
 * 
 * acesso aos pedidos no sistema pelo funcionário logado
 * 
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Link, Navigate } from "react-router-dom";


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
 * @param {*} pedido Dicionário com 1 Pedido 
 * @returns list-group-item
 */
function PedidoListGroupItem({ pedido }) {

    return (
        <div className="list-group-item box_item rounded border-0  mb-4">
            <div className="d-flex w-100 text_item"></div>
        </div>
    )
}


function PedidoList() {

    const [pedidos, setPedidos] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        refreshPedidos();
    }, [])

    /**
     * GET de pedidos em aberto
     */
    const refreshPedidos = async () => {

        try {
            const response = await axios.get("http://localhost:8080/pedidos/", {
                responseType: "json",
            });

            console.log(response.data)
            setPedidos(response.data);
        } catch (error) {
            console.error("Error on GET Pedidos:", error);
        }
    }

    const showPedido = (pedido) => {
        return (
            <PedidoListGroupItem pedido={pedido} />
        )
    }

    return (
        <div className="my-4 w-75">
            {errorMessage && <p>{errorMessage}</p>}
            {pedidos ? (
                <div className="list-group">
                    {pedidos.map(showPedido)}
                </div>
            ) : (
                <p>Não há pedidos no momento.</p>
            )
            }
        </div>
    )
}