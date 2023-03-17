<img src="./public/logo.png" />

## O Desafio: 

Para que nossos stakeholders consigam alcançar seus objetivos, é necessário que a
Niceplanet os auxilie prestando um serviço de assessoria e monitoramentos socioambientais
através de tecnologias visando atender os protocolos e acordos legais assumidos pelas
indústrias e pelo mercado.
Neste desafio vamos simular a criação de uma tela que possibilita à indústria visualizar
as ordens de compras monitoradas de sua carteira de clientes.

> ### DADOS: [processo-seletivo-front](public/processo-seletivo-front.json)

<br>

## Solução:

> No componente App padrão do React, foi definido três atributos para realização da construção da aplicação os 'dados', 'selecionado' e 'tela'. Na função 'ComponentDidMount()' é realizado uma ligação com fetch para adicionar os dados do JSON fornecido, para o atributo dados e na renderização para construir cada tela é feita uma verificação se o atributo "tela" é igual a "home" construindo a tela inicial e caso contrario a tela mais informações.

### Tela inicial

> Na renderização da tela utiliza-se dois componentes 'Navbar' e 'Tabela.Geral'. O 'Navbar' é um componente simples chamado para a construção da barra de navegação fixado na parte superior da pagina possui apenas as logos da empresa, já a 'Tabela.Geral' é o componente resposavél por renderizar as informações recebidas do JSON em formato de tabela. Cada linha da tabela informa dados do monitoramento e ao clicar em uma o usuario passa o 'id' desse moitoramento para o atributo 'selecionado' de App e altera o atributo tela atulizando a tela da aplicação.

### Tela Mais Informações

> A tela continua renderizando a  'Navbar', pára esta tela o componente 'MaisInfo' subistituia tabela, este construi uma caixa com todas as informações do monitoramento. Relaciona propriedade, produtor e todos os vinculos do monitoramento. Possui um botão comprar que quando clicado sinaliza a compra, alterando a cor dos elementos na tela indicando a compra.

<br>

## Componentes da aplicação:

### `Navbar`

    Atributos
    nome: "Nome da empresa"

<br>

### `Tabela.Geral`

    Atributos
    dados: "Recebe os dados dos monitoramentos"
    clickLinha: "Função que será executada ao clicar em uma Linha/Monitoramento".
    getProdutor(id): "Função que recebe o id de vinculo do monitoramento e retorna o Produtor relacionado".
    getPropriedade(id): "função que identifica através do id relacionado a propriedade daquele monitoramente e a retorna".

<br>

### `MaisInfo` 

    monitoramento: "Monitoramento selecionado pelo usuário"
    dados: "Recebe os dados dos monitoramentos"
    btnComprarClick: "Função que será executada ao clicar em uma Linha/Monitoramento".
    getProdutor(id): "Função que recebe o id de vinculo do monitoramento e retorna o Produtor relacionado".
    getPropriedade(id): "função que identifica através do id relacionado a propriedade daquele monitoramente e a retorna".
