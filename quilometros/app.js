function calcularGasto() {
    var quilometragem = parseFloat(document.getElementById("quilometragem").value);
    var valorCombustivel = parseFloat(document.getElementById("valorCombustivel").value);
    var kmPorLitro = 8;
    var litrosConsumidos = quilometragem / kmPorLitro;
    var gastoTotal = litrosConsumidos * valorCombustivel;
    
    document.getElementById("litrosConsumidos").textContent = litrosConsumidos.toFixed(2);
    document.getElementById("gastoTotal").textContent = gastoTotal.toFixed(2);
}