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

function getTV() {


    /* TOP DETAILS */


    let TVId = sessionStorage.getItem('TVId');

    axios.get('https://api.themoviedb.org/3/tv/' + TVId + '?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let tv = response.data;
        let genres = `<ul class="genres">`;
        let seasons = ``;
        for (let i = 0; i <= tv.genres.length-1; i++) {
            genres += `<li>${tv.genres[i].name}</li>`;
        }
        genres += `</ul>`;

        if (tv.vote_count == 1) {
            word = "vote";
        } else {
            word = "votes";
        }

        for(let i = 0; i <= tv.seasons.length-1; i++) {
            seasons += `<option onclick="changeSeason()" value="${tv.seasons[i].name}">${tv.seasons[i].name}</option>`;
        }

        let string = ``;
        let date = tv.first_air_date.substring(0,4);
            string += `
                    <div class="backdrop" style="background-image:url('https://image.tmdb.org/t/p/original${tv.backdrop_path}');">
                        <div class="backdrop-film"></div>
                    <div class="top-details container">
                        <div class="details-left">
                            <img id="poster" src="${tv.poster_path != undefined ? 'https://image.tmdb.org/t/p/w400' + tv.poster_path : 'img/poster-blank.jpg'}" height="250">
                        </div>
                        <div class="details-right">
                            <h3 class="title">${tv.name}<span class="date">(${date})</span></h3>
                            <select id="seasons" class="seasons" onChange="changeSeason()">
                                <option value="placeholder">Select a season</option>
                                ${seasons}
                            </select><span id="air-date"></span>
                            <h3 class="score"><i class="fas fa-star"></i><span id="score-number">${tv.vote_average}</span></h3>
                            <span class="vote-count">${tv.vote_count + " " + word}</span>
                            ${genres}
                            <p id="overview" class="overview">${tv.overview}</p>
                        </div>
                    </div>
                </div>
            `;

        $(".details").append(string);
        $("title").html(tv.name + " &ndash; The Movie Hub");

    })
    .catch((err) => {
        console.log(err);
    });








    /* DIRECTOR & SCREENWRITER */


    axios.get('https://api.themoviedb.org/3/tv/' + TVId + '/credits?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let tv = response.data;
        let crew = ``;
        let count = 0;
        let writers = `</ul class="writers">`;

        for (let i = 0; i <= tv.crew.length-1; i++) {

            writers += `<li class="crew-name">${tv.created_by[0].name}</li>`;

            if (tv.crew[i].job == "Executive Producer" || tv.crew[i].job == "Writer" || tv.crew[i].job == "Screenplay") {
                writers += `<li class="crew-name">${tv.crew[i].name}</li>`;
                count++;
            }
        }

        writers += `</ul>`;

        crew += `<div class="crew">
            <div>`;
            if (count != 0) {
                crew += `<p class="crew-title">Created by</p><br>`;
                crew += writers;
            }
            crew += `</div>`;
        crew += `</div>`;

        $(".details-right").append(crew);

    })
    .catch((err) => {
        console.log(err);
    });








    /* IMAGES AND VIDEOS */


    axios.get('https://api.themoviedb.org/3/tv/' + TVId + '/images?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let images = response.data;
        let string = ``;
        let modalString = ``;
        string += `
                        <h4 class="images-header">Images</h4>
                        <ul>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[0].file_path}" onclick="openModal();currentSlide(1)"></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[1].file_path}" onclick="openModal();currentSlide(2)"></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[2].file_path}" onclick="openModal();currentSlide(3)"></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[3].file_path}" onclick="openModal();currentSlide(4)"></a></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[4].file_path}" onclick="openModal();currentSlide(5)"></a></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[5].file_path}" onclick="openModal();currentSlide(6)"></a></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.posters[0].file_path}" onclick="openModal();currentSlide(7)" height="173"></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.posters[1].file_path}" onclick="openModal();currentSlide(8)" height="173"></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.posters[2].file_path}" onclick="openModal();currentSlide(9)" height="173"></li>
                        </ul>
                    `;

        modalString += `
                            <span class="close cursor" onclick="closeModal()">&times;</span>
                            <div class="modal-content">

                                <div class="slides">
                                    <img src="https://image.tmdb.org/t/p/original/${images.backdrops[0].file_path}" style="width: 100%">
                                </div>
                                <div class="slides">
                                    <img src="https://image.tmdb.org/t/p/original/${images.backdrops[1].file_path}" style="width: 100%">
                                </div>
                                <div class="slides">
                                    <img src="https://image.tmdb.org/t/p/original/${images.backdrops[2].file_path}" style="width: 100%">
                                </div>
                                <div class="slides">
                                    <img src="https://image.tmdb.org/t/p/original/${images.backdrops[3].file_path}" style="width: 100%">
                                </div>
                                <div class="slides">
                                    <img src="https://image.tmdb.org/t/p/original/${images.backdrops[4].file_path}" style="width: 100%">
                                </div>
                                <div class="slides">
                                    <img src="https://image.tmdb.org/t/p/original/${images.backdrops[5].file_path}" style="width: 100%">
                                </div>
                                <div class="slides">
                                    <img src="https://image.tmdb.org/t/p/original/${images.posters[0].file_path}" style="width: 50%">
                                </div>
                                <div class="slides">
                                    <img src="https://image.tmdb.org/t/p/original/${images.posters[1].file_path}" style="width: 50%">
                                </div>
                                <div class="slides">
                                    <img src="https://image.tmdb.org/t/p/original/${images.posters[2].file_path}" style="width: 50%">
                                </div>

                                <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                                <a class="next" onclick="plusSlides(1)">&#10095;</a>
                            </div>
                    `;

        $(".images").append(string);
        $(".modal").append(modalString);

    })
    .catch((err) => {
        let string = ``;
        string += `
                        <h4 class="images-header">Images</h4>
                        <p class="error-message">No images available.</p>`;
        $(".images").append(string);
    });

    axios.get('https://api.themoviedb.org/3/tv/' + TVId + '/videos?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let video = response.data;

        let videos = ``;
        if (video.results.length != 0) {
        for(let i = 0; i <= 6; i++) {
            if(video.results[i] !== undefined) {
                videos += `<li><iframe height="173" frameborder="0" allowfullscreen src="https://www.youtube.com/embed/${video.results[i].key}"></iframe></li>`;
            } else {
                break;
            }
        }
        let string = ``;
            string += `
                <h4 class="videos-header">Videos</h4>
                <ul>`
                string += videos;    
                string += `</ul>
            `;

        $(".videos").append(string);

    } else {
        string += `
                    <h4 class="videos-header">Videos</h4>
                    <p class="error-message">No videos available.</p>`;
            
            $(".videos").append(string);
    }
            
    })
    .catch((err) => {
        string += `
                    <h4 class="videos-header">Videos</h4>
                    <p class="error-message">No videos available.</p>`;
            
        $(".videos").append(string);
    });









    /* CAST */


    axios.get('https://api.themoviedb.org/3/tv/' + TVId + '/credits?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let tv = response.data;
        let string = ``;
        let cast = ``;

        if (tv.cast.length == 0) {
            cast += `<p class="error-message">No cast information available</p>`;
        }
        
        for (let i = 0; i <= 6; i++) {
            if (tv.cast[i] !== undefined) {
                cast +=  `<li><a href="#" onClick="personSelected(${tv.cast[i].id})"><img src='https://image.tmdb.org/t/p/w138_and_h175_face/${tv.cast[i].profile_path}'></a><a href="#" onclick="personSelected(${tv.cast[i].id})"><p class="actor">${tv.cast[i].name}</p></a><p class="character">${tv.cast[i].character}</p></li>`;
            } else {
                break;
            }
        }
        string += `
        <h4 class="cast-header">Top Cast</h4>
            <ul>`
                string += cast;
            string += `</ul>
        `;
        string += `<a class="full-cast-link" href="#" onclick="creditsSelected(${TVId})">See full cast and crew</a>`;

    $(".cast-list").append(string);

    })
    .catch((err) => {
        console.log(err);
        let string  = ``;
        string += `
            <h4 class="cast-header">Top Cast</h4>
            <p class="error-message">No cast information available.</p>
        `;

        $(".cast").append(string);
    });








    /* REVIEWS */


    axios.get('https://api.themoviedb.org/3/tv/'+ TVId + '/reviews?api_key=4f3fdbd8c5943719506e53611dd7be34&language=en-US&page=1')
    .then((response) => {
        let revs = response.data;

        let string = `<h4 class="reviews-header">Reviews</h4>`;

        if (revs.results.length != 0) {
            string += `<h6 class="reviews-source">From The Movie Database</h6>`;

            let reviewers = `<ul>`;

            for (let i = 0; i <= revs.results.length-1; i++) {
                reviewers += `<li><div><a class="author" href="${revs.results[i].url}">${revs.results[i].author}</a></div><p class="content">${revs.results[i].content}</p></li>`;
            }

            reviewers += `</ul>`;
        } else {
            reviewers += `<p class="error-message">No reviews available.</p>`;
        }

        string += reviewers;

        $(".reviews").append(string);
    })
    .catch((err) => {
        let string  = ``;
        string += `
            <h4 class="reviews-header">Reviews</h4>
            <p class="error-message">No reviews available.</p>
        `;
        $(".reviews").append(string);
    });








    /* RECOMMENDATIONS */


    axios.get('https://api.themoviedb.org/3/tv/' + TVId + '/recommendations?api_key=4f3fdbd8c5943719506e53611dd7be34&page=1')
    .then((response) => {
        let recommend = response.data;
        let tv = ``;
        if (recommend.results.length != 0) {
            for (let i = 0; i <= 5; i++) {
                if (recommend.results[i] !== undefined) {
                    tv += `<li><a href="#" onclick="TVSelected(${recommend.results[i].id})">
                    <img src="https://image.tmdb.org/t/p/w300/${recommend.results[i].backdrop_path}">
                    <div>
                        <p>${recommend.results[i].name}</p>
                        <i class="fas fa-star recommend-star"></i>
                        <span>${recommend.results[i].vote_average}</span>
                        <span>(${recommend.results[i].vote_count} votes)</span>
                    </div></a></li>`;
                } else {
                    break;
                }
            }
        let string = ``;
        string += `
            <h4 class="recommendations-header">Recommended</h4>
            <ul col-8>`
            string += tv;    
            string += `</ul>
        `;

        $(".recommendations").append(string);

        } else {
            let string = ``;

            string += `
                            <h4 class="recommendations-header">Recommended</h4>
                            <p class="error-message">No recommendations available.</p>`;

            $(".recommendations").append(string);
        }

    })
    .catch((err) => {
        let string = ``;

        string += `
                        <h4 class="recommendations-header">Recommended</h4>
                        <p class="error-message">No recommendations available.</p>`;

        $(".recommendations").append(string);
    });

}

function getTVCredits() {

    let TVId = sessionStorage.getItem('TVId');

    axios.get('https://api.themoviedb.org/3/tv/' + TVId + '?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let tv = response.data;
        let string = `<div><a href="#" onclick="TVSelected(${TVId})"><img src="https://image.tmdb.org/t/p/w300/${tv.poster_path}" class="credits-poster"></a></div>
        <div><a href="#" onclick="TVSelected(${TVId})"><p class="credits-title">${tv.original_name}</p></a><span class="credits-date">(${tv.first_air_date.substring(0,4)})</span>
        <p class="credits-head">Full Cast & Crew</p></div>`;

        $(".credits-header").append(string);

    });

    axios.get("https://api.themoviedb.org/3/tv/" + TVId + "/credits?api_key=4f3fdbd8c5943719506e53611dd7be34")
    .then((response) => {
        let results = response.data;
        
        let crew = `<ul class="credits-director"><p class="credits-name">Directed by</p>`;

        function insertCredits(job_title) {
            if (results.crew.length != 0) {
                for (let i = 0; i <= results.crew.length-1; i++) {
                    if (results.crew[i].job == job_title) {
                        crew_more += `<li class="credits-person"><a class="credits-person-name" href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                        <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                    }
                }
            }
        }

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].job == "Director") {
                    crew += `<li class="credits-person"><a class="credits-person-name" href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a></li>`;
                }
            }
        }

        crew += `</ul><ul class="credits-writers"><p class="credits-name">Writing Credits</p>`


        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].department == "Writing") {
                    crew += `<li class="credits-person"><a class="credits-person-name" href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        let cast = `<ul class="credits-cast"><p class="credits-name">Cast</p>`;

        if (results.cast.length != 0) {
            for (let i = 0; i <= results.cast.length-1; i++) {
                cast += `<li class="credits-person">
                <a href="#" onclick="personSelected(${results.cast[i].id})"><img src="https://image.tmdb.org/t/p/w300/${results.cast[i].profile_path}"></a>
                <a href="#" onclick="personSelected(${results.cast[i].id})" class="top-crew-name">${results.cast[i].name}</a>
                <p class="character-name">${results.cast[i].character}</p>
                </li>`
            }
        }

        cast += `</ul>`;

        let crew_more = `<ul class="credits-section"><p class="credits-name">Producers</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].job == "Executive Producer" || results.crew[i].job == "Producer") {
                    crew_more += `<li class="credits-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Music</p>`;

        insertCredits("Original Music Composer");

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Editing</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].department == "Editing") {
                    crew_more += `<li class="credits-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Production Design</p>`;

        insertCredits("Production Design");

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Art Direction</p>`;

        insertCredits("Art Direction");

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Set Decoration</p>`;

        insertCredits("Set Decoration");

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Production Design</p>`;

        insertCredits("Production Design");

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Costume & Make-Up</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].department == "Costume & Make-Up") {
                    crew_more += `<li class="credits-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Production Management</p>`;

        insertCredits("Production Manager");

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Second Unit Director or Assistant Director</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].job == "Second Unit Director" || results.crew[i].job == "First Assistant Director" || results.crew[i].job == "Second Assistant Director" || results.crew[i].job == "Third Assistant Director") {
                    crew_more += `<li class="credits-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Art Department</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].department == "Art") {
                    crew_more += `<li class="credits-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Sound Department</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].department == "Sound") {
                    crew_more += `<li class="credits-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Visual Effects</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].department == "Visual Effects") {
                    crew_more += `<li class="credits-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Stunts</p>`;

        insertCredits("Stunts");

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Camera Department</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].department == "Camera") {
                    crew_more += `<li class="credits-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        $(".cast-and-crew").append(crew);
        $(".cast-and-crew").append(cast);
        $(".cast-and-crew").append(crew_more);
    });

}