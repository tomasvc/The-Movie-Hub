$(document).ready(() => {
    getMovies();
});

https://api.themoviedb.org/3/movie/popular?page=' + x + '&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34

function getFullCharts(url, page) {

    $(".chart-list").html("");

    fetch(url + page + '&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then(res => {
        res = res.json()
        .then(data => {

            let list = ``;
            let word = "";

            for (i = 0; i <= data.results.length-1; i++) {

                if (data.results[i].vote_count == 1) {
                    word = "vote";
                } else {
                    word = "votes";
                }

                list += `<a onclick="movieSelected(${data.results[i].id})" href='#'><li id="charts-list-item"><img class="charts-list-poster" src='${data.results[i].poster_path != null ? "https://image.tmdb.org/t/p/w200" + data.results[i].poster_path : "img/poster-blank.jpg"}'>`;
                //list += `<p class="charts-list-title">${data.results[i].title}</p>`;
                //list += `<div class="charts-list-score"><i id="charts-list-star" class="fas fa-star"></i><span class="vote-average">${data.results[i].vote_average}</span><span class="vote-count">(${data.results[i].vote_count + ' ' + word})</span></div></li></a>`;
            }

            list += `</ul>`;

            list += `<div class="page-nav">`
            list += `<p>Page ${data.page} out of ${data.total_pages}</p>`;

            if (page == 1 && data.total_pages > 1) {
                list += `<a href="#" onclick="getFullCharts('https://api.themoviedb.org/3/movie/popular?page=', ${page+1})">Next page</a>`;
            } else if (page > 1 && data.total_pages > 1) {
                list += `<a href="#" onclick="getFullCharts('https://api.themoviedb.org/3/movie/popular?page=', ${page-1})">Previous page</a>`;
                list += `<a href="#" onclick="getFullCharts('https://api.themoviedb.org/3/movie/popular?page=', ${page+1})">Next page</a>`;
            } else {
                list += `<a href="#" onclick="getFullCharts(${x-1})">Previous page</a>`;
            }

            list += `</div>`;

            $(".chart-list").append(list);

        });

    })   

}

function getTrendingMovieCharts(x) {

    getFullCharts('https://api.themoviedb.org/3/movie/popular?page=', 1)

}


function getPlayingMovieCharts(x) {

    getFullCharts('https://api.themoviedb.org/3/movie/now_playing?page=', 1)

}

function getUpcomingMovieCharts(x) {

    getFullCharts('https://api.themoviedb.org/3/movie/upcoming?page=', 1)

}

function getCharts(url, className) {

    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then((res) => {

        res = res.json()

        .then(data => {

            let list = '';
            let word = "";
                        
            for (i = 0; i <= 11; i++) {

                if (data.results[i].vote_count == 1) {
                    word = "vote";
                } else {
                    word = "votes";
                }
                
                list += `<a onclick="movieSelected(${data.results[i].id})" href='#'><li id="charts-item"><img onlick="movieSelected(${data.results[i].id})" class="charts-poster" src='https://image.tmdb.org/t/p/w200${data.results[i].poster_path}'>`;
                //list += `<p class="charts-title">${data.results[i].title}</p>`; 
                //list += `<div class="charts-score"><i id="charts-star" class="fas fa-star"></i><span class="vote-average">${data.results[i].vote_average}</span><span class="vote-count">(${data.results[i].vote_count + " " + word})</span></div></li></a>`;
                            
            }
                        
            $(className).append(list);

            })  

    })
    .catch((err) => {
        console.log(err);
    });

}

function getMovies() {

    /* HOME PAGE */

    getCharts('https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34', '.trending-list')
    getCharts('https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34', '.now-playing-list')
    getCharts('https://api.themoviedb.org/3/movie/upcoming?page=1&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34', '.upcoming-list')

}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function creditsSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie_credits.html';
    return false;
}

function personSelected(id) {
    sessionStorage.setItem('personId', id);
    window.location = 'person.html';
    return false;
}