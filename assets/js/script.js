const btn = document.querySelector('#pesquisa-btn');
const searchBar = document.querySelector('#pesquisa');
const apikey = "d5b600bc";
const baseURL = `https://www.omdbapi.com/?apikey=${apikey}&`;
const logo = document.querySelector('.logo');
const btnVolta = document.querySelector('.left');
const btnAvanca = document.querySelector('.right');
const atual = document.querySelector('.atual');
const logoMobile = document.querySelector('.logoOff');
const cards = document.querySelector('.movie-card');
const modalContainer = document.querySelector('.modal-container');
const cardsContainer = document.querySelector('.movies');

let contaPaginas = 1;
let maxPaginas = 0;
let pesquisas = 'batman';

mostraPagina();

btnAvanca.addEventListener('click', avancaPagina);
btnVolta.addEventListener('click', voltaPagina);
searchBar.addEventListener("keydown", verificarEnter);


cardsContainer.addEventListener('click', function(e) {
    const card = e.target.closest('.movie-card');
    if (card) {
        const meuID = card.lastElementChild.innerText;
        criaModal(meuID);
    }
});

logoMobile.addEventListener('click', () => {
    contaPaginas = 1;
    location.reload();
});

logo.addEventListener('click', () => {
    contaPaginas = 1;
    location.reload();
})

btn.addEventListener('click', () => {
    pesquisas = searchBar.value.trim();
    contaPaginas = 1;
    chamaAPI(); 
    mostraPagina();
    
});

function verificarEnter(event) {
    if (event.keyCode === 13) {
        pesquisas = searchBar.value.trim();
        contaPaginas = 1;
        chamaAPI();
        mostraPagina();
    }
}

function chamaAPI(){
    if(pesquisas == ''){
        alert('informe um filme');
        contaPaginas = 1;
        return
    }

    fetch(`https://www.omdbapi.com/?s=${pesquisas}&apikey=${apikey}&page=${contaPaginas}`)
    .then(resultado => resultado.json())
    .then(json => criaFilme(json))
}

function criaFilme(json){
    const movies = document.querySelector('.movies');

    movies.innerHTML = "";

    if(json.Response === 'False'){
        let erro = document.createElement("div");
        erro.classList.add('error');
        erro.innerHTML = `<h1> Não encontrado :/ </h1>` 
        movies.appendChild(erro);
    }

    if(json.totalResults < 10){
        maxPaginas = 1
    } else {
        maxPaginas = json.totalResults / 10;
    }
    

    json.Search.forEach(element => {

        let iten = document.createElement("div");
        iten.classList.add('movie-card');
        iten.innerHTML = `<img src="${element.Poster}" alt=""> 
        <h3>${element.Title}</h3>
        <p>${element.Year}</p>
        <span class="id">${element.imdbID}</span>`
        movies.append(iten);
    });
}

function voltaPagina(){
    contaPaginas -= 1;
    chamaAPI();
    mostraPagina();
    retornaTopo();
}

function avancaPagina (){
    contaPaginas += 1;
    chamaAPI();
    mostraPagina();
    retornaTopo();
}

function mostraPagina(){
    atual.innerHTML = contaPaginas;
}

function retornaTopo(){
    window.scroll({top: 0, behavior: 'smooth'});
}

function fechamodal(){
    modalContainer.classList.add('off');
}

function criaModal(id){

    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apikey}&page=${contaPaginas}`)
    .then(res => res.json())
    .then(json => modalMaker(json));
}

function modalMaker(jsons){

    modalContainer.innerHTML = "";

    let novoModal = document.createElement('div');

    novoModal.classList.add('info-modal');

    novoModal.innerHTML =
        `<img src="${jsons.Poster}" alt="">

        <div class="modal-text">

            <h3 class="modal-titulo">${jsons.Title}</h3>

            <p class="genero">${jsons.Genre}</p>

            <p class="ano">${jsons.Year}, ${jsons.Type}</p>

            <p class="desc">${jsons.Plot}</p>

            <p class="premios">${jsons.Awards}</p>

            <button class="btnModal" onclick="fechamodal()">Fechar</button>

        </div>`;

    modalContainer.appendChild(novoModal);
    modalContainer.style.display = 'flex';

    const btnModal = document.querySelector(".btnModal");
    btnModal.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    })
}



