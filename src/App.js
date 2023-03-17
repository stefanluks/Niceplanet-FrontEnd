import './App.css';
import React from 'react';
import Navbar from "./Componentes/Navbar";
import TabelaGeral from './Componentes/Tebela.Geral';
import MaisInfo from './Componentes/MaisInfo';

// Classe App que é a base do sistema aplicativo.

class App extends React.Component {
  // contrutor onde todos as propriedades são definidas inicialmente
  constructor(props){
    super(props);
    this.state = {
      dados: null,
      selecionado: null,
      tela: "home",
    }
  }
  // Função que é chamada assim que o objeto é instanciado;
  // portanto é nela que são coletados os dados do arquivo "processo-seletivo-front.json" utilizano `fetch`.
  componentDidMount(){
    fetch("processo-seletivo-front.json")
    .then(resp => {return resp.json()})
    .then(data => {
      // Ao receber os dados é realizada uma alteração na estrutura é feita.
      // É criado um objeto que recebe os modelos como atributos e cada um deles.
      // aponta para uma lista de seus repectivos tipos, por exemplo: Monitoramento: [{idMonitoramento: "0"},{idMonitoramento: "1"}]
      let lista = {};
      Object.keys(data).forEach(chave=> {
        lista[chave] = [];
        Object.keys(data[chave]).forEach((key)=>{lista[chave].push(data[chave][key]);})
      });
      // cria um novo atributo no objeto monitoramento.
      lista.monitoramentos.forEach(m=>{m["comercializado"]=false;});
      // define a nova lista em state.dados.
      this.setState({dados: lista});
    })
  }

  // ativar a comercialização de um monitoramento.
  Comercializar(){
    // identifica o objeto selecionado e atribui "true" para a comercialização.
    let selecionado = this.state.selecionado;
    selecionado.comercializado = true;
    // define o objeto selecionado em state
    this.setState({selecionado: selecionado})
    // troca do objeto selecionado antigo pelo atual e aplicado ao state.
    let lista = this.state.dados.monitoramentos;
    lista[lista.indexOf(this.state.selecionado)] = selecionado;
    this.setState({monitoramentos: lista})
  }

  // Define o monitormento selecionado pelo usuário
  SelecionarMonitoramento(id){
    this.setState({selecionado: this.state.dados.monitoramentos[id-1]});
    this.setState({tela: "monitoramento"});
  }

  // Volta para a tela inicial alterando o valor da variavel tela em state.
  VoltarInicio(){
    this.setState({tela: "home"});
  }

  render(){
    return (
      <div className="App">
        {/* Chamada a renderização da Navbar */}
        <Navbar nome="Niceplanet" tela={this.state.tela} mudarTela={this.MudarTela} />
        <div className='corpo-app'>
        {
          // Verificação se a tela inicial é selecionada
          this.state.tela === "home" ? (
            <>
              {/* dentro da tela inicial é percorrido na lista de monitoramentos */}
                {this.state.dados ? (
                    <>
                      <h2 className='tituloTela'>Monitoramentos</h2>
                      {/* Renderização da Tabela Geral passando os dados recebidos e a função de seleção */}
                      <TabelaGeral dados={this.state.dados} clickLinha={this.SelecionarMonitoramento.bind(this)} />
                    </>
                  ):(
                    // enquanto não carrega os dados um spinner é renderizado
                    <div className='carregamento'></div>
                )}
            </>):(
              // Quando um monitoramento é o selecionado entra nessa condição
              <>
                <h2 className='tituloTela'><div className='btnVoltar' onClick={()=>this.VoltarInicio()}></div>Relatório de monitoramento</h2>
                {/* Renderização do componente Mais Info passando o monitoramento selecionado, os dados e a função de comercilizar */}
                <MaisInfo monitoramento={this.state.selecionado} dados={this.state.dados} btnComprarClick={()=>this.Comercializar()}/>
              </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
