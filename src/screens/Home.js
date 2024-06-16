/**
 * PÁGINA DO CARDÁPIO
 * 
 * contém funcionalidades associadas ao cardápio do tottem
 * 
 * cardápio ---> item
 * cardápio ---> pagamento
 * 
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";


export default function HomePage () {

    return (
        <div className="mx-5">

            <h3>Cardápio</h3>

            <ItemList />

            <BtnPedido />

        </div>
    )
}


/**
 * Depende do conteúdo salvo em localStorage. Executa na seguinte ordem:
 * 
 * 1. Caso não haja nenhum Item armazenado, mantém na página
 * 2. Caso não haja token salvo, redireciona para a página de login
 * 3. Redireciona para a página de confirmação
 *  
 * @returns button que chama realizaPedido
 */
function BtnPedido () {
/*
    const realizaPedido = async () => {

        if (!pedido) {
            // caso pedido vazio

            return
        }

        localStorage.setItem("pedido", pedido);

        localStorage.getItem("token", token);
        
        if (!token) {
            // caso não logado - tela de login
        }

        // tela de confirmação

    }
*/
    return (
        <div className="d-flex w-100">
            <Link className="btn btn-warning" to="/pagamento">Realizar Pedido</Link>
        </div>
    )
}

/**
 * 
 * @param {*} item Dicionário com 1 Item
 * @returns list-group-item
 */
function ItemListGroupItem ({item}) {

    return (
        <a href={"/item/"+item.id} className="list-group-item rounded border-0 mb-2 text-bg-info">
            <div className="d-flex w-100">
                <div className="col-2 text-bg-warning">
                    <div className="mx-auto p-1 text-bg-primary"></div>
                </div>
                <div className="col-6 p-2 pt-3">
                    <p className="mb-1">{item.nome}</p>
                    <h5>R$ {item.valor}</h5>
                </div>
                <div className="col-6">
                    <QuantidadeItem id={item.id}/>
                </div>
            </div>
        </a>
    )
}


/**
 * 
 * @returns btn-group para subtrair ou adicionar itens e mostrar a quantidade atual
 */
function QuantidadeItem ({id}) {

    const [quantidade, setQuantidade] = useState (
        (localStorage.getItem(id)) ? Number(localStorage.getItem(id)) : 0
    );


    const subItem = async () => {
        if (quantidade) setQuantidade(quantidade - 1);
    }

    const addItem = async () => {
        setQuantidade(quantidade + 1)
    }


    useEffect (() => {

        if (quantidade) localStorage.setItem(id, quantidade)
        else localStorage.removeItem(id)

    }, [quantidade])


    return (
        <div className="btn-group"  role="group"> 
            <button type="button" className="btn btn-primary" onClick={subItem}></button>
            <p>{quantidade}</p>
            <button type="button" className="btn btn-primary" onClick={addItem}></button>
        </div>
    );
}


/**
 * 
 * @returns list-group de Item
 */
function ItemList () {

    const [itens, setItens] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        showItens();
    },
    [])


    const showItens = async (e) => {
        //e.preventDefault();
        
        try {
            const response = await axios.get("http://localhost:8080/cardapio/", {
                responseType: "json", // Specify responseType as JSON
            });

            console.log(response);
            setItens(response.data);
            
            console.log("Showing itens successful!");
            // Optionally, you can redirect the user to another page or perform other actions upon successful login
        } catch (error) {
            console.error("Error showing itens:", error);
            // Handle error appropriately, e.g., display an error message to the user
        }
    };

    const showItem = (item) => {
        return(
            <ItemListGroupItem item={item} />
        )
    }

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            { itens ? (
                <div>
                    <div className="list-group">
                        {itens.map(showItem)}
                    </div>
                </div>
                ) : null
            }
        </div>
    );
}