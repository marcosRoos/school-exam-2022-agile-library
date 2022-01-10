class biblioteca_api {
    constructor() {
        this._url = "https://biblioteca-agil.herokuapp.com/";
    }

    buscarTodosLivros() {
        let req = fetch(this._url);
        return req.then(data => data.json()).then(data => {
            return data.livros;
        });
    }

    buscarLivroPorId(id) {
        let req = fetch(this._url);
        return req.then(data => data.json()).then(data => {
            for (let i = 0; i < data.livros.length; i++) {
                if (data.livros[i].id == id) {
                    return data.livros[i];
                }
            }
            return null;
        });
    }

    pesquisarLivro(pesquisa) {
        let req = fetch(this._url);
        return req.then(data => data.json()).then(data => {
            pesquisa = pesquisa.toLowerCase();
            let books = [];
            for (let i = 0; i < data.livros.length; i++) {
                if (data.livros[i].titulo.toLowerCase().indexOf(pesquisa) != -1 || data.livros[i].autor.toLowerCase().indexOf(pesquisa) != -1) {
                    books.push(data.livros[i]);
                }
            }
            return books.length > 0 ? books : null;
        });
    }

    adicionarLivro(title, author, year, status="disponível", borrower="") {
        let livros = this.buscarTodosLivros();
        livros.then(data => {
            let id = data.length;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", this._url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                id: id,
                titulo: title,
                autor: author,
                ano: year,
                status: status,
                portador: borrower
            }));
        });
    }

    atualizarStatus(id, newStatus, newBorrower) {
        let livro = this.buscarLivroPorId(id);
        console.log( "buscou livro: " );
        console.log( livro );
        livro.then( data => {
            var xhr = new XMLHttpRequest();
            xhr.open("PUT", this._url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                id: id,
                titulo: data.titulo,
                autor: data.autor,
                ano: data.ano,
                status: newStatus,
                portador: newBorrower
            }));
        });
    }
}