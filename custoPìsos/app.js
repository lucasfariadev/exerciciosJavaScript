function calcularCusto() {
    var comprimento = parseFloat(document.getElementById("comprimento").value);
    var largura = parseFloat(document.getElementById("largura").value);
    var precoPiso = 36.00; // Preço do piso por m²
    
    var area = comprimento * largura;
    var custoTotal = area * precoPiso;
    
    document.getElementById("area").textContent = area.toFixed(2);
    document.getElementById("custoTotal").textContent = custoTotal.toFixed(2);
}