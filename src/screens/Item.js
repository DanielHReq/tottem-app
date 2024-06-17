import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";


export default function Item() {
    const {id} = useParams()
  return (
    <div >
        <ReturnHome />

        <ItemListDescricao id={id}/>

    </div>
  );
}

function ItemListDescricao ({id}) {

    const [item, setItem] = useState(null);

    const showItemById = async (e) => {
         
        try {
            const response = await axios.get("http://localhost:8080/cardapio/"+id, {
                responseType: "json", // Specify responseType as JSON
            });

            console.log(response);

            console.log(response.data[0]);


            setItem(response.data[0]);
            
            console.log("Showing itens successful!");
            // Optionally, you can redirect the user to another page or perform other actions upon successful login
        } catch (error) {
            console.error("Error showing itens:", error);
            // Handle error appropriately, e.g., display an error message to the user
        }
    };


    useEffect(() => {
        showItemById();
    },
    [])

    return (
        <div>
            { item ? (
                <div class="card">
                    <img src="https://uploads.metropoles.com/wp-content/uploads/2022/05/03124339/hamburguer-8.jpg" class="card-img-top" alt="..."></img>
                    <div class="card-body">
                    <h5 class="card-title">{item.nome}</h5>
                    <p class="card-text">{item.descricao}</p>
                    <h5 class="card-title" color="#fcf7di">R${item.valor}</h5>
                    </div>
                </div>
                ) : null
            }
        </div>
    )

}
/**
 * 
    <div>
        <img src="..." class="card-img-top" alt="...">
        <small>Nome: {item.nome}</small>
        <small>Descricao: {item.descricao}</small>
        <small>Valor: {item.valor}</small>
    </div>
 * 
 */

function ReturnHome () {

    const [clicked, setClicked] = useState(false);

    return (
        <div>
            { clicked && (
                <Navigate to="/cardapio" />
            )}

            <button className="btn btn-primary" onClick={() => setClicked(true)}>item</button>
        </div>
    )
}