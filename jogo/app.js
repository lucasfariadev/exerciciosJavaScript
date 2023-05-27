var powerAtivo = {
    ativo: false,
    x: 0,
    y: 0,
    largura: 75,
    altura: 10,
    dy: 1
};

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var alturaBarra = 10;
var larguraBarra = 75;
var posicaoBarraX = (canvas.width - larguraBarra) / 2;

var raioBola = 10;
var posicaoBolaX = canvas.width / 2;
var posicaoBolaY = canvas.height - 30;
var velocidadeBolaX = 1;
var velocidadeBolaY = -1;

var numeroLinhasBlocos = 3;
var numeroColunasBlocos = 5;
var larguraBloco = 75;
var alturaBloco = 20;
var espacamentoBlocos = 10;
var deslocamentoSuperiorBlocos = 30;
var deslocamentoEsquerdaBlocos = 30;

var blocos = [];
for(var c = 0; c < numeroColunasBlocos; c++) {
    blocos[c] = [];
    for(var r = 0; r < numeroLinhasBlocos; r++) {
        var powerUpAleatorio = Math.random() > 0.8; 
        blocos[c][r] = { x: 0, y: 0, status: 1, powerUp: powerUpAleatorio, powerUpAtivo: false };
    }
}

var pontuacao = 0;
var numeroBolas = 1; 

var teclaDireitaPressionada = false;
var teclaEsquerdaPressionada = false;

function desenharBarra() {
    ctx.beginPath();
    ctx.rect(posicaoBarraX, canvas.height - alturaBarra, larguraBarra, alturaBarra);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function desenharBola() {
    ctx.beginPath();
    ctx.arc(posicaoBolaX, posicaoBolaY, raioBola, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function desenharBlocos() {
    for(var c = 0; c < numeroColunasBlocos; c++) {
        for(var r = 0; r < numeroLinhasBlocos; r++) {
            if(blocos[c][r].status == 1) {
                var posicaoBlocoX = (c * (larguraBloco + espacamentoBlocos)) + deslocamentoEsquerdaBlocos;
                var posicaoBlocoY = (r * (alturaBloco + espacamentoBlocos)) + deslocamentoSuperiorBlocos;
                blocos[c][r].x = posicaoBlocoX;
                blocos[c][r].y = posicaoBlocoY;
                ctx.beginPath();
                ctx.rect(posicaoBlocoX, posicaoBlocoY, larguraBloco, alturaBloco);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();

                if (blocos[c][r].powerUp && !blocos[c][r].powerUpAtivo) {
                    ctx.beginPath();
                    ctx.arc(posicaoBlocoX + larguraBloco / 2, posicaoBlocoY + alturaBloco / 2, 6, 0, Math.PI * 2);
                    ctx.fillStyle = "#FF0000";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
}

function desenharPontuacao() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Pontuação: " + pontuacao, 8, 20);
}

function desenharNumeroBolas() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Bolas: " + numeroBolas, canvas.width - 80, 20);
}

function desenharPowerAtivo() {
    if (powerAtivo.ativo) {
        ctx.beginPath();
        ctx.rect(powerAtivo.x, powerAtivo.y, powerAtivo.largura, powerAtivo.altura);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
    }
}

function colisaoBarraPowerAtivo() {
    if (powerAtivo.y + powerAtivo.altura > canvas.height - alturaBarra &&
        powerAtivo.x + powerAtivo.largura > posicaoBarraX &&
        powerAtivo.x < posicaoBarraX + larguraBarra) {
        powerAtivo.ativo = false;
        powerAtivo.y = 0;
        powerAtivo.x = 0;
        larguraBarra += 20;

        setTimeout(function() {
            larguraBarra -= 20;
        }, 5000);
    }
}

function deteccaoColisao() {
    for(var c = 0; c < numeroColunasBlocos; c++) {
        for(var r = 0; r < numeroLinhasBlocos; r++) {
            var bloco = blocos[c][r];
            if(bloco.status == 1) {
                if(posicaoBolaX > bloco.x && posicaoBolaX < bloco.x + larguraBloco && posicaoBolaY > bloco.y && posicaoBolaY < bloco.y + alturaBloco) {
                    velocidadeBolaY = -velocidadeBolaY;
                    bloco.status = 0;
                    pontuacao++;
                    if (bloco.powerUp && !bloco.powerUpAtivo) {
                        bloco.powerUpAtivo = true;
                        powerAtivo.ativo = true;
                        powerAtivo.x = bloco.x + larguraBloco / 2 - powerAtivo.largura / 2;
                        powerAtivo.y = bloco.y + alturaBloco / 2;
                    }
                    if (pontuacao % (numeroColunasBlocos * numeroLinhasBlocos) == 0) {
                        reiniciarBlocos();
                        numeroBolas++;
                    }
                }
            }
        }
    }
}

function reiniciarBlocos() {
    for(var c = 0; c < numeroColunasBlocos; c++) {
        for(var r = 0; r < numeroLinhasBlocos; r++) {
            blocos[c][r].status = 1;
            blocos[c][r].powerUpAtivo = false;
        }
    }
}

function moverBarra() {
    if(teclaDireitaPressionada && posicaoBarraX < canvas.width - larguraBarra) {
        posicaoBarraX += 7;
    }
    else if(teclaEsquerdaPressionada && posicaoBarraX > 0) {
        posicaoBarraX -= 7;
    }
}

function moverBola() {
    posicaoBolaX += velocidadeBolaX;
    posicaoBolaY += velocidadeBolaY;

    if(posicaoBolaX + raioBola > canvas.width || posicaoBolaX - raioBola < 0) {
        velocidadeBolaX = -velocidadeBolaX;
    }

    if(posicaoBolaY - raioBola < 0) {
        velocidadeBolaY = -velocidadeBolaY;
    } else if(posicaoBolaY + raioBola > canvas.height - alturaBarra) {
        if(posicaoBolaX > posicaoBarraX && posicaoBolaX < posicaoBarraX + larguraBarra) {
            velocidadeBolaY = -velocidadeBolaY;
        } else {
            numeroBolas--;
            if (numeroBolas === 0) {
                alert("Fim de jogo!");
                document.location.reload();
            } else {
                posicaoBolaX = canvas.width / 2;
                posicaoBolaY = canvas.height - 30;
                velocidadeBolaX = 1;
                velocidadeBolaY = -1;
            }
        }
    }
}

function moverPowerAtivo() {
    if (powerAtivo.ativo) {
        powerAtivo.y += powerAtivo.dy;

        if (powerAtivo.y + powerAtivo.altura > canvas.height) {
            powerAtivo.ativo = false;
            powerAtivo.y = 0;
            powerAtivo.x = 0;
        }
    }
}

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharBarra();
    desenharBola();
    desenharBlocos();
    desenharPontuacao();
    desenharNumeroBolas();
    desenharPowerAtivo();
    colisaoBarraPowerAtivo();
    deteccaoColisao();
    moverBarra();
    moverBola();
    moverPowerAtivo();
    requestAnimationFrame(desenhar);
}

document.addEventListener("keydown", function(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        teclaDireitaPressionada = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        teclaEsquerdaPressionada = true;
    }
});

document.addEventListener("keyup", function(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        teclaDireitaPressionada = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        teclaEsquerdaPressionada = false;
    }
});

document.addEventListener("mousemove", function(e) {
    var posicaoMouseCanvas = e.clientX - canvas.offsetLeft;
    if(posicaoMouseCanvas > 0 && posicaoMouseCanvas < canvas.width) {
        posicaoBarraX = posicaoMouseCanvas - larguraBarra / 2;
    }
});

document.addEventListener("touchmove", function(e) {
    var posicaoToqueCanvas = e.touches[0].clientX - canvas.offsetLeft;
    if(posicaoToqueCanvas > 0 && posicaoToqueCanvas < canvas.width) {
        posicaoBarraX = posicaoToqueCanvas - larguraBarra / 2;
    }
});

desenhar();
