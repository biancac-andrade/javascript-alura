console.log(` \n Trabalhando com loops`);
const listaDeDestinos = new Array(
    `Salvador`,
    `São Paulo`,
    `Rio de Janeiro`
    
);
const idadeComprador = 18;
const estaAcompanhada = false;
let temPassagemComprada = false;
const destino = "São Paulo";

console.log(" \n Destino Possíveis:");
console.log(listaDeDestinos);

const podeComprar = idadeComprador >= 18 || estaAcompanhada == true;

let contador = 0;

while(contador < 3){
    if(listaDeDestinos[contador] == destino){
        console.log("Destino existe");
    }else{
        console.log("Destino não existe");
        
    }
    
    contador += 1;
}



