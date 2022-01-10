/* 
    Por : Marco Antônio M. Roos
    Exercício 1/3 - Biblioteca Ágil
    obs.: Eu fiz os exercícios apresadamente, acabei vacilando e deixando parte do código pt-br e outro en-us, não vou corrigir isso agora,
    pois pretendo fazer os três exercícios e estou com o prazo apertado ( boa parte do tempo passei com minha esposa que está internada na santa casa ).

    Agradeço a compreensão!
    ps.: Não sei se o programa da PUCRS ensina a usar comentários para explicar o código, mas de acordo com o livro "Clean Code", só se deve explicar códigos
    que sejam complexos como equações matemáticas dificeis de definir apenas de ler o código. 

    Compreendo que meu código não está limpo e está bagunçado, mas espero que tenham um pouco de paciência.
*/

api = new biblioteca_api;
render = new renderer;

function generateList() {
    if (document.getElementById('search').value != '') {
        render.render(api.pesquisarLivro(document.getElementById('search').value));
    } else {
        render.render(api.buscarTodosLivros());
    }
}

function openBookInfo(id) {
    document.getElementById('book-info').style.display = "block";
    document.getElementById('screen-cover').style.display = "block";
    livro = api.buscarLivroPorId(id);
    livro.then(data => {
        document.getElementById('info-title').innerHTML = data.titulo;
        document.getElementById('info-author').innerHTML = data.autor;
        document.getElementById('info-year').innerHTML = data.ano;
        document.getElementById('info-status').innerHTML = data.status;
        document.getElementById('info-borrower').innerHTML = data.portador;
        document.getElementById('info-status').className = data.status == "disponível" ? "disponible" : "indisponible";
        if (data.status == "disponível") {
            document.getElementById('borrower').disabled = false;
            document.getElementById('borrow-btn').style.display = "block";
            document.getElementById('return-btn').style.display = "none";
            document.getElementById('borrow-btn').setAttribute('onClick', `borrowBook(${id}, true)`);
        } else {
            document.getElementById('borrower').disabled = true;
            document.getElementById('borrow-btn').style.display = "none";
            document.getElementById('return-btn').style.display = "block";
            document.getElementById('return-btn').setAttribute('onClick', `borrowBook(${id}, false)`);
        }
    });

}

function closeBookInfo() {
    document.getElementById('book-info').style.display = "none";
    document.getElementById('screen-cover').style.display = "none";
}

function openBookRegister() {
    document.getElementById('new-book').style.display = "block";
    document.getElementById('screen-cover').style.display = "block";
}

function closeBookRegister() {
    document.getElementById('new-book').style.display = "none";
    document.getElementById('screen-cover').style.display = "none";
}

function borrowBook(id, borrow = true) {
    let borrower = document.getElementById('borrower').value;
    if (borrower.length > 2) {
        api.atualizarStatus(id, borrow ? "indisponível" : "disponível", borrow ? borrower : '');
        closeBookInfo();
        setTimeout(() => generateList(), 1000);
    } else {
        document.getElementById('warning').style.animation = "slideIn 10s forwards";
        document.getElementById('warning-title').innerHTML = "Nome Inválido!";
        document.getElementById('warning-message').innerHTML = "O nome deve ter no mínimo 3 caracteres.";
        setTimeout(() => { document.getElementById('warning').style.animation = "";}, 10000);
    }
}

function registerBook() {
    if (document.getElementById('new-title').value.length > 2
        && document.getElementById('new-author').value.length > 2
        && document.getElementById('new-year').value.length > 2) {
        api.adicionarLivro(document.getElementById('new-title').value,
            document.getElementById('new-author').value,
            document.getElementById('new-year').value);
        closeBookRegister();
        setTimeout(() => generateList(), 1000);
    } else {
        document.getElementById('warning').style.animation = "slideIn 10s forwards";
        document.getElementById('warning-title').innerHTML = "Faltam Dados!";
        document.getElementById('warning-message').innerHTML = "Todos os campos devem ter 3 caracteres ou mais.";
        setTimeout(() => { document.getElementById('warning').style.animation = "";}, 10000);
    }
}
