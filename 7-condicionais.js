console.log(`Trabalhando com condicionais`);

//const salvador = `Salvador`;
//const saoPaulo = `São Paulo`;
//const rioDeJaneiro = `Rio de Janeiro`;


const listaDeDestinos = new Array(
    `Salvador`,
    `São Paulo`,
    `Rio de Janeiro`
    
);
const idadeComprador = 17;
const estaAcompanhada = false;
const temPassagemComprada = true;
console.log("Destino Possíveis:");
console.log(listaDeDestinos);

/*if(idadeComprador >= 18){

    console.log("comprador maior de idade");
    listaDeDestinos.splice(1,1); //removendo item 
}else{
    //  A pessoa é menor de idade
    if(estaAcompanhada == true){
    console.log("comprador esta acompanhado");
    listaDeDestinos.splice(1,1); //removendo item 
    }else{
    console.log("comprador não é maior de idade e nao posso vender");
    }   
}*/

// if(idadeComprador >= 18){

//     console.log("comprador maior de idade");
//     listaDeDestinos.splice(2,1); //removendo item 
// }else if(estaAcompanhada == true){
//     console.log("comprador esta acompanhado");
//     listaDeDestinos.splice(2,1); //removendo item 
// }else{
//     console.log("comprador não é maior de idade e nao posso vender");
//     }   


if(idadeComprador >= 18 || estaAcompanhada == true){

    console.log("boa viagem!!");
    listaDeDestinos.splice(2,1); //removendo item 
}else{
    console.log("comprador não é maior de idade e nao posso vender");
    }   

console.log("Embarque: \n\n")
if(idadeComprador >= 18 && temPassagemComprada){
    console.log("boa boa viagem")
}else{
    console.log("VocÊ nao pode embarcar")
}




console.log(listaDeDestinos);
/*
console.log(idadeComprador > 18);
console.log(idadeComprador < 18);
console.log(idadeComprador <= 18);
console.log(idadeComprador >= 18);
console.log(idadeComprador == 18);
*/

