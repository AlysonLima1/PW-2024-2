const palavras = [
    "abacaxi", "anel", "amigo", "ave", "abacate", "bola", "bala", "banho", "bau", "banco",
    "casa", "cachorro", "carro", "cafe", "cama", "dado", "dedo", "doce", "dia", "dente",
    "elefante", "estrela", "escola", "elo", "escada", "faca", "festa", "fogo", "foca", "fada"
];

let palavra = palavras[Math.floor(Math.random() * palavras.length)];
let palavraOculta = Array(palavra.length).fill("_");
let tentativas = 0;
const maxTentativas = 9;

const palavraSecretaDiv = document.getElementById("palavraSecreta");
const letrasDiv = document.getElementById("letras");
const reiniciarBtn = document.getElementById("reiniciar");
const canvas = document.getElementById("forcaCanvas");
const ctx = canvas.getContext("2d");

palavraSecretaDiv.innerHTML = palavraOculta.join(" ");

function desenharForca(erros) {
    switch (erros) {
        case 1:
            // Base da forca
            ctx.beginPath();
            ctx.moveTo(10, 190);
            ctx.lineTo(150, 190);
            ctx.stroke();
            break;
        case 2:
            // Poste da forca
            ctx.beginPath();
            ctx.moveTo(80, 190);
            ctx.lineTo(80, 50);
            ctx.stroke();
            break;
        case 3:
            // Suporte superior
            ctx.beginPath();
            ctx.moveTo(80, 50);
            ctx.lineTo(130, 50);
            ctx.stroke();
            break;
        case 4:
            // Corda
            ctx.beginPath();
            ctx.moveTo(130, 50);
            ctx.lineTo(130, 70);
            ctx.stroke();
            break;
        case 5:
            // Cabeça
            ctx.beginPath();
            ctx.arc(130, 80, 10, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 6:
            // Tronco
            ctx.beginPath();
            ctx.moveTo(130, 90);
            ctx.lineTo(130, 140);
            ctx.stroke();
            break;
        case 7:
            // Braço esquerdo
            ctx.beginPath();
            ctx.moveTo(130, 100);
            ctx.lineTo(110, 120);
            ctx.stroke();
            break;
        case 8:
            // Braço direito
            ctx.beginPath();
            ctx.moveTo(130, 100);
            ctx.lineTo(150, 120);
            ctx.stroke();
            break;
        case 9:
            // Perna esquerda
            ctx.beginPath();
            ctx.moveTo(130, 140);
            ctx.lineTo(110, 170);
            ctx.stroke();
            break;
        case 10:
            // Perna direita
            ctx.beginPath();
            ctx.moveTo(130, 140);
            ctx.lineTo(150, 170);
            ctx.stroke();
            break;
        default:
            break;
    }
}

function criarBotoesLetras() {
    const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");
    letrasDiv.innerHTML = "";
    alfabeto.forEach(letra => {
        const btn = document.createElement("button");
        btn.textContent = letra;
        btn.onclick = () => verificarLetra(letra);
        letrasDiv.appendChild(btn);
    });
}

function verificarLetra(letra) {
    let acertou = false;
    for (let i = 0; i < palavra.length; i++) {
        if (palavra[i] === letra) {
            palavraOculta[i] = letra;
            acertou = true;
        }
    }

    if (!acertou) {
        tentativas++;
        desenharForca(tentativas);
    }

    palavraSecretaDiv.innerHTML = palavraOculta.join(" ");
    if (tentativas >= maxTentativas) {
        alert("Você perdeu! A palavra era: " + palavra);
        bloquearBotoes();
    }

    if (!palavraOculta.includes("_")) {
        alert("Parabéns! Você ganhou!");
        bloquearBotoes();
    }
}

function bloquearBotoes() {
    const botoes = letrasDiv.querySelectorAll("button");
    botoes.forEach(botao => {
        botao.disabled = true;
    });
}

function reiniciarJogo() {
    palavra = palavras[Math.floor(Math.random() * palavras.length)];
    palavraOculta = Array(palavra.length).fill("_");
    tentativas = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    palavraSecretaDiv.innerHTML = palavraOculta.join(" ");
    criarBotoesLetras();
}

reiniciarBtn.onclick = reiniciarJogo;
criarBotoesLetras();