//Listar os produtos da base, implementar botão de adicionar

const produtosLista = document.querySelector(".produtoLista");
const listaProdutos = document.querySelector(".listaProdutos");



function criarCardProduto (produto) {
    const tagLi = document.createElement("li");
    tagLi.classList.add("cardProduto");

    tagLi.innerHTML = `
        <img src="${produto.image}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button type="button" id="${produto.id}">Adicionar</button>
    `;
    return tagLi;   
}

//Listar os produtos da base => array

function listarProdutos(listaProdutos) {
    for(let i = 0; i < listaProdutos.length; i++) {
        const produto = listaProdutos[i];
        const template = criarCardProduto(produto);

        produtosLista.appendChild(template);
    }
}
listarProdutos(produtos)
//Carrinho de compras
let carrinho = [];


//Adicionando interceptador na lista de produtos

produtosLista.addEventListener("click", adicionarProdutoCarrinho)

function adicionarProdutoCarrinho() {

    //Identificando elemento clicado
    const botao = event.target;

    //Verificando se é um botão
    if(botao.tagName == "BUTTON") {
        //cada produto tem um id, pra identificar individualmente cada
        const idProduto = botao.id;

        //pesquisar se esse produto é existente na base (estoque)
        const produtoFiltrado = produtos.find((produto) => produto.id == idProduto)
        carrinho.push(produtoFiltrado);    
        listarProdutosCarrinho()    

        atualizarTotal()
    }   
}

//Listar produtos do carrinho

function listarProdutosCarrinho() {
    listaProdutos.innerHTML = ""
    //percorrendo produtos do carrinho
    for(let i = 0; i < carrinho.length; i++) {
        const produto = carrinho [i];
        const tagLi = document.createElement("li");
        tagLi.classList.add("cardProduto");
        tagLi.innerHTML =`
        <div class="infoNome">
            <img src="${produto.image}" alt="${produto.nome}">
            <p>${produto.nome}</p> 
        </div>

        <div class="infoPreco">
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button>
            <img src="./assets/lixo.png" alt="Lixo para remover produto">
            </button>
        </div>
        `
        listaProdutos.appendChild(tagLi);
    }}

//atualizar total do carrinho

function atualizarTotal() {
    const infoPreco = document.querySelector(".infoPreco");

    let total = 0;
    for(let i = 0; i < carrinho.length; i++) {

        const produto = carrinho[i];
        total += produto.preco;
    }
    
    infoPreco.innerText = `Total: R$ ${total.toFixed(2)}`
        
}


//carrinho.SPLICE(posicao, 1)

listaProdutos.addEventListener("click", removerProdutoCarrinho);
function removerProdutoCarrinho(event) {
    const botaoExcluir = event.target

    if (botaoExcluir.tagName == "BUTTON") {
        botaoExcluir.closest("li").remove()
        for(let i = 0; i < carrinho.length; i++) {
            carrinho.splice(carrinho[i], 1);
            atualizarTotal()
            
        }
        
    } 
}