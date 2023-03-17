import React from "react";
import "./Componentes.css";

export default class MaisInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            propriedades: [],
            monitoramentos: [],
            produtores: [],
            vinculo: [],
            monitoramento: null,
        };
    }

    componentDidMount(){
        this.setState({monitoramento: this.props.monitoramento});
        this.setState({propriedades: this.props.dados.propriedades});
        this.setState({monitoramentos: this.props.dados.monitoramentos});
        this.setState({vinculo: this.props.dados.vinculo});
        this.setState({produtores: this.props.dados.produtores});
    }

    getProdutor(idVinculo){
        let Produtor = null;
        this.state.vinculo.forEach(vinculo =>{
            if(vinculo.idVinculo === idVinculo){
                this.state.produtores.forEach(produtor=>{
                    if(vinculo.idProdutor === produtor.idprodutor){
                        Produtor = produtor;
                    }
                })
            }
        })
        return Produtor;
    }

    getPropriedade(id){
        let Propriedade = null;
        this.state.propriedades.forEach(propriedade => {
            if(propriedade.idPropriedade === id) Propriedade = propriedade; 
        })
        return Propriedade;
    }

    render(){
        return (<>
            <div className="MaisInfo">
                <div className={this.props.monitoramento.comercializado ? "header comercializado":"header"}>
                    <p>{this.props.monitoramento.dataMonitoramento}</p>
                    <p>{this.props.monitoramento.analista}</p>
                    <p>{this.props.monitoramento.resultado}</p>
                </div>
                <div className="corpo-info">
                    <div className="infos">
                        {this.getPropriedade(this.props.monitoramento.idVinculo) ? (
                            <>
                                <div className="propriedade-info">
                                    <i className="id-propriedade">{this.getPropriedade(this.props.monitoramento.idVinculo).idPropriedade}</i>
                                    <h3>Propriedade: {this.getPropriedade(this.props.monitoramento.idVinculo).nomePropriedade}</h3>
                                </div>
                                <p><b>NCR: </b>{this.getPropriedade(this.props.monitoramento.idVinculo).numeroCadastroRural}</p>
                                <p><b>Tipo: </b>{this.getPropriedade(this.props.monitoramento.idVinculo).tipoPropriedade}</p>
                            </>
                            ):("---")}
                        <div className="linha"></div>
                        <h3>Produtor</h3>
                        {this.getProdutor(this.props.monitoramento.idVinculo) ? (
                            <>
                                <h3>{this.getProdutor(this.props.monitoramento.idVinculo).nomeProdutor}</h3>
                                <p><b>CPF: </b>{this.getProdutor(this.props.monitoramento.idVinculo).cpfProdutor}</p>
                            </>
                            ):("---")}
                        <div className="linha"></div>
                        <button
                            onClick={() => {if(this.props.monitoramento.resultado === "Liberado") this.props.btnComprarClick()}}
                            className={"btn-comprar "+this.props.monitoramento.resultado}>
                            Comprar
                        </button>
                    </div>
                    <div className="parecer">
                        <h2>Parecer Analise</h2>
                        {this.props.monitoramento.parecerAnalise}
                    </div>
                </div>
                {/* <tbody className="corpo-tabela">
                    {
                        this.props.dados ?
                        (
                            <>{this.state.monitoramentos.map(monitoramento=>{
                                return (
                                    <tr onClick={() => this.props.clickLinha(monitoramento.idMonitoramento)}>
                                        <td>{this.getPropriedade(monitoramento.idVinculo) ? (
                                            this.getPropriedade(monitoramento.idVinculo).nomePropriedade
                                            ):("---")}</td>
                                        <td>{this.getPropriedade(monitoramento.idVinculo) ? (
                                            this.getPropriedade(monitoramento.idVinculo).numeroCadastroRural
                                            ):("---")}</td>
                                        <td>{this.getProdutor(monitoramento.idVinculo) ? (
                                            this.getProdutor(monitoramento.idVinculo).nomeProdutor
                                            ):("---")}</td>
                                        <td>{
                                            this.getProdutor(monitoramento.idVinculo) ? (
                                                this.getProdutor(monitoramento.idVinculo).cpfProdutor
                                            ):("---")
                                            }</td>
                                        <td>{monitoramento.dataMonitoramento}</td>
                                        <td>{monitoramento.analista}</td>
                                        <td>{monitoramento.resultado}</td>
                                    </tr>
                                )
                            })}</>
                        ):(
                            <tr>
                                <td>Dados não encontrados!</td>
                            </tr>
                        )
                    }
                </tbody> */}
            </div>
        </>);
    }
}