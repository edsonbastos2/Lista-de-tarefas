const inputTexto = document.querySelector('.input-texto');
const btnTexto = document.querySelector('.btn-texto');
const listaTexto = document.querySelector('.lista-tarefa');


// função para criar LI
function criarLi(){
    const li = document.createElement('li');
    return li;
}

function criarBotao(li){
    li.innerText += ' ';
    const botao = document.createElement('button');
    botao.setAttribute('class', 'apagar');
    botao.innerText = 'Apagar';
    li.appendChild(botao);
}

// pegar o evento de pressionar o enter
inputTexto.addEventListener('keypress', (e) => {
    if(e.keyCode === 13){
        if(!inputTexto.value) return
        addTarefa(inputTexto.value)
    }
})

// Limpa campo input
function limpaInput(){
    inputTexto.value = '';
    inputTexto.focus();
}

// Adicionar tarefa
function addTarefa(texto){
    const li = criarLi();
    li.innerText = texto;
    listaTexto.appendChild(li);
    criarBotao(li);
    limpaInput();
    salvaTarefa()
}

// Evento de click para o botão
btnTexto.addEventListener('click', (e) => {
    if(!inputTexto.value) return
    addTarefa(inputTexto.value)
})

// Selecionar o elemento com class apagar e remover
addEventListener('click', (e) => {
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        salvaTarefa()
    }
})

// função para salva tarefa com json string
function salvaTarefa(){
    const lisTarefas = listaTexto.querySelectorAll('li');
    const listaDeTarefas = []

    for(let tarefa of lisTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

// Função para retorna as tarefas 
function addTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaTarefas = JSON.parse(tarefas);

    for(let tarefa of listaTarefas){
        addTarefa(tarefa);
    }
}

addTarefasSalvas()