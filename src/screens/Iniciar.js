import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Iniciar () {

    useEffect(() => {
        localStorage.clear()
    },[])
    
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">

            <TextoInicio />
       
            <BtnInicio />

        </div>
    );
}

function TextoInicio () {

    return (
        <div className="text_avisos mb-5">
            <h5>Clique no botão para iniciar o seu atendimento no Tottem!</h5>
        </div>
    )
}

function BtnInicio () {

    const [iniciar, setIniciar] = useState(false);

    return (
        <div className="d-flex justify-content-center mt-5">
            {iniciar && <Navigate to="/cardapio" />}
            <button className="btn btn_pagamento" onClick={() => {setIniciar(true)}}>Clique para Iniciar</button>
        </div>
    )
}