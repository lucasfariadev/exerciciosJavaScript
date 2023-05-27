var vetor = [];

var resposta = document.getElementById("resposta");

function estaVazio() {
  if (vetor.length === 0) {
    return true;
  } else {
    return false;
  }
}

function adicionarValor() {
  var valor = parseFloat(document.getElementById("valor").value);


  if (isNaN(valor)) {

    resposta.innerHTML = "Digite um valor válido.";
    return; 
  }
  vetor.push(valor);
  resposta.innerHTML = `valor ${valor} adicionado`;
}

function mostrarValores() {
  var valores = vetor.join(", ");
  if (estaVazio) {
    resposta.innerHTML = `Valores inseridos:  ${valores}`;
  } else {
    resposta.innerHTML = "não há valores ainda. Insira os valores";
  }
}

function mostrarMaiorValor() {
  var maiorValor = Math.max(...vetor);
  if (estaVazio()) {
    resposta.innerHTML = "não há valores ainda. Insira os valores";
  } else {
    resposta.innerHTML = `Maior valor:  ${maiorValor}`;
  }
}

function mostrarMenorValor() {
  var menorValor = Math.min(...vetor);
  if (estaVazio()) {
    resposta.innerHTML = "não há valores ainda. Insira os valores";
  } else {
    resposta.innerHTML = `Menor valor:  ${menorValor}`;
  }
}
