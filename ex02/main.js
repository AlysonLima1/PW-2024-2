const btAdic = document.getElementById("btAdic");

btAdic.addEventListener('click', () => {
    let número = document.getElementById('número');
    let Somatório = document.getElementById('Somatório');


    let validacao = parseInt(número.value)
    
    if (!isNaN(validacao)) {
        Somatório.value = Number(número2.value) + Number(número.value);
        número.value = "";
        número.focus();

        return;
    } else {
        alert('Digite um número.')        
    }
})