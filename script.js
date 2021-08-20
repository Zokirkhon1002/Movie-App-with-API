let search = document.getElementById("search");
let btn = document.getElementById("btn");
let main = document.getElementById("main");
let form = document.getElementById("form");

const api_url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const api_img = "https://image.tmdb.org/t/p/w1280";
const api_search = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

// birinchi movielarni olib olamiz
getMovies(api_url);

async function getMovies(url) {
  let javob = await fetch(url);
  let data = await javob.json();

  showMovies(data.results);
}

// movielarni ko'rsatamiz
function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    // destructuring qilib olamiz
    let { title, poster_path, vote_average, overview } = movie;

    let div = document.createElement("div");
    div.classList.add("movie");

    div.innerHTML = `
        <img src="${api_img + poster_path}" alt="${title}">
        
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        `;
        main.appendChild(div);
  });
}

// tartiblab olamiz
function getClassByRate(vote){
    if(vote >= 8){
        return "green";
    }
    else if(vote >= 5){
        return "orange";
    }
    else {
        return "red";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let searchMavzu = search.value;

    if(searchMavzu && searchMavzu !== ''){
        getMovies(api_search + searchMavzu);
        search.value = '';
    } else {
        window.location.reload();
    }
})