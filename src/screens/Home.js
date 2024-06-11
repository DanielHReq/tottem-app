import React, { useEffect, useState } from "react";
import axios from "axios";


export default function HomePage () {

    return (
        <div>

            <h3>Cardápio</h3>

            <ItemList />
        </div>
    )
}




/**
 * Ainda não utilizado
 * 
 * Serve para separar os item pelo seu tipo
 */
function ItemSection () {

    return (
        <div className="mt-4 mb-1">
            <h4>Section</h4>
        </div>
    )
}
/*
function ItemListGroup () {

    return (
        <div className="list-group">
        </div>
    )
}
*/
function ItemListGroupItem ({item}) {

    //return (<h5>{JSON.stringify(item)}</h5>);

    
    return (
        <div className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{item.nome}</h5>
                <small>Valor: {item.valor}</small>
            </div>
            <p>{item.descricao}</p>
        </div>
    )
}



function ItemList () {

    const [itens, setItens] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


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
            <li>

                <ItemListGroupItem item={item} />
            </li>
        )
    }

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <button onClick={showItens}>Listar itens</button> Podemos trocar este botão por uma caixa de texto
            { itens ? (
                <div className="list-group">
                    {itens.map(showItem)}
                </div>
                    

                ) : null
            }
        </div>
    );
}