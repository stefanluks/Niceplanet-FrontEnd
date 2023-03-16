import React from "react";
import "./Componentes.css";

export default class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return (
            <nav className="navbar">
                <div className="logo">{this.props.nome}</div>
                <ul className="menu">
                    <div>menu</div>
                </ul>
            </nav>
        )
    }
}