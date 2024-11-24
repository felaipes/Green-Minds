document.addEventListener("DOMContentLoaded", () => {
    // Função para adicionar ao carrinho
    const adicionarCarrinho = (nomeMaterial) => {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        // Verificar se o material já está no carrinho
        const materialExistente = carrinho.find(item => item.nome === nomeMaterial);

        if (!materialExistente) {
            carrinho.push({ nome: nomeMaterial });
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            alert('Material adicionado ao carrinho!');
        } else {
            alert('Este material já está no carrinho.');
        }
    };

    // Função para exibir os materiais no carrinho
    const exibirCarrinho = () => {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const carrinhoDiv = document.getElementById('produtos-carrinho');

        if (carrinho.length === 0) {
            carrinhoDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            carrinhoDiv.innerHTML = '<ul>' +
                carrinho.map((item, index) => 
                    `<li>
                        ${item.nome} 
                        <button class="remover-item" data-index="${index}">Remover</button>
                    </li>`
                ).join('') +
                '</ul>';

            // Adicionar eventos de remoção
            const buttonsRemover = document.querySelectorAll('.remover-item');
            buttonsRemover.forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = e.target.getAttribute('data-index');
                    removerItemCarrinho(index);
                });
            });
        }
    };

    // Função para remover item do carrinho
    const removerItemCarrinho = (index) => {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        exibirCarrinho();  // Atualizar a exibição após remoção
    };

    // Adicionar evento de click no botão "Adicionar ao Carrinho"
    const btnAdicionarCarrinho = document.getElementById('adicionar-carrinho');
    if (btnAdicionarCarrinho) {
        btnAdicionarCarrinho.addEventListener('click', () => {
            const nomeMaterial = btnAdicionarCarrinho.getAttribute('data-nome');
            adicionarCarrinho(nomeMaterial);
        });
    }

    // Exibir o carrinho ao carregar a página
    exibirCarrinho();
});

