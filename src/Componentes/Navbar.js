import React from "react";
import "./Componentes.css";

// Componente responsavel por fixar as opções na barra superior da página.
export default class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // renderização da tela
    render(){
        return (
            // Elemento nav com as logos da empresa
            <nav className="navbar">
                <a href="/" className="logo"><img src="./logo.png" width={150} alt="logo"/></a>
                <ul className="menu">
                    <img src="./icon.png" width={35} alt="logo"/>
                </ul>
            </nav>
        )
    }
}