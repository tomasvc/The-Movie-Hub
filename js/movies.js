$(document).ready(() => {
    getMovies();
});

function getTrendingMovieCharts(x) {

    $(".chart-list").html("");

    axios.get('https://api.themoviedb.org/3/movie/popular?page=' + x + '&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {

        var list = `<ul>`;
        list += `<h4>Trending</h4>`;
        let word = "";

        for (i = 0; i <= response.data.results.length-1; i++) {

            if (response.data.results[i].vote_count == 1) {
                word = "vote";
            } else {
                word = "votes";
            }

            list += `<a onclick="movieSelected(${response.data.results[i].id})" href='#'><li id="charts-list-item"><img class="charts-list-poster" src='${response.data.results[i].poster_path != null ? "https://image.tmdb.org/t/p/w200" + response.data.results[i].poster_path : "img/poster-blank.jpg"}'>`;
            list += `<p class="charts-list-title">${response.data.results[i].title}</p>`;
            list += `<div class="charts-list-score"><i id="charts-list-star" class="fas fa-star"></i><span class="vote-average">${response.data.results[i].vote_average}</span><span class="vote-count">(${response.data.results[i].vote_count + ' ' + word})</span></div></li></a>`;
        }

        list += `</ul>`;

        list += `<div class="page-nav">`
        list += `<p>Page ${response.data.page} out of ${response.data.total_pages}</p>`;

        if (x == 1 && response.data.total_pages > 1) {
            list += `<a href="#" onclick="getTrendingMovieCharts(${x+1})">Next page</a>`;
        } else if (x > 1 && response.data.total_pages > 1) {
            list += `<a href="#" onclick="getTrendingMovieCharts(${x-1})">Previous page</a>`;
            list += `<a href="#" onclick="getTrendingMovieCharts(${x+1})">Next page</a>`;
        } else {
            list += `<a href="#" onclick="getTrendingMovieCharts(${x-1})">Previous page</a>`;
        }

        list += `</div>`;

        $(".chart-list").append(list);

    });

}

function getPlayingMovieCharts(x) {

    $(".chart-list").html("");

    axios.get('https://api.themoviedb.org/3/movie/now_playing?page=' + x + '&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {

        var list = `<ul>`;
        list += `<h4>Now playing</h4>`;
        let word = "";

        for (i = 0; i <= response.data.results.length-1; i++) {

            if (response.data.results[i].vote_count == 1) {
                word = "vote";
            } else {
                word = "votes";
            }

            list += `<a onclick="movieSelected(${response.data.results[i].id})" href='#'><li id="charts-list-item"><img class="charts-list-poster" src='${response.data.results[i].poster_path != null ? "https://image.tmdb.org/t/p/w200" + response.data.results[i].poster_path : "img/poster-blank.jpg"}'>`;
            list += `<p class="charts-list-title">${response.data.results[i].title}</p>`;
            list += `<div class="charts-list-score"><i id="charts-list-star" class="fas fa-star"></i><span class="vote-average">${response.data.results[i].vote_average}</span><span class="vote-count">(${response.data.results[i].vote_count + ' ' + word})</span></div></li></a>`;
        }

        list += `</ul>`;

        list += `<div class="page-nav">`
        list += `<p>Page ${response.data.page} out of ${response.data.total_pages}</p>`;

        if (x == 1 && response.data.total_pages > 1) {
            list += `<a href="#" onclick="getPlayingMovieCharts(${x+1})">Next page</a>`;
        } else if (x > 1 && response.data.total_pages > 1) {
            list += `<a href="#" onclick="getPlayingMovieCharts(${x-1})">Previous page</a>`;
            list += `<a href="#" onclick="getPlayingMovieCharts(${x+1})">Next page</a>`;
        } else {
            list += `<a href="#" onclick="getPlayingMovieCharts(${x-1})">Previous page</a>`;
        }

        list += `</div>`;

        $(".chart-list").append(list);

    });

}

function getUpcomingMovieCharts(x) {

    $(".chart-list").html("");

    axios.get('https://api.themoviedb.org/3/movie/upcoming?page=' + x + '&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {

        var list = `<ul>`;
        list += `<h4>Upcoming</h4>`;
        let word = "";

        for (i = 0; i <= response.data.results.length-1; i++) {

            if (response.data.results[i].vote_count == 1) {
                word = "vote";
            } else {
                word = "votes";
            }

            list += `<a onclick="movieSelected(${response.data.results[i].id})" href='#'><li id="charts-list-item"><img class="charts-list-poster" src='${response.data.results[i].poster_path != null ? "https://image.tmdb.org/t/p/w200" + response.data.results[i].poster_path : "img/poster-blank.jpg"}'>`;
            list += `<p class="charts-list-title">${response.data.results[i].title}</p>`;
            list += `<div class="charts-list-score"><i id="charts-list-star" class="fas fa-star"></i><span class="vote-average">${response.data.results[i].vote_average}</span><span class="vote-count">(${response.data.results[i].vote_count + ' ' + word})</span></div></li></a>`;
        }

        list += `</ul>`;

        list += `<div class="page-nav">`
        list += `<p>Page ${response.data.page} out of ${response.data.total_pages}</p>`;

        if (x == 1 && response.data.total_pages > 1) {
            list += `<a href="#" onclick="getUpcomingMovieCharts(${x+1})">Next page</a>`;
        } else if (x > 1 && response.data.total_pages > 1) {
            list += `<a href="#" onclick="getUpcomingMovieCharts(${x-1})">Previous page</a>`;
            list += `<a href="#" onclick="getUpcomingMovieCharts(${x+1})">Next page</a>`;
        } else {
            list += `<a href="#" onclick="getUpcomingMovieCharts(${x-1})">Previous page</a>`;
        }

        list += `</div>`;

        $(".chart-list").append(list);

    });

}

function getMovies() {


    /* HOME PAGE */


    var chart2 = [];
    var chart3 = [];

    axios.get('https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {

        var trending = '<ul>';
        let word = "";
                    
        for (i = 0; i <= 7; i++) {

            if (response.data.results[i].vote_count == 1) {
                word = "vote";
            } else {
                word = "votes";
            }
            
            trending += `<a onclick="movieSelected(${response.data.results[i].id})" href='#'><li id="charts-item"><img onlick="movieSelected(${response.data.results[i].id})" class="charts-poster" src='https://image.tmdb.org/t/p/w200${response.data.results[i].poster_path}'>`;
            trending += `<p class="charts-title">${response.data.results[i].title}</p>`; 
            trending += `<div class="charts-score"><i id="charts-star" class="fas fa-star"></i><span class="vote-average">${response.data.results[i].vote_average}</span><span class="vote-count">(${response.data.results[i].vote_count + " " + word})</span></div></li></a>`;
                        
        }
                    
        trending += '</ul>';
        trending += '<a href="trending.html" class="charts-more">More trending ></a>';
                    
        $(".trending").append(trending);

    })
    .catch((err) => {
        console.log(err);
    });

    axios.get('https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {

        var now_playing = `<ul>`;
        let word = "";
                    
        for (i = 0; i <= 7; i++) {

            if (response.data.results[i].vote_count == 1) {
                word = "vote";
            } else {
                word = "votes";
            }
            
            now_playing += `<a onclick="movieSelected(${response.data.results[i].id})" href='#'><li id="charts-item"><img class="charts-poster" src='https://image.tmdb.org/t/p/w200${response.data.results[i].poster_path}'>`;
            now_playing += `<p class="charts-title">${response.data.results[i].title}</p>`; 
            now_playing += `<div class="charts-score"><i id="charts-star" class="fas fa-star"></i><span class="vote-average">${response.data.results[i].vote_average}</span><span class="vote-count">(${response.data.results[i].vote_count + " " + word})</span></div></li></a>`;
            chart2.push(response.data.results[i].id);
                        
        }
                    
        now_playing += `</ul>`;
        now_playing += '<a href="now_playing.html" class="charts-more">More playing ></a>'
                    
        $(".now-playing").append(now_playing);

    })
    .catch((err) => {
        console.log(err);
    });

    axios.get('https://api.themoviedb.org/3/movie/upcoming?page=1&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {

        var upcoming = ``;
        let word = "";
        upcoming += `<ul>`;
        
        for(let i = 0; i <= 7; i++) {

            if (response.data.results[i].vote_count == 1) {
                word = "vote";
            } else {
                word = "votes";
            }
                
            upcoming += `<a onclick="movieSelected(${response.data.results[i].id})" href='#'><li id="charts-item"><img class="charts-poster" src='https://image.tmdb.org/t/p/w200${response.data.results[i].poster_path}'>`;
            upcoming += `<p class="charts-title">${response.data.results[i].title}</p>`; 
            upcoming += `<div class="charts-score"><i id="charts-star" class="fas fa-star"></i><span class="vote-average">${response.data.results[i].vote_average}</span><span class="vote-count">(${response.data.results[i].vote_count + " " + word})</span></div></li></a>`;
            chart3.push(response.data.results[i].id);                
        }
                    
        upcoming += `</ul>`;
        upcoming += '<a href="upcoming.html" class="charts-more">More upcoming ></a>'
                    
        $(".upcoming").append(upcoming);

    })
    .catch((err) => {
        console.log(err);
    });
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