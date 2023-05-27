function calcularTotal() {
    var valorTotal = 0;
    
    // Produto 1
    var nome1 = document.getElementById("nome1").value;
    var valor1 = parseFloat(document.getElementById("valor1").value);
    var quantidade1 = parseInt(document.getElementById("quantidade1").value);
    var subtotal1 = valor1 * quantidade1;
    valorTotal += subtotal1;
    
    // Produto 2
    var nome2 = document.getElementById("nome2").value;
    var valor2 = parseFloat(document.getElementById("valor2").value);
    var quantidade2 = parseInt(document.getElementById("quantidade2").value);
    var subtotal2 = valor2 * quantidade2;
    valorTotal += subtotal2;
    
    // Produto 3
    var nome3 = document.getElementById("nome3").value;
    var valor3 = parseFloat(document.getElementById("valor3").value);
    var quantidade3 = parseInt(document.getElementById("quantidade3").value);
    var subtotal3 = valor3 * quantidade3;
    valorTotal += subtotal3;
    
    // Exibir resultados
    document.getElementById("subtotal1").textContent = subtotal1.toFixed(2);
    document.getElementById("subtotal2").textContent = subtotal2.toFixed(2);
    document.getElementById("subtotal3").textContent = subtotal3.toFixed(2);
    document.getElementById("valorTotal").textContent = valorTotal.toFixed(2);
}