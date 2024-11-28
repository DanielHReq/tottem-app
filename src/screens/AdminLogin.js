import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function LoginScreen() {

    const logout = () => {
        localStorage.clear();
    }

    useEffect(() => {
        logout();
    }, [])

    return (
        <div>
            <div className="d-flex flex-column align-items-center gap-4">
                <h3 className="text_avisos">Login</h3>
                <Login />
            </div>
        </div>
    );
}


function Login () {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [logged, setLogged] = useState(null);


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
            setLogged(true);
            // Optionally, you can redirect the user to another page or perform other actions upon successful login
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage("Os dados de login não estão corretos.");
            // Handle error appropriately, e.g., display an error message to the user
        }
    };

    return (
        <div className="my-4 w-50">
            { logged && (
                <Navigate to="/pedidos" />
            )}
            {errorMessage && (
                <div className="d-flex flex-column mb-3 align-items-center">
                    <div className="row mb-3">{errorMessage}</div>
                </div>
            )}
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label className="col-form-label col-sm-2" for="login-control">Login:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="text"
                            id="login-control"
                            value={phoneNumber}
                            placeholder="número de celular"
                            onChange={(e) => setPhoneNumber (e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-form-label col-sm-2" for="password-control">Senha:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="password"
                            id="password-control"
                            value={password}
                            onChange={(e) => setPassword (e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="d-flex flex-column mb-3 align-items-center">
                    <div><button className="btn btn-primary mb-3" type="submit">Login</button></div>
                </div>
            </form>
        </div>
    )
}