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
      this.setState({dados: lista});
    })
  }

  SelecionarMonitoramento(id){
    this.setState({selecionado: this.state.dados.monitoramentos[id-1]});
  }

  render(){
    return (
      <div className="App">
        <Navbar nome="Niceplanet" tela={this.state.tela} mudarTela={this.MudarTela} />
        <div className='corpo-app'>
          {this.state.dados ? (
              <TabelaGeral dados={this.state.dados} clickLinha={this.SelecionarMonitoramento.bind(this)} />
            ):(
              <div className='carregamento'></div>
          )}
          <>
          {
            this.state.selecionado ?
            (
              <MaisInfo monitoramento={this.state.selecionado} dados={this.state.dados} />
            ):(
              <></>
            )
          }
          </>
        </div>
      </div>
    );
  }
}

export default App;
