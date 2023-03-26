const btn = document.querySelector('#pesquisa-btn');
const searchBar = document.querySelector('#pesquisa');
const apikey = "d5b600bc";
const baseURL = `https://www.omdbapi.com/?apikey=${apikey}&`;
const logo = document.querySelector('.logo');
const btnVolta = document.querySelector('.left');
const btnAvanca = document.querySelector('.right');
const atual = document.querySelector('.atual');
let contaPaginas = 1;
let maxPaginas = 0;


logo.addEventListener('click', () => {
    location.reload();
})

searchBar.addEventListener("keydown", verificarEnter);

function verificarEnter(event) {
    if (event.keyCode === 13) {
      chamaAPI();
    }
  }


btn.addEventListener('click', () => {

    chamaAPI(); 
    
});

function chamaAPI(){
    if(searchBar.value == ''){
        alert('informe um filme');
        return
    }

    const busca = searchBar.value;

    fetch(`https://www.omdbapi.com/?s=${busca}&apikey=${apikey}&page=${contaPaginas}`)
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

    json.Search.forEach(element => {

        let iten = document.createElement("div");
        iten.classList.add('movie-card');
        iten.innerHTML = `<img src="${element.Poster}" alt=""> 
        <h3>${element.Title}</h3>
        <p>${element.Year}</p>`

        movies.append(iten);
    });
}

atual.innerHTML = contaPaginas;



