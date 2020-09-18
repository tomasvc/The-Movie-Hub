$(document).ready(() => {
    getTVs();
});

function getTVs() {
    axios.get('https://api.themoviedb.org/3/tv/popular?&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34&language=en-US&page=1')
    .then((response) => {

        var trending = '<ul>';
        let word = "";
                    
        for (i = 0; i <= 7; i++) {

            if (response.data.results[i].vote_count == 1) {
                word = "vote";
            } else {
                word = "votes";
            }
            
            trending += `<a onclick="TVSelected(${response.data.results[i].id})" href='#'><li id="charts-item"><img class="charts-poster" src='${response.data.results[i].poster_path != null ? "https://image.tmdb.org/t/p/w200" + response.data.results[i].poster_path : "img/poster-blank.jpg"}'>`;
            trending += `<p class="charts-title">${response.data.results[i].name}</p>`;
            trending += `<div class="charts-score"><i id="charts-star" class="fas fa-star"></i><span class="vote-average">${response.data.results[i].vote_average}</span><span class="vote-count">(${response.data.results[i].vote_count + " " + word})</span></div></li></a>`;
                        
        }
                    
        trending += '</ul>';
        trending += '<a href="TV_trending.html" class="charts-more">More trending ></a>'
                    
        $(".trending").append(trending);

    })
    .catch((err) => {
        console.log(err);
    });

    axios.get('https://api.themoviedb.org/3/tv/on_the_air?page=1&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {

        var now_playing = `<ul>`;
        let word = "";
                    
        for (i = 0; i <= 7; i++) {

            if (response.data.results[i].vote_count == 1) {
                word = "vote";
            } else {
                word = "votes";
            }
            
            now_playing += `<a onclick="TVSelected(${response.data.results[i].id})" href='#'><li id="charts-item"><img class="charts-poster" src='${response.data.results[i].poster_path != null ? "https://image.tmdb.org/t/p/w200" + response.data.results[i].poster_path : "img/poster-blank.jpg"}'>`;
            now_playing += `<p class="charts-title">${response.data.results[i].name}</p>`;
            now_playing += `<div class="charts-score"><i id="charts-star" class="fas fa-star"></i><span class="vote-average">${response.data.results[i].vote_average}</span><span class="vote-count">(${response.data.results[i].vote_count + " " + word})</span></div></li></a>`;
                        
        }
                    
        now_playing += `</ul>`;
        now_playing += '<a href="TV_now_playing.html" class="charts-more">More playing ></a>'
                    
        $(".now-playing").append(now_playing);

    })
    .catch((err) => {
        console.log(err);
    });

    axios.get('https://api.themoviedb.org/3/tv/airing_today?page=1&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {

        var upcoming = `<ul>`;
        let word = "";
                    
        for (i = 0; i <= 7; i++) {

            if (response.data.results[i].vote_count == 1) {
                word = "vote";
            } else {
                word = "votes";
            }
            
            upcoming += `<a onclick="TVSelected(${response.data.results[i].id})" href='#'><li id="charts-item"><img class="charts-poster" src='${response.data.results[i].poster_path != null ? "https://image.tmdb.org/t/p/w200" + response.data.results[i].poster_path : "img/poster-blank.jpg"}'>`;
            upcoming += `<p class="charts-title">${response.data.results[i].name}</p>`;
            upcoming += `<div class="charts-score"><i id="charts-star" class="fas fa-star"></i><span class="vote-average">${response.data.results[i].vote_average}</span><span class="vote-count">(${response.data.results[i].vote_count + " " + word})</span></div></li></a>`;
                        
        }
                    
        upcoming += `</ul>`;
        upcoming += '<a href="TV_upcoming.html" class="charts-more">More upcoming ></a>'
                    
        $(".upcoming").append(upcoming);

    })
    .catch((err) => {
        console.log(err);
    });
}

function TVSelected(id) {
    sessionStorage.setItem('TVId', id);
    window.location = 'tv.html';
    return false;
}

function personSelected(id) {
    sessionStorage.setItem('personId', id);
    window.location = 'person.html';
    return false;
}

function creditsSelected(id) {
    sessionStorage.setItem('TVId', id);
    window.location = 'tv_credits.html';
    return false;
}

function changeSeason() {

    let TVId = sessionStorage.getItem('TVId');

    axios.get('https://api.themoviedb.org/3/tv/' + TVId + '?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let tv = response.data;

        var x = document.getElementById("seasons").value;
        for(let i = 0; i <= tv.seasons.length-1; i++) {
            if (tv.seasons[i].name == x) {
                document.getElementById("poster").src = "https://image.tmdb.org/t/p/w400" + tv.seasons[i].poster_path;
                document.getElementById("air-date").innerHTML = 'Air date: ' + tv.seasons[i].air_date;
                document.getElementById("overview").innerHTML = tv.seasons[i].overview;
            }
        }
        
    });
}

function getTrendingTVCharts(x) {

    $(".chart-list").html("");

    axios.get('https://api.themoviedb.org/3/tv/popular?page=' + x + '&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
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

            list += `<a onclick="TVSelected(${response.data.results[i].id})" href='#'><li id="charts-list-item"><img class="charts-list-poster" src='https://image.tmdb.org/t/p/w200${response.data.results[i].poster_path}'>`;
            list += `<p class="charts-list-title">${response.data.results[i].name}</p>`;
            list += `<div class="charts-list-score"><i id="charts-list-star" class="fas fa-star"></i><span class="vote-average">${response.data.results[i].vote_average}</span><span class="vote-count">(${response.data.results[i].vote_count + ' ' + word})</span></div></li></a>`;
        }

        list += `</ul>`;

        list += `<div class="page-nav">`
        list += `<p>Page ${response.data.page} out of ${response.data.total_pages}</p>`;

        if (x == 1 && response.data.total_pages > 1) {
            list += `<a href="#" onclick="getTrendingTVCharts(${x+1})">Next page</a>`;
        } else if (x > 1 && response.data.total_pages > 1) {
            list += `<a href="#" onclick="getTrendingTVCharts(${x-1})">Previous page</a>`;
            list += `<a href="#" onclick="getTrendingTVCharts(${x+1})">Next page</a>`;
        } else {
            list += `<a href="#" onclick="getTrendingTVCharts(${x-1})">Previous page</a>`;
        }

        list += `</div>`;

        $(".chart-list").append(list);

    });

}

function getPlayingTVCharts(x) {

    $(".chart-list").html("");

    axios.get('https://api.themoviedb.org/3/tv/on_the_air?page=' + x + '&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {

        var list = `<ul>`;
        list += `<h4>On the air</h4>`;
        let word = "";

        for (i = 0; i <= response.data.results.length-1; i++) {

            if (response.data.results[i].vote_count == 1) {
                word = "vote";
            } else {
                word = "votes";
            }

            list += `<a onclick="TVSelected(${response.data.results[i].id})" href='#'><li id="charts-list-item"><img class="charts-list-poster" src='https://image.tmdb.org/t/p/w200${response.data.results[i].poster_path}'>`;
            list += `<p class="charts-list-title">${response.data.results[i].name}</p>`;
            list += `<div class="charts-list-score"><i id="charts-list-star" class="fas fa-star"></i><span class="vote-average">${response.data.results[i].vote_average}</span><span class="vote-count">(${response.data.results[i].vote_count + ' ' + word})</span></div></li></a>`;
        }

        list += `</ul>`;

        list += `<div class="page-nav">`
        list += `<p>Page ${response.data.page} out of ${response.data.total_pages}</p>`;

        if (x == 1 && response.data.total_pages > 1) {
            list += `<a href="#" onclick="getPlayingTVCharts(${x+1})">Next page</a>`;
        } else if (x > 1 && response.data.total_pages > 1) {
            list += `<a href="#" onclick="getPlayingTVCharts(${x-1})">Previous page</a>`;
            list += `<a href="#" onclick="getPlayingTVCharts(${x+1})">Next page</a>`;
        } else {
            list += `<a href="#" onclick="getPlayingTVCharts(${x-1})">Previous page</a>`;
        }

        list += `</div>`;

        $(".chart-list").append(list);

    });

}

function getUpcomingTVCharts(x) {

    $(".chart-list").html("");

    axios.get('https://api.themoviedb.org/3/tv/airing_today?page=' + x + '&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {

        var list = `<ul>`;
        list += `<h4>Airing today</h4>`;
        let word = "";

        for (i = 0; i <= response.data.results.length-1; i++) {

            if (response.data.results[i].vote_count == 1) {
                word = "vote";
            } else {
                word = "votes";
            }

            list += `<a onclick="TVSelected(${response.data.results[i].id})" href='#'><li id="charts-list-item"><img class="charts-list-poster" src='https://image.tmdb.org/t/p/w200${response.data.results[i].poster_path}'>`;
            list += `<p class="charts-list-title">${response.data.results[i].name}</p>`;
            list += `<div class="charts-list-score"><i id="charts-list-star" class="fas fa-star"></i><span class="vote-average">${response.data.results[i].vote_average}</span><span class="vote-count">(${response.data.results[i].vote_count + ' ' + word})</span></div></li></a>`;
        }

        list += `</ul>`;

        list += `<div class="page-nav">`
        list += `<p>Page ${response.data.page} out of ${response.data.total_pages}</p>`;

        if (x == 1 && response.data.total_pages > 1) {
            list += `<a href="#" onclick="getUpcomingTVCharts(${x+1})">Next page</a>`;
        } else if (x > 1 && response.data.total_pages > 1) {
            list += `<a href="#" onclick="getUpcomingTVCharts(${x-1})">Previous page</a>`;
            list += `<a href="#" onclick="getUpcomingTVCharts(${x+1})">Next page</a>`;
        } else {
            list += `<a href="#" onclick="getUpcomingTVCharts(${x-1})">Previous page</a>`;
        }

        list += `</div>`;

        $(".chart-list").append(list);

    });

}