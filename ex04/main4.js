let vetor = [];

function adicionarValor() {
    let input = document.getElementById('inputNumber');
    let valor = parseFloat(input.value);

    if (!isNaN(valor)) {
        vetor.push(valor);
        atualizarExibicao();
        input.value = '';
    } else {
        alert('Por favor, digite um número válido.');
    }
}

function atualizarExibicao() {
    let valoresInseridos = document.getElementById('valoresInseridos');
    valoresInseridos.textContent = vetor.join(', ') || 'Nenhum valor inserido ainda.';

    let mediaValores = document.getElementById('mediaValores');
    if (vetor.length > 0) {
        let soma = vetor.reduce((acc, valor) => acc + valor, 0);
        let media = soma / vetor.length;
        mediaValores.textContent = `Média: ${media.toFixed(2)}`;
    } else {
        mediaValores.textContent = 'A média será exibida aqui.';
    }
}