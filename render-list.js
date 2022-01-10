class renderer {
    cosntructor() { }

    render(list) {
        let listElement = document.getElementById('list');
        list.then(data => {
            listElement.innerHTML = '';
            if (data != null ) {
                data.forEach(element => {
                    let base = document.createElement('div');
                    base.className = "book-base";

                    let titleLabel = document.createElement('p');
                    titleLabel.innerHTML = 'Titulo: ';
                    base.appendChild(titleLabel);

                    let title = document.createElement('p');
                    title.innerHTML = element.titulo;
                    base.appendChild(title);

                    base.appendChild(document.createElement('br'));

                    let authorLabel = document.createElement('p');
                    authorLabel.innerHTML = 'Autor: ';
                    base.appendChild(authorLabel);

                    let author = document.createElement('p');
                    author.innerHTML = element.autor;
                    base.appendChild(author);

                    base.appendChild(document.createElement('br'));

                    let yearLabel = document.createElement('p');
                    yearLabel.innerHTML = 'Ano: ';
                    base.appendChild(yearLabel);

                    let year = document.createElement('p');
                    year.innerHTML = element.ano;
                    base.appendChild(year);

                    base.appendChild(document.createElement('br'));

                    let statusLabel = document.createElement('p');
                    statusLabel.innerHTML = 'Status: ';
                    base.appendChild(statusLabel);

                    let status = document.createElement('p');
                    status.innerHTML = element.status;
                    status.className = element.status == "disponível" ? "disponible" : "indisponible";
                    base.appendChild(status);

                    base.appendChild(document.createElement('br'));

                    let borrowerLabel = document.createElement('p');
                    borrowerLabel.innerHTML = 'Emprestado Para: ';
                    base.appendChild(borrowerLabel);

                    let borrower = document.createElement('p');
                    borrower.innerHTML = element.portador;
                    base.appendChild(borrower);



                    listElement.appendChild(base);
                });
            } else {
                let nothingFound = document.createElement('p');
                nothingFound.innerHTML = 'Não encontramos nada relacionado com a sua pesquisa 🤷‍♂️';
                listElement.appendChild(nothingFound);
            }
        });
    }
}