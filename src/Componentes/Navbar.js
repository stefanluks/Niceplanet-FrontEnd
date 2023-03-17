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
                <a href="/" className="logo"><img src="./logo.png" width={150} alt="logo"/></a>
                <ul className="menu">
                    <img src="./icon.png" width={35} alt="logo"/>
                </ul>
            </nav>
        )
    }
}