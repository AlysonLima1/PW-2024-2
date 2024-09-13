function separarPalavra() {
    const palavra = document.getElementById('inputPalavra').value;
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';  
    
    for (let i = 0; i < palavra.length; i++) {
        const letraDiv = document.createElement('div');
        letraDiv.className = 'letra';
        letraDiv.innerText = palavra[i];
        resultadoDiv.appendChild(letraDiv);
    }
}