import './App.css';
import React from 'react';
import Navbar from "./Componentes/Navbar";
import TabelaGeral from './Componentes/Tebela.Geral';
import MaisInfo from './Componentes/MaisInfo';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dados: null,
      selecionado: null,
      tela: "home",
    }
  }

  componentDidMount(){
    fetch("processo-seletivo-front.json")
    .then(resp => {return resp.json()})
    .then(data => {
      let lista = {};
      Object.keys(data).forEach(chave=> {
        lista[chave] = [];
        Object.keys(data[chave]).forEach((key)=>{lista[chave].push(data[chave][key]);})
      })
      lista.monitoramentos.forEach(m=>{m["comercializado"]=false;});
      console.log(lista);
      this.setState({dados: lista});
    })
  }

  Comercializar(){
    let selecionado = this.state.selecionado;
    selecionado.comercializado = true;
    this.setState({selecionado: selecionado})
    let lista = this.state.dados.monitoramentos;
    lista[lista.indexOf(this.state.selecionado)] = selecionado;
    this.setState({monitoramentos: lista})
  }

  SelecionarMonitoramento(id){
    this.setState({selecionado: this.state.dados.monitoramentos[id-1]});
    this.setState({tela: "monitoramento"});
  }

  VoltarInicio(){
    this.setState({tela: "home"});
  }

  render(){
    return (
      <div className="App">
        <Navbar nome="Niceplanet" tela={this.state.tela} mudarTela={this.MudarTela} />
        <div className='corpo-app'>
        {
          this.state.tela === "home" ? (
            <>
                {this.state.dados ? (
                    <>
                      <h2 className='tituloTela'>Monitoramentos</h2>
                      <TabelaGeral dados={this.state.dados} clickLinha={this.SelecionarMonitoramento.bind(this)} />
                    </>
                  ):(
                    <div className='carregamento'></div>
                )}
            </>):(
              <>
                <h2 className='tituloTela'><div className='btnVoltar' onClick={()=>this.VoltarInicio()}></div>Relatório de monitoramento</h2>
                <MaisInfo monitoramento={this.state.selecionado} dados={this.state.dados} btnComprarClick={()=>this.Comercializar()}/>
              </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
