const API_URL = 'http://localhost:3000/api';
let carrinho = [];
let clienteLogado = null;
let sessionId = localStorage.getItem('pizzaria_session') || 'sessao_' + Math.random().toString(36).substr(2, 9);
localStorage.setItem('pizzaria_session', sessionId);

const cardapioContainer = document.getElementById('cardapioContainer');
const carrinhoItens = document.getElementById('carrinhoItens');
const carrinhoTotal = document.getElementById('carrinhoTotal');
const btnFecharPedido = document.getElementById('btnFecharPedido');
const loginModal = document.getElementById('loginModal');
const btnOpenLogin = document.getElementById('btnOpenLogin');
const btnCloseModal = document.getElementById('btnCloseModal');
const clienteForm = document.getElementById('clienteForm');

async function carregarCardapio() {
    try {
        const response = await fetch(`${API_URL}/produtos`);
        const produtos = await response.json();
        
        cardapioContainer.innerHTML = '';
        produtos.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'produto-card';
            card.innerHTML = `
                <div>
                    <div class="produto-nome">${prod.nome} (${prod.tamanho})</div>
                    <div class="produto-desc">${prod.descricao || 'Sem descrição.'}</div>
                </div>
                <div>
                    <div class="produto-preco">R$ ${parseFloat(prod.preco).toFixed(2).replace('.', ',')}</div>
                    <button class="btn-add" onclick="adicionarAoCarrinho(${prod.id}, ${prod.preco})">Adicionar</button>
                </div>
            `;
            cardapioContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao buscar cardápio:', error);
        cardapioContainer.innerHTML = '<p style="color: red;">Erro ao carregar o cardápio.</p>';
    }
}

window.adicionarAoCarrinho = function(id, preco) {
    const dadosItem = {
        usuario_id: clienteLogado ? clienteLogado.id : null,
        session_id: clienteLogado ? null : sessionId,
        produto_id: id,
        quantidade: 1,
        preco_unitario: preco,
        sabores: null,
        borda: null,
        observacoes: null
    };

    fetch(`${API_URL}/carrinho/adicionar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosItem)
    })
    .then(response => {
        if (response.ok) {
            buscarCarrinhoDoBanco();
        } else {
            alert('Erro ao adicionar produto ao carrinho no servidor.');
        }
    })
    .catch(error => console.error('Erro na requisição do carrinho:', error));
}

async function buscarCarrinhoDoBanco() {
    try {
        const parametro = clienteLogado ? `usuario_id=${clienteLogado.id}` : `session_id=${sessionId}`;
        const response = await fetch(`${API_URL}/carrinho?${parametro}`);
        carrinho = await response.json();
        
        atualizarInterfaceCarrinho();
    } catch (error) {
        console.error('Erro ao buscar carrinho do banco:', error);
    }
}

function atualizarInterfaceCarrinho() {
    if (!carrinho || carrinho.length === 0) {
        carrinhoItens.innerHTML = '<p style="color: #888;">Seu carrinho está vazio.</p>';
        carrinhoTotal.innerText = 'R\$ 0,00';
        btnFecharPedido.disabled = true;
        return;
    }

    carrinhoItens.innerHTML = '';
    let total = 0;
    
    carrinho.forEach((item) => {
        const subtotalItem = parseFloat(item.preco_unitario) * parseInt(item.quantidade);
        total += subtotalItem;

        const div = document.createElement('div');
        div.className = 'carrinho-item';
        div.innerHTML = `
            <span>${item.quantidade}x ${item.nome || 'Produto'}</span>
            <strong>R$ ${subtotalItem.toFixed(2).replace('.', ',')}</strong>
        `;
        carrinhoItens.appendChild(div);
    });

    carrinhoTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    btnFecharPedido.disabled = false;
}

btnOpenLogin.onclick = () => loginModal.style.display = 'flex';
btnCloseModal.onclick = () => loginModal.style.display = 'none';

clienteForm.onsubmit = async (e) => {
    e.preventDefault();
    
    const dadosCliente = {
        nome: document.getElementById('inputNome').value,
        telefone: document.getElementById('inputTelefone').value,
        endereco: document.getElementById('inputEndereco').value,
        bairro: document.getElementById('inputBairro').value
    };

    try {
        const response = await fetch(`${API_URL}/clientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosCliente)
        });

        const data = await response.json();
        
        if (response.ok) {
            clienteLogado = data.cliente || data.cliente;
            btnOpenLogin.innerText = `👤 Olá, ${clienteLogado.nome.split(' ')[0]}`;
            btnOpenLogin.style.backgroundColor = '#27ae60';
            loginModal.style.display = 'none';
            
            buscarCarrinhoDoBanco();
            alert('Dados confirmedos com sucesso! Agora você pode finalizar seu pedido.');
        } else {
            alert(data.erro || 'Erro ao processar dados.');
        }
    } catch (error) {
        console.error('Erro no cadastro:', error);
        alert('Erro ao conectar com o servidor.');
    }
};

btnFecharPedido.onclick = async () => {
    if (!clienteLogado) {
        alert('Por favor, clique em "Entrar / Cadastrar" antes de finalizar o pedido.');
        loginModal.style.display = 'flex';
        return;
    }

    const totalPedido = carrinho.reduce((sum, item) => sum + (parseFloat(item.preco_unitario) * item.quantidade), 0);

    const dadosPedido = {
        cliente_id: clienteLogado.id,
        forma_pagamento: 'PIX',
        taxa_entrega: 0.00,
        valor_total: totalPedido,
        session_id: sessionId
    };

    try {
        const response = await fetch(`${API_URL}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosPedido)
        });

        if (response.ok) {
            alert('🍕 Pedido enviado com sucesso para a cozinha!');
            carrinho = [];
            atualizarInterfaceCarrinho();
        } else {
            alert('Erro ao registrar o pedido.');
        }
    } catch (error) {
        console.error('Erro ao fechar pedido:', error);
    }
};

carregarCardapio();
buscarCarrinhoDoBanco();
