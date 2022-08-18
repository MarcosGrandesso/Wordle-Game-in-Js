let quadrados = document.getElementById("quadrados").children;
let palavra_usuario = []
let palavra_real = 'AROMA'


let ini_count = 0
let fin_count = 6

let inicount2 = 4
let fincount2 =-1

let ini_acerto = 0
let fin_acerto = 5

let contador_letras_erradas = 0
let contador_letras_erradas2 = 0

let alfabeto = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
    'R','S','T','U','V','W','X','Y','Z'];

function inserindo_letra(letra_digitada) {
    //for pra percorrer os quadrados 
    for (let count = ini_count; count < fin_count; count++) {
        a=letra_digitada.innerHTML // letra tratada

        if (quadrados[count].innerHTML == '') {
                if (a) {quadrados[count].innerHTML = a;//nesse bloco de codigo ele verifica se o quadradinho atual nao esta preenchido e preenche com o conteudo da variavel a com a letra tratada
                    palavra_usuario.push(a)
} 
                
                if (letra_digitada.key && alfabeto.includes(letra_digitada.key.toUpperCase()) && palavra_usuario.length < 5){
                    quadrados[count].innerHTML = letra_digitada.key.toUpperCase();
                    palavra_usuario.push(letra_digitada.key.toUpperCase())     //nesse bloco de codigo ele verifica se o quadradinho atual nao esta preenchido e preenche com o conteudo da variavel a com a letra digitada no teclado
                } 
                else if (letra_digitada.key == 'Backspace') {apagar()} // nesse else ele pega a entrada do espaço se for backspace ele chama a funcao de apagaradas
                
            if (letra_digitada.key == 'Enter' && palavra_usuario.length == 5) { //quando o usuario termina de digitar a palavra com 5 letras entra nesse if
                
                if (palavra_usuario.length == 5) {
                    palavra_usuario = palavra_usuario.join('')
                    ini_count = ini_count +5
                    fin_count = fin_count +5
    
                    if (palavra_real == palavra_usuario) {     //se a palavra q o usuario digitou for igual a palavra do dia p usuario ganha
                        
                        inicount2 = inicount2 +5
                        fincount2 = fincount2 +5
                        palavra_usuario = []
                        setTimeout(() => {
                        window.alert('voce acertou a palavra');
                        //colorindo os quadradin para caso de vitoria
                        let quadradinhos = document.querySelectorAll('div.vazio')
                        for (let i= ini_acerto; i < fin_acerto ; i++){
                            quadradinhos[i].classList.add("certo")}
                        }, 300); 
                        break
    
                    }
                    else {  //se ele perder
                        setTimeout(() => {
                            window.alert('Voce errou a palavra')                        
                            }, 300);
                            
                            let quadradinhos = document.querySelectorAll('div.vazio')
                            for (a of palavra_usuario) {
                                //colore os quadrados de acordo com as regras do jogo 
                                if (palavra_real.includes(a)) {quadradinhos[contador_letras_erradas2].classList.add("meio-certo")} //se essa letra esta dentro da palavra adiciona a classe meio certo
                                if (a == palavra_real[contador_letras_erradas]) {quadradinhos[contador_letras_erradas2].classList.remove("meio-certo")} // se essa letra esta dentro da palavra e na posicao correta adiciona a classe certo
                                if (a == palavra_real[contador_letras_erradas]) {quadradinhos[contador_letras_erradas2].classList.add("certo")}         // se essa letra esta dentro da palavra e na posicao correta adiciona a classe certo
                                if (a != palavra_real[contador_letras_erradas]) {quadradinhos[contador_letras_erradas2].classList.add("errado")} //se a letra nao estiver na palavra do dia adiciona a classe
    
                                contador_letras_erradas++
                                contador_letras_erradas2++
                            }
                        inicount2 = inicount2 +5
                        fincount2 = fincount2 +5
                        ini_acerto= ini_acerto +5
                        fin_acerto =fin_acerto +5
                        contador_letras_erradas = 0
                        palavra_usuario = []
                    }
                } else {window.alert('precisa ter 5 letras, amiguinho')}////////////////////


                }
            break;
        }
    }
}
function apagar() {
    for (let count2 = inicount2; count2 != fincount2; count2--) {
        if (quadrados[count2].innerHTML != '') {
            quadrados[count2].innerHTML = '';
            palavra_usuario.pop()
            console.log(palavra_usuario)
            break;
        }
    }
}

document.body.addEventListener('keydown', inserindo_letra)