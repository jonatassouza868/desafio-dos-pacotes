let Nome = document.getElementById('nome')! as HTMLInputElement
let ativo = document.getElementById('ativo')! as HTMLInputElement
let inativo = document.getElementById('inativo')! as HTMLInputElement
let DataDeViagem:any = document.getElementById('dataDeViajem')! as HTMLInputElement
let Descriçao = document.getElementById('descriçao')! as HTMLInputElement
let cadastrar = document.getElementById('cadastrar')! as HTMLInputElement
let editar = document.getElementById('editar')! as HTMLInputElement
let excluir = document.getElementById('excluir')! as HTMLInputElement
let lista = document.querySelector('.cardX')!
let pacote = document.getElementById('pacote')!as HTMLInputElement
let arrayDosPacotes: Array<Pacote> = []
let iD:number;

class Pacote{
     nome:string;
     descriçao:string;
     data:Date;
     status:boolean;
     id:number;

     constructor(_nome:string, _descriçao:string, _data:Date, _status:boolean, _id:number){
        this.nome = _nome
        this.descriçao = _descriçao
        this.data = _data
        this.status = _status
        this.id = _id
     }
    }

// pegar dados da API -- fech

fetch('https://62361b7feb166c26eb2f488a.mockapi.io/pacotes',{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
})
    .then(Response => Response.json())

    .then(Result => {

        console.log(Result);

        for (let index = 0; index < Result.length; index++) {

            arrayDosPacotes[index] = new Pacote(Result[index].nome, Result[index].descricao, new Date(Result[index].data), Result[index].status, Result[index].id)

        }fazer_pacote()
    })
    const fazer_pacote = () => {

       let  lista:string =  ``;
        for (let index = 0; index < arrayDosPacotes.length; index++) {
          lista+= `<div class="cardX"><h2>${arrayDosPacotes[index].nome}</h2><p>${arrayDosPacotes[index].descriçao}<p><br /><p>${arrayDosPacotes[index].data}<p><div class="flexBotoes"><button id="editar"type="submit"class="editar" onclick='Editar("${arrayDosPacotes[index].nome}","${arrayDosPacotes[index].descriçao}","${arrayDosPacotes[index].data}","${arrayDosPacotes[index].status}","${arrayDosPacotes[index].id}")'>editar<button><button id="excluir"type="reset"class="excluir" onclick="Excluir()">excluir</button></div></div>`
        }
        pacote.innerHTML = lista;
        console.log(arrayDosPacotes);
        
    }
    let boxSelecionado:boolean;
        const Cadastrar =() =>{
            if(ativo.checked){
                boxSelecionado =true
                console.log(boxSelecionado);
                
            }
            else if(inativo.checked){
                boxSelecionado = false
                console.log(boxSelecionado);
                
            }
            let criarPacote = new Pacote(Nome.value, Descriçao.value, DataDeViagem.value,boxSelecionado, arrayDosPacotes.length )
            arrayDosPacotes.push(criarPacote)
            fazer_pacote()
        }
        const Editar = (nome:string,descricao:string,data:Date,status:boolean,id:number) =>{
            console.log(nome,descricao,data,status,id);
            //passar pras inputs nome,descricao,data
            iD = id
            Nome.value = nome
            Descriçao.value = descricao 
            DataDeViagem.value = data
            //mudar cadastro para editar
            cadastrar.innerHTML = "<button class= 'Ajustar' onclick='ajustar()'>Ajustar</button>"
            }
            const ajustar = () =>{
            let devolver  = new Pacote(Nome.value,Descriçao.value,DataDeViagem.value,false,iD)
            arrayDosPacotes.splice(iD-1,1,devolver)
            console.log(iD);
            fazer_pacote()
            }
            // função excluir
            const Excluir = (index:number)=>{
                arrayDosPacotes.splice(index, 1)
                fazer_pacote()
            }