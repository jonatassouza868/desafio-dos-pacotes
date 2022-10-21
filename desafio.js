"use strict";
let Nome = document.getElementById('nome');
let ativo = document.getElementById('ativo');
let inativo = document.getElementById('inativo');
let DataDeViagem = document.getElementById('dataDeViajem');
let Descriçao = document.getElementById('descriçao');
let cadastrar = document.getElementById('cadastrar');
let editar = document.getElementById('editar');
let excluir = document.getElementById('excluir');
let lista = document.querySelector('.cardX');
let pacote = document.getElementById('pacote');
let arrayDosPacotes = [];
let iD;
class Pacote {
    constructor(_nome, _descriçao, _data, _status, _id) {
        this.nome = _nome;
        this.descriçao = _descriçao;
        this.data = _data;
        this.status = _status;
        this.id = _id;
    }
}
// pegar dados da API -- fech
fetch('https://62361b7feb166c26eb2f488a.mockapi.io/pacotes', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
})
    .then(Response => Response.json())
    .then(Result => {
    console.log(Result);
    for (let index = 0; index < Result.length; index++) {
        arrayDosPacotes[index] = new Pacote(Result[index].nome, Result[index].descricao, new Date(Result[index].data), Result[index].status, Result[index].id);
    }
    fazer_pacote();
});
const fazer_pacote = () => {
    let lista = ``;
    for (let index = 0; index < arrayDosPacotes.length; index++) {
        lista += `<div class="cardX"><h2>${arrayDosPacotes[index].nome}</h2><p>${arrayDosPacotes[index].descriçao}<p><br /><p>${arrayDosPacotes[index].data}<p><div class="flexBotoes"><button id="editar"type="submit"class="editar" onclick='Editar("${arrayDosPacotes[index].nome}","${arrayDosPacotes[index].descriçao}","${arrayDosPacotes[index].data}","${arrayDosPacotes[index].status}","${arrayDosPacotes[index].id}")'>editar<button><button id="excluir"type="reset"class="excluir" onclick="Excluir()">excluir</button></div></div>`;
    }
    pacote.innerHTML = lista;
    console.log(arrayDosPacotes);
};
let boxSelecionado;
const Cadastrar = () => {
    if (ativo.checked) {
        boxSelecionado = true;
        console.log(boxSelecionado);
    }
    else if (inativo.checked) {
        boxSelecionado = false;
        console.log(boxSelecionado);
    }
    let criarPacote = new Pacote(Nome.value, Descriçao.value, DataDeViagem.value, boxSelecionado, arrayDosPacotes.length);
    arrayDosPacotes.push(criarPacote);
    fazer_pacote();
};
const Editar = (nome, descricao, data, status, id) => {
    console.log(nome, descricao, data, status, id);
    //passar pras inputs nome,descricao,data
    iD = id;
    Nome.value = nome;
    Descriçao.value = descricao;
    DataDeViagem.value = data;
    //mudar cadastro para editar
    cadastrar.innerHTML = "<button class= 'Ajustar' onclick='ajustar()'>Ajustar</button>";
};
const ajustar = () => {
    let devolver = new Pacote(Nome.value, Descriçao.value, DataDeViagem.value, false, iD);
    arrayDosPacotes.splice(iD - 1, 1, devolver);
    console.log(iD);
    fazer_pacote();
};
// função excluir
const Excluir = (index) => {
    arrayDosPacotes.splice(index, 1);
    fazer_pacote();
};
