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


export default function HomePage() {

    return (
        <div>
            <div className="d-flex flex-column align-items-center gap-4">
                <h3 className="text_avisos">Cardápio</h3>
                <ItemList />
            </div>
            <Footer />
        </div>
    )
}


function Footer() {

    return (
        <div className="fixed-bottom d-flex flex-column align-items-center">
            <div className="my-4 w-75">
                <BtnPedido />
            </div>
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
function BtnPedido() {
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
        <div className="col pb-5">
            <Link className="btn btn_finaliza_pedido float-end" to="/pagamento">
                <div className="text_avisos">Finalizar Pedido</div>
            </Link>
        </div>
    )
}

/**
 * 
 * @param {*} item Dicionário com 1 Item
 * @returns list-group-item
 */
function ItemListGroupItem({ item }) {

    return (
        <div className="list-group-item box_item rounded border-0 mb-4">
            <div className="d-flex w-100 text_item">

                <div className="col-2">
                    <div className="ratio ratio-1x1">
                        <img className="img-fluid object-fit-cover rounded" src="https://uploads.metropoles.com/wp-content/uploads/2022/05/03124339/hamburguer-8.jpg"/>
                    </div>
                </div>
                
                <div className="col p-2 pt-3">
                    <p className="mb-1">{item.nome}</p>
                    <h5>R${item.valor}</h5>
                </div>

                <div className="col p-2 pt-3">
                    <div className="float-end">
                        <QuantidadeItem id={item.id} /><br/>
                        <Link className="text_item float-end" to={"/item/" + item.id} >detalhes</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}


/**
 * Ok
 * @returns btn-group para subtrair ou adicionar itens e mostrar a quantidade atual
 */
function QuantidadeItem({ id }) {

    const [quantidade, setQuantidade] = useState(
        (localStorage.getItem(id)) ? Number(localStorage.getItem(id)) : 0
    );


    const subItem = async () => {
        if (quantidade) setQuantidade(quantidade - 1);
    }

    const addItem = async () => {
        setQuantidade(quantidade + 1)
    }


    useEffect(() => {

        if (quantidade) localStorage.setItem(id, quantidade)
        else localStorage.removeItem(id)

    }, [quantidade])


    return (
        <div className="btn-group d-flex align-items-center" role="group">
            <button type="button" className="btn text_item_descricao" onClick={subItem}><i class="bi bi-dash-circle"></i></button>
            <div className="mx-1 text_item_descricao">{quantidade}</div>
            <button type="button" className="btn text_item_descricao" onClick={addItem}><i class="bi bi-plus-circle"></i></button>
        </div>
    );
}


/**
 * 
 * @returns list-group de Itbox_itemem
 */
function ItemList() {

    const [itens, setItens] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        showItens();
    }, [])


    const showItens = async (e) => {
        //e.preventDefault();

        try {
            const response = await axios.get("http://localhost:8080/cardapio/", {
                responseType: "json", // Specify responseType as JSON
            });

            console.log(response.data);
            setItens(response.data);

            console.log("Showing itens successful!");
            // Optionally, you can redirect the user to another page or perform other actions upon successful login
        } catch (error) {
            console.error("Error showing itens:", error);
            // Handle error appropriately, e.g., display an error message to the user
        }
    };

    const showItem = (item) => {
        return (
            <ItemListGroupItem item={item} />
        )
    }

    return (
        <div className="my-4 w-75">
            {errorMessage && <p>{errorMessage}</p>}
            {itens ? (
                <div className="list-group">
                    {itens.map(showItem)}
                </div>
            ) : null
            }
        </div>
    );
}