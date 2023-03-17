import React from "react";
import "./Componentes.css";

// Componente responsável por exibir todos os monitoramentos.
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

    // Definido cada lista e seus atributos, passando os valores recebidos de App atráves do 'props'.
    componentDidMount(){
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
            {/* Renderização da tabela */}
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
                        // condicional se há dados recebidos.
                        this.props.dados ?
                        (
                            <>{
                                // iteração em cada um dos monitoramentos em this.state
                                this.state.monitoramentos.map(monitoramento=>{
                                return (
                                    <tr
                                        // classe é alterada se o monitoramento for comercializado
                                        className={monitoramento.comercializado ? "comercilazado":"normal"}
                                        // chamada da função clickLinha que foi passada em App levando a "id"
                                        onClick={() => this.props.clickLinha(monitoramento.idMonitoramento)}>
                                        <td>{
                                            // Se existir uma Propriedade vinculada ao monitoramento é exibido o nome da propriedade.
                                            this.getPropriedade(monitoramento.idVinculo) ? (
                                                this.getPropriedade(monitoramento.idVinculo).nomePropriedade
                                            ):(
                                                "---"
                                            )}
                                        </td>
                                        <td>{
                                            // Se existir uma Propriedade vinculada ao monitoramento é exibido o número de cadastro rural da propriedade.
                                            this.getPropriedade(monitoramento.idVinculo) ? (
                                                this.getPropriedade(monitoramento.idVinculo).numeroCadastroRural
                                            ):(
                                                "---"
                                            )}
                                        </td>
                                        <td>{
                                            // Se existir uma Produtor vinculado ao monitoramento é exibido o nome do produtor.
                                            this.getProdutor(monitoramento.idVinculo) ? (
                                                this.getProdutor(monitoramento.idVinculo).nomeProdutor
                                            ):(
                                                "---"
                                            )}
                                        </td>
                                        <td>{
                                            // Se existir uma Produtor vinculado ao monitoramento é exibido o CPF do produtor.
                                            this.getProdutor(monitoramento.idVinculo) ? (
                                                this.getProdutor(monitoramento.idVinculo).cpfProdutor
                                            ):(
                                                "---"
                                            )}
                                        </td>
                                        {/* renderização das informações do monitoramento */}
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
                            // Caso não encontre os dados é exibida uma mensagem para o usuário.
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