let data = new Date
let dia = data.getDate() 
let mes = data.getMonth() + 1 // nao mexe nesse mais 1 amigo
let ano = data.getFullYear()
let quadrados = document.getElementById("quadrados").children;
let palavra_usuario = [];
let palavra_usuario2 = [];
let dataParsed = String(dia) + String(mes) + String(ano)
let wordList = {
    '2382022':'OSSOS',
    '2482022':'AROMA',
    '2582022':'FUNFA',
    '2982022':'OSSOS',
    '3082022':'AROMA',
    '3182022':'XUCRA',
    '192022':'VEIAS',
    '292022':'TRUFA',
    '392022':'TUNEL',
    '492022':'TRUCO',
    '592022':'SORRI',
    '692022':'JOIAS',
    '792022':'ABANA',
}
let ganhou = false
let palavra_real = wordList[dataParsed];
let n = 1;
let ini_count = 0;
let fin_count = 6; // para inserçao 

let inicount2 = 4;  // para apagar
let fincount2 = -1;

let ini_acerto = 0;
let fin_acerto = 5;

let contador_letras_erradas = 0;
let contador_letras_erradas2 = 0;

let alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
];

function inserindo_letra(letra_digitada) {
  //for pra percorrer os quadrados

  for (let count = ini_count; count < fin_count; count++) {
    a = letra_digitada.innerHTML; // letra tratada
    if (quadrados[count].innerHTML == "" && !ganhou) {
      if (a && alfabeto.includes(a) && palavra_usuario.length < 5 ) {
        quadrados[count].innerHTML = a; //nesse bloco de codigo ele verifica se o quadradinho atual nao esta preenchido e preenche com o conteudo da variavel a com a letra tratada
        if (palavra_usuario.includes(a)) {
          palavra_usuario2.push("-");
          palavra_usuario.push(a);
        } else {
          palavra_usuario2.push(a);
          palavra_usuario.push(a); //nesse bloco de codigo ele verifica se o quadradinho atual nao esta preenchido e preenche com o conteudo da variavel a com a letra digitada no teclado
        }
      }

      if (
        letra_digitada.key &&
        alfabeto.includes(letra_digitada.key.toUpperCase()) &&
        palavra_usuario.length < 5
      ) {
        quadrados[count].innerHTML = letra_digitada.key.toUpperCase();
        if (palavra_usuario.includes(letra_digitada.key.toUpperCase())) {
          palavra_usuario2.push("-");
          palavra_usuario.push(letra_digitada.key.toUpperCase());
        } else {
          palavra_usuario2.push(letra_digitada.key.toUpperCase());
          palavra_usuario.push(letra_digitada.key.toUpperCase()); //nesse bloco de codigo ele verifica se o quadradinho atual nao esta preenchido e preenche com o conteudo da variavel a com a letra digitada no teclado
        } //nesse bloco de codigo ele verifica se o quadradinho atual nao esta preenchido e preenche com o conteudo da variavel a com a letra digitada no teclado
      } else if (letra_digitada.key == "Backspace") {
        apagar();
      } // nesse else ele pega a entrada do espaço se for backspace ele chama a funcao de apagaradas

      if (
        (letra_digitada.key == "Enter" || a == "ENTER" || letra_digitada == 'ENTER' ) &&
        palavra_usuario.length == 5
      ) {
        //quando o usuario termina de digitar a palavra com 5 letras entra nesse if

        if (palavra_usuario.length == 5) {
          palavra_usuario = palavra_usuario.join("");
          localStorage.setItem("palavra" + n, palavra_usuario);
          n++;
          ini_count = ini_count + 5;
          fin_count = fin_count + 5;

          if (palavra_real == palavra_usuario) {
            //se a palavra q o usuario digitou for igual a palavra do dia p usuario ganha
            inicount2 = inicount2 + 5;
            fincount2 = fincount2 + 5;
            palavra_usuario = [];
            palavra_usuario2 = [];
            setTimeout(() => {
              startConfetti();
              ganhou = true
              let hmodal = document.getElementById('hmodal')
              let pmodal = document.getElementById('pmodal')
              hmodal.innerHTML = 'Parabens Voce Ganhou'
              pmodal.innerHTML = 'Voce é muito bom'
              function abreModal() {
                $("#myModal").modal({
                  show: true
                });
              }
              
              setTimeout(abreModal, 300);
              //colorindo os quadradin para caso de vitoria
              let quadradinhos = document.querySelectorAll("div.vazio");
              for (let i = ini_acerto; i < fin_acerto; i++) {
                quadradinhos[i].classList.add("certo");
              }
            }, 300);
            break;
          } else {
            //se ele perder
            // setTimeout(() => {
            //   window.alert("Voce errou a palavra");
            // }, 300);
            let quadradinhos = document.querySelectorAll("div.vazio");
            for (a of palavra_usuario) {
              //colore os quadrados de acordo com as regras do jogo
              const regex = new RegExp(a, "g");
              if (
                palavra_real.includes(a) &&
                palavra_real.match(regex).length >=
                  palavra_usuario.match(regex).length
              ) {
                quadradinhos[contador_letras_erradas2].classList.add(
                  "meio-certo"
                );
                pintaTecladoAmarelo(a, "amarelo");
              } //se essa letra esta dentro da palavra adiciona a classe meio certo
              if (a == palavra_real[contador_letras_erradas]) {
                quadradinhos[contador_letras_erradas2].classList.remove(
                  "meio-certo"
                );
              } // se essa letra esta dentro da palavra e na posicao correta adiciona a classe certo
              if (a == palavra_real[contador_letras_erradas]) {
                quadradinhos[contador_letras_erradas2].classList.add("certo");
                pintaTecladoAmarelo(a, "verde");
              } // se essa letra esta dentro da palavra e na posicao correta adiciona a classe certo
              if (a != palavra_real[contador_letras_erradas]) {
                if (
                  !palavra_real.includes(a) ||
                  palavra_real.match(regex).length <
                    palavra_usuario.match(regex).length
                ) {
                  quadradinhos[contador_letras_erradas2].classList.add(
                    "errado"
                  );
                  quadradinhos[contador_letras_erradas2].classList.remove(
                    "meio-certo"
                  );
                  pintaTecladoAmarelo(a, "cinza");
                }
              }
              contador_letras_erradas++;
              contador_letras_erradas2++;
            }
            inicount2 = inicount2 + 5;
            fincount2 = fincount2 + 5;
            ini_acerto = ini_acerto + 5;
            fin_acerto = fin_acerto + 5;
            contador_letras_erradas = 0;
            palavra_usuario = [];
          }
        } else {
          window.alert("precisa ter 5 letras, amiguinho");
        }
      }
      break;
    }
  }
}
function apagar() {
  for (let count2 = inicount2; count2 != fincount2; count2--) {
    if (quadrados[count2].innerHTML != "") {
      quadrados[count2].innerHTML = "";
      palavra_usuario.pop();
      palavra_usuario2.pop();
      break;
    }
  }
}
document.body.addEventListener("keydown", inserindo_letra);
const tecladinho = document.querySelectorAll(".caixa-teclado");

function pintaTecladoAmarelo(letraUser, cor) {
  for (letra of tecladinho) {
    if (letra.innerHTML == letraUser) {
      if (cor == "verde") {
        letra.classList.remove("outros");
        letra.classList.remove("meio-certo")
        letra.classList.add("certo");
      } else if (cor == "amarelo") {
        letra.classList.remove("outros");
        letra.classList.add("meio-certo");
      } else if (cor == "cinza") {
        letra.classList.remove("outros");
        letra.classList.add("errado");
      }
    }
  }
}

// palavra_usuario.classList.remove("outros")
// palavra_usuario.classList.add("meio-certo")

let tamanhoLocal = localStorage.length -1
let quadradinhos = document.querySelectorAll("div.vazio");
dataSalva = localStorage.getItem('DATA')


if (dataSalva != dataParsed) {
localStorage.clear()
localStorage.setItem('DATA', dataParsed)
} else {



    for (let ind = 0; ind < tamanhoLocal ; ind++) {

        palavraLocalST= localStorage.getItem(`palavra${ind+1}`)
        for (letra of palavraLocalST) {
            quadradinhos[ini_count].innerHTML = letra
            palavra_usuario.push(letra)
            ini_count ++
            fin_count ++ 
            ini_acerto ++
            fin_acerto ++
        }

        ini_count -= 5
        fin_count -= 5 
        ini_acerto -= 5
        fin_acerto -= 5
        inserindo_letra('ENTER')
    }

}
