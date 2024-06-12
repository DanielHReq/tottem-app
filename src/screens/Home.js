import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";

export default function HomePage () {

    return (
        <div>
              
            <h3>Cardápio</h3>

            <ItemList />
        </div>
    )
}

function ItemListGroupItem ({item}) {

    return (
        <div className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
                <div className="col-6">
                    <h5 class="mb-1">{item.nome}</h5>
                    <small>Valor: {item.valor}</small>
                </div>
                <div className="col-6">
                    <QuantidadeItem />
                    <Link className="btn btn-danger"  to={"/item/"+item.id}>Descricao</Link>
                </div>
            </div>
        </div>
    )
}

function QuantidadeItem () {
    return (
        <div className="btn-group"  role="group" > 
            <button type="button" className="btn btn-primary"></button>
            <p>qtd</p>
            <button type="button" className="btn btn-primary"></button>
        </div>
    );
}

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
            <li>
                <ItemListGroupItem item={item} />
            </li>
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