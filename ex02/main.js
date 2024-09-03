document.addEventListener('DOMContentLoaded', () => {
    const btCalcular = document.getElementById('btCalcular');

    btCalcular.addEventListener('click', () => {
        const número = document.getElementById('número');
        const número2 = document.getElementById('número2');
        const resultado = document.getElementById('resultado');

        const valor1 = parseFloat(número.value);
        const valor2 = parseFloat(número2.value);

        if (!isNaN(valor1) && !isNaN(valor2)) {
            resultado.value = valor1 + valor2;
        } else {
            alert('Digite números válidos em ambos os campos.');
        }
    });
});
