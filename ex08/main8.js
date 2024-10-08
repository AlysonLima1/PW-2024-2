const olDespesas = document.getElementById("olDespesas");
const inputDescricao = document.getElementById("inputDescricao");
const inputValor = document.getElementById("inputValor");
const btAdicionar = document.getElementById("btAdicionar");
const totalDespesas = document.getElementById("totalDespesas");

const baseURL = "https://parseapi.back4app.com/classes/Despesa";
const headers = {
  "X-Parse-Application-Id": "4cRNaPFAu9tGO59OrBIJpH4v6qeHUUbtReuVmjP7",  // Use your own Application ID
  "X-Parse-REST-API-Key": "x3OZm4ZBkTNLy3jJUc9JImiuAi6XK4ih7zfKOVwk", // Use your own API Key
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

let despesasList = [];

const createList = () => {
  olDespesas.innerHTML = "";
  despesasList.forEach((despesa) => {
    const li = document.createElement("li");
    const descricao = document.createTextNode(`${despesa.descricao} - R$ ${despesa.valor.toFixed(2)} `);
    li.appendChild(descricao);

    const inputValorAtualizar = document.createElement("input");
    inputValorAtualizar.type = "number";
    inputValorAtualizar.value = despesa.valor;
    li.appendChild(inputValorAtualizar);

    const btAtualizar = document.createElement("button");
    btAtualizar.innerHTML = "Atualizar";
    btAtualizar.onclick = () => handleBtAtualizarClick(btAtualizar, despesa, inputValorAtualizar);
    li.appendChild(btAtualizar);

    const btRemover = document.createElement("button");
    btRemover.innerHTML = "x";
    btRemover.onclick = () => handleBtRemoverClick(btRemover, despesa);
    li.appendChild(btRemover);

    olDespesas.appendChild(li);
  });

  atualizarTotalDespesas();
};

const atualizarTotalDespesas = () => {
  const total = despesasList.reduce((acc, despesa) => acc + despesa.valor, 0);
  totalDespesas.textContent = total.toFixed(2);
};

const handleBtAtualizarClick = async (bt, despesa, inputValorAtualizar) => {
  const novoValor = parseFloat(inputValorAtualizar.value);
  if (isNaN(novoValor) || novoValor <= 0) {
    alert("Valor inválido!");
    return;
  }

  try {
    bt.disabled = true;
    const response = await fetch(`${baseURL}/${despesa.objectId}`, {
      method: "PUT",
      headers: headersJson,
      body: JSON.stringify({ valor: novoValor }),
    });

    bt.disabled = false;

    if (!response.ok) {
      alert("Erro ao acessar o servidor: " + response.status);
      throw new Error("Erro encontrado: " + response.status);
    }

    despesa.valor = novoValor;
    createList();
  } catch (error) {
    console.log(error);
  }
};

const handleBtRemoverClick = async (bt, despesa) => {
  try {
    bt.disabled = true;
    const response = await fetch(`${baseURL}/${despesa.objectId}`, {
      method: "DELETE",
      headers: headers,
    });

    bt.disabled = false;

    if (!response.ok) {
      alert("Erro ao acessar o servidor: " + response.status);
      throw new Error("Erro encontrado: " + response.status);
    }

    despesasList = despesasList.filter((item) => item.objectId !== despesa.objectId);
    createList();
  } catch (error) {
    console.log(error);
  }
};

const getDespesas = async () => {
  try {
    const response = await fetch(baseURL, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      alert("Erro ao acessar o servidor: " + response.status);
      throw new Error("Erro encontrado: " + response.status);
    }

    const data = await response.json();
    despesasList = data.results.map((despesa) => ({
      objectId: despesa.objectId,
      descricao: despesa.descricao,
      valor: despesa.valor,
    }));

    createList();
  } catch (error) {
    console.log(error);
  }
};

const handleBtAdicionarClick = async () => {
  const descricao = inputDescricao.value.trim();
  const valor = parseFloat(inputValor.value);

  if (!descricao || isNaN(valor) || valor <= 0) {
    alert("Por favor, insira uma descrição válida e um valor maior que zero.");
    inputDescricao.focus();
    return;
  }

  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: headersJson,
      body: JSON.stringify({ descricao: descricao, valor: valor }),
    });

    if (!response.ok) {
      alert("Erro ao acessar o servidor: " + response.status);
      throw new Error("Erro encontrado: " + response.status);
    }

    inputDescricao.value = "";
    inputValor.value = "";
    inputDescricao.focus();

    getDespesas();
  } catch (error) {
    console.log(error);
  }
};

window.onload = getDespesas;
btAdicionar.onclick = handleBtAdicionarClick;
