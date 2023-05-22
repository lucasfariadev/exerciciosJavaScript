function contaPares(){
    var valor = parseInt(document.getElementById("valor").value);
    var divResultado = document.getElementById("resultado");
    for(i=0; i <= valor; i++){
        if(i%2 == 0){
            console.log(i);
            divResultado.innerHTML += ` ${i} `;
        }

    }

}