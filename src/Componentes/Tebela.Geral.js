import React from "react";
import "./Componentes.css";

export default class TabelaGeral extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            propriedades: [],
            monitoramentos: [],
            produtores: [],
            vinculo: [],
        };
    }

    componentDidMount(){
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
            <table className="TabelaInfo">
                <thead className="cabecalho">
                    <tr>
                        <td className="cantoEsquerdo">Nome da Propriedade</td>
                        <td>Número de cadastro rural</td>
                        <td>Nome do Produtor</td>
                        <td>CPF do produtor</td>
                        <td>Data do Monitoramento</td>
                        <td>Analista</td>
                        <td className="cantoDireito">Resultado</td>
                    </tr>
                </thead>
                <tbody className="corpo-tabela">
                    {
                        this.props.dados ?
                        (
                            <>{
                                this.state.monitoramentos.map(monitoramento=>{
                                console.log(monitoramento);
                                return (
                                    <tr
                                        className={monitoramento.comercializado ? "comercilazado":"normal"}
                                        onClick={() => this.props.clickLinha(monitoramento.idMonitoramento)}>
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
                            })}
                            <tr className="rodape">
                                <td colSpan={7}>Monitoramentos</td>
                            </tr>
                            </>
                        ):(
                            <tr>
                                <td>Dados não encontrados!</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>);
    }
}