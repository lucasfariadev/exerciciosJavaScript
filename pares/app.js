function contaPares(){
    var valor = parseInt(document.getElementById("valor").value);
    var divResultado = document.getElementById("resultado");
    var cont = 0;
    divResultado.innerHTML = "";
    for(i=0; i <= valor; i++){
        if(i%2 == 0){
            console.log(i);
            cont++;
            divResultado.innerHTML += ` ${i} `;
        }
    
    }
    if(cont == 0){
        divResultado.innerHTML = "não há números pares";
    }else{
        divResultado.innerHTML += `<p> Ao todo são ${cont} números pares `
}
    cont = 0;

}
