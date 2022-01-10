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

    pesquisarLivro(pesquisa) {
        let req = fetch(this._url);
        return req.then(data => data.json()).then(data => {
            pesquisa = pesquisa.toLowerCase();
            let books = [];
            for( let i = 0; i < data.livros.length; i++ ) {
                if( data.livros[i].titulo.toLowerCase().indexOf(pesquisa) != -1 || data.livros[i].autor.toLowerCase().indexOf(pesquisa) != -1 ) {
                    books.push( data.livros[i] );
                }
            }
            return books.length > 0 ? books : null;
        });
    }
}