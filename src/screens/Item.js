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
        <>
            { item ? (
               <div class="card w-25">
                    <div class="container-fluid box_item">
                        <img src="https://uploads.metropoles.com/wp-content/uploads/2022/05/03124339/hamburguer-8.jpg" class="card-img-top pt-3 ps-1 w-50 "></img>
                    </div>
                    <div class="card-body box_item">
                        <h4 class="card-title text_item">{item.nome}</h4>
                        <p class="pb-4 text_item_descricao">{item.descricao}</p>
                        <h3 class="card-title">
                            <strong>
                                <div className="text_item">R${item.valor}</div>
                            </strong>
                        </h3>
                    </div>
                </div>
                ) : null
            }
        </>
)

}

function ReturnHome () {

    const [clicked, setClicked] = useState(false);

    return (
        <div className="w-25">
            { clicked && (
                <Navigate to="/cardapio" />
            )}

            <button className="btn btn_finaliza_pedido" onClick={() => setClicked(true)}>
                <div className="row">
                    <div className="col text_avisos">
                        <i class="bi bi-chevron-compact-left h4"></i>
                    </div>
                    <div className="col text_avisos">
                        <h4>Item</h4>
                    </div>
                </div>
            </button>
        </div>
    )
} 