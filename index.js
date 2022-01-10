api = new biblioteca_api;
render = new renderer;

function generateList() {
    if(document.getElementById('search').value != '') {
        render.render(api.pesquisarLivro(document.getElementById('search').value));
    } else {
        render.render(api.buscarTodosLivros());
    }
}

function openBookRegister() {

}

function closeBookRegister() {

}

function openBookInfo() {

}

function closeBookInfo() {

}

function openBookBorrow() {

}

function closeBookBorrow() {

}

function borrowBook() {

}

function takeBackBook() {
    
}