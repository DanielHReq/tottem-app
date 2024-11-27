import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function LoginScreen() {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();


        const request_body = {
            "login": phoneNumber,
            "senha": password,
            "role": "ADMIN"
        }
        
        try {
            const response = await axios.post("http://localhost:8080/auth/login", request_body);

            const token = response.data['token'];

            localStorage.setItem("token", token);
            console.log("Login successful! Token saved in local storage:", token);
            // Optionally, you can redirect the user to another page or perform other actions upon successful login
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage("Invalid phone number");
            // Handle error appropriately, e.g., display an error message to the user
        }
    };

    return (
        <div>
            <Logout />
            <h1>Login</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Login:</label>
                    <input
                        type="tel"
                        id="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber (e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="text"
                        id="text"
                        value={password}
                        onChange={(e) => setPassword (e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <Provisorio />
        </div>
    );
}


function Logout() {

    const Make_logout = () => {
        localStorage.clear();
        return "Deslogado"
    }


    return (
        <div>
            <h1>Logout</h1>
            <button onClick={Make_logout} >Logout</button>
        </div>
    );
}


function Provisorio () {

    const [errorMessage, setErrorMessage] = useState(null);
    const [logged, setLogged] = useState(null);


    const testLogin = async (e) => {
        e.preventDefault();
        
        try {

            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }
            
            console.log("You are logged", token);
            setLogged(true);
            // Optionally, you can redirect the user to another page or perform other actions upon successful login
        } catch (error) {
            console.error("Error showing carrinhos:", error);
            setErrorMessage("You're not logged yet!");
            // Handle error appropriately, e.g., display an error message to the user
        }
    };

    return (
        <div>
            <h1>Teste provisório</h1>
            {errorMessage && <p>{errorMessage}</p>}
            { logged && (
                <Navigate to="/pedidos" />
            )}
            <button onClick={testLogin}>Estou logado?</button>
        </div>
    );
}