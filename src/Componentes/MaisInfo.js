import React from "react";
import "./Componentes.css";
// Componente resposável por exibit todos os monitormentos
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

    // Definido cada lista e seus atributos, passando os valores recebidos de App atráves do 'props'.
    componentDidMount(){
        this.setState({monitoramento: this.props.monitoramento});
        this.setState({propriedades: this.props.dados.propriedades});
        this.setState({monitoramentos: this.props.dados.monitoramentos});
        this.setState({vinculo: this.props.dados.vinculo});
        this.setState({produtores: this.props.dados.produtores});
    }

    // Retorna o produtor que possua o mesmo id de vinculo que é recebido como parâmetro.
    getProdutor(idVinculo){
        let Produtor = null;
        // iteração em todos os vinculos, e ao encontrar um vinvulo com mesmo id do parâmetro
        this.state.vinculo.forEach(vinculo =>{
            if(vinculo.idVinculo === idVinculo){
                this.state.produtores.forEach(produtor=>{
                    // Verificação onde o produtor deve ter o mesmo id que o idProdutor do Vinculo, para ser retornado
                    if(vinculo.idProdutor === produtor.idprodutor){
                        Produtor = produtor;
                    }
                })
            }
        })
        return Produtor;
    }

    // Retorna a propiedade que possua o mesmo id que é recebido como parâmetro.
    getPropriedade(id){
        let Propriedade = null;
        this.state.propriedades.forEach(propriedade => {
            // Verificação onde a propriedade deve ter o mesmo id que parâmentro, para ser retornado
            if(propriedade.idPropriedade === id) Propriedade = propriedade; 
        })
        return Propriedade;
    }

    render(){
        return (<>
            {/* Renderização das informações adicionais */}
            <div className="MaisInfo">
                {/* classe é alterada se o monitoramento for comercializado alterando a cor*/}
                <div className={this.props.monitoramento.comercializado ? "header comercializado":"header"}>
                    {/* informações do monitoramento */}
                    <p>{this.props.monitoramento.dataMonitoramento}</p>
                    <p>{this.props.monitoramento.analista}</p>
                    <p>{this.props.monitoramento.resultado}</p>
                </div>
                <div className="corpo-info">
                    <div className="infos">
                        {
                            // Se existir uma Propriedade vinculada ao monitoramento renderiza as informações da propriedade.
                            this.getPropriedade(this.props.monitoramento.idVinculo) ? 
                            (
                                <>
                                    <div className="propriedade-info">
                                        <i className="id-propriedade">
                                            {
                                                this.getPropriedade(this.props.monitoramento.idVinculo).idPropriedade
                                            }
                                        </i>
                                        <h3>
                                            Propriedade: {this.getPropriedade(this.props.monitoramento.idVinculo).nomePropriedade}
                                        </h3>
                                    </div>
                                    <p><b>NCR: </b>{this.getPropriedade(this.props.monitoramento.idVinculo).numeroCadastroRural}</p>
                                    <p><b>Tipo: </b>{this.getPropriedade(this.props.monitoramento.idVinculo).tipoPropriedade}</p>
                                </>
                            ):(
                                "---"
                            )
                        }
                        <div className="linha"></div>  {/* separador de informações */}
                        <h3>Produtor</h3>
                        {
                            // Se existir uma Produtor vinculado ao monitoramento é exibido o nome do produtor.
                            this.getProdutor(this.props.monitoramento.idVinculo) ? (
                                <>
                                    <h3>{this.getProdutor(this.props.monitoramento.idVinculo).nomeProdutor}</h3>
                                    <p><b>CPF: </b>{this.getProdutor(this.props.monitoramento.idVinculo).cpfProdutor}</p>
                                </>
                            ):(
                                "---"
                            )
                        }
                        <div className="linha"></div> {/* separador de informações */}
                        {/* Botão de compra que é ativado quando atributo resultado é igual à "Liberado" */}
                        <button
                            // se liberado a função passada atráves do props é chamada.
                            onClick={() => {if(this.props.monitoramento.resultado === "Liberado") this.props.btnComprarClick()}}
                            // Classe do botão alterado através do resultado.
                            className={"btn-comprar "+this.props.monitoramento.resultado}>
                            Comprar
                        </button>
                    </div>
                    {/* Elemento com que renderiza o parecer analise do monitoramento. */}
                    <div className="parecer">
                        <h2>Parecer Analise</h2>
                        {this.props.monitoramento.parecerAnalise}
                    </div>
                </div>
            </div>
        </>);
    }
}