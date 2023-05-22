function pegaValor(){
    
    return parseFloat(document.getElementById('valor').value); 
}
function pegaDiv(){
    return document.getElementById("resultado");
}
function converteParaCelsius(){
    pegaDiv().innerHTML = ''; 
    pegaDiv().innerHTML += `<p>${((pegaValor() - 32)/1.8).toFixed(2)}º Celsius</p>` 
}

function converteParaFahrenheit(){
    pegaDiv().innerHTML = ''; 
    pegaDiv().innerHTML += `<p>${((pegaValor()*1.8)+32).toFixed(2)}º Fahrenheit</p>` 
}

