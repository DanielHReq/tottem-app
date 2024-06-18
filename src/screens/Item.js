import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";

import '../styles/colors.css'


export default function Item() {
    const {id} = useParams()
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-5">
        
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
        <div className="my-4 w-75">
            { item ? (
               <div className="card">
                    <div className="container-fluid box_item">
                        <img src="https://uploads.metropoles.com/wp-content/uploads/2022/05/03124339/hamburguer-8.jpg" className="card-img-top pt-3 ps-1 w-50 "></img>
                    </div>
                    <div className="card-body box_item">
                        <h4 className="card-title text_item">{item.nome}</h4>
                        <p className="pb-4 text_item_descricao">{item.descricao}</p>
                        <h3 className="card-title">
                            <strong>
                                <div className="text_item">R${item.valor}</div>
                            </strong>
                        </h3>
                    </div>
                </div>
                ) : null
            }
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
                <i className="bi bi-chevron-compact-left"/>item
            </button>
        </div>
    )
} 