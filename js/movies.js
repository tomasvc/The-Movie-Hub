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

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');


    /* TOP */


    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let movie = response.data;
        let genres = `<ul class="genres">`;
        for (let i = 0; i <= movie.genres.length-1; i++) {
            genres += `<li>${movie.genres[i].name}</li>`;
        }
        genres += `</ul>`;

        let string = ``;
        let word = "";

        if (movie.vote_count == 1) {
            word = "vote";
        } else {
            word = "votes";
        }

        let date = movie.release_date.substring(0,4);
        
            string += `
            <div class="backdrop" style="background-image:url('https://image.tmdb.org/t/p/original${movie.backdrop_path}');">
                <div class="backdrop-film"></div>
                <div class="top-details container">
                    <div class="details-left">
                        <img class="img-responsive" src="${movie.poster_path != undefined ? 'https://image.tmdb.org/t/p/w400' + movie.poster_path : 'img/poster-blank.jpg'}" height="250">
                    </div>
                    <div class="details-right">
                        <h3 class="title">${movie.title}<span class="date">(${date})</span></h3>
                        <h3 class="score"><i class="fas fa-star"></i><span id="score-number">${movie.vote_average}</span></h3>
                        <span class="vote-count">${movie.vote_count + " " + word}</span>
                        ${genres}
                        <p class="overview">${movie.overview}</p>
                    </div>
                </div>
            </div>
            `;

        $(".details").append(string);
        $("title").html(movie.title + " &ndash; The Movie Hub");

    })
    .catch((err) => {
        console.log(err);
    });



    /* DIRECTOR AND SCREENWRITER */



    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let movie = response.data;
        let crew = ``;
        let directors = `<ul class="directors">`;
        let writers = `</ul class="writers">`;

        for (let i = 0; i <= movie.crew.length-1; i++) {
            if (movie.crew[i].job == "Director") {
                directors += `<li class="top-crew-name"><a href="#" onclick="personSelected(${movie.crew[i].id})">${movie.crew[i].name}</a></li>`;
            }
        }

        directors += `</ul>`;

        for (let i = 0; i <= movie.crew.length-1; i++) {
            if (movie.crew[i].job == "Writer" || movie.crew[i].job == "Screenplay" || movie.crew[i].job == "Novel" || movie.crew[i].job == "Author") {
                writers += `<li class="top-crew-name"><a href="#" onclick="personSelected(${movie.crew[i].id})">${movie.crew[i].name}</a></li>`;
            }
        }

        writers += `</ul>`;

        crew += `<div class="crew">
                <div>
                    <p class="crew-title">Directing</p><br>
                    ${directors}
                </div>
                <div>
                    <p class="crew-title">Writing/Screenplay</p><br>
                    ${writers}
                </div>
            </div>`

        $(".overview").append(crew);

    })
    .catch((err) => {
        console.log(err);
    });



    /* IMAGES */



    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/images?api_key=4f3fdbd8c5943719506e53611dd7be34')
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
                                <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[3].file_path}" onclick="openModal();currentSlide(4)"></li>
                                <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[4].file_path}" onclick="openModal();currentSlide(5)"></li>
                                <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[5].file_path}" onclick="openModal();currentSlide(6)"></li>
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
        string += `<h4 class="images-header">Images</h4>
                    <p class="error-message">No images available.</p>`;
        $(".images").append(string);
    });



    /* VIDEOS */



    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/videos?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let video = response.data;
        let string = ``;
        let videos = ``;
        if(video.results.length != 0) {
            for(let i = 0; i <= 6; i++) {
                if(video.results[i] !== undefined) {
                    videos += `<li><iframe height="173" frameborder="0" allowfullscreen src="https://www.youtube.com/embed/${video.results[i].key}"></iframe></li>`;
                }  else {
                    break;
                }
            }
            string += `
                <h4 class="videos-header">Videos</h4>
                <ul>`
                string += videos;    
                string += `</ul> 
            `;

            $(".videos").append(string);

        } else {
            string += `<h4 class="videos-header">Videos</h4>
                        <p class="error-message">No videos available.</p>`;
            
            $(".videos").append(string);
        }           
            
    })
    .catch((err) => {
        let string = ``;
        string += `<h4 class="videos-header">Videos</h4>
                    <p class="error-message">No videos available.</p>`;
        $(".videos").append(string);
    });



    /* CAST */



    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let movie = response.data;
        let string = ``;
        let cast = ``;

        if (movie.cast.length == 0) {
            cast += `<p class="error-message">No cast information available</p>`;
        }

        for (let i = 0; i <= 6; i++) {
            if (movie.cast[i] !== undefined) {
                cast +=  `<li><a href="#" onclick="personSelected(${movie.cast[i].id})"><img src="${movie.cast[i].profile_path != null ? 'https://image.tmdb.org/t/p/w138_and_h175_face/' + movie.cast[i].profile_path : 'img/avatar.jpg'}"></a><a href="#" onclick="personSelected(${movie.cast[i].id})"><p class="actor">${movie.cast[i].name}</p></a><p class="character">${movie.cast[i].character}</p></li>`;
            } else {
                break;
            }
        }

        string += `
        <h4 class="cast-header">Top Cast</h4>
            <ul>`;
            string += cast;    
        string += `</ul>`;
        string += `<a class="full-cast-link" href="#" onclick="creditsSelected(${movieId})">See full cast and crew</a>`;

    $(".cast-list").append(string);

    })
    .catch((err) => {
        let string  = ``;
        string += `
            <h4 class="cast-header">Top Cast</h4>
            <p class="error-message">No cast information available.</p>
        `;
        $(".cast-list").append(string);
    });



    /* REVIEWS */



    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/reviews?api_key=4f3fdbd8c5943719506e53611dd7be34&language=en-US&page=1')
    .then((response) => {
        let revs = response.data;

        let string = `
                    <h4 class="reviews-header">Reviews</h4>`;
        let reviewers = ``;

        if (revs.results.length != 0) {
            string += `<h6 class="reviews-source">From The Movie Database</h6>`;

            reviewers += `<ul>`;

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
        let string = `
                        <h4 class="reviews-header">Reviews</h4>
                        <p class="error-message">No reviews available.</p>`;
        
        $(".reviews").append(string);
    });






    /* RECOMMENDATIONS */


    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/recommendations?api_key=4f3fdbd8c5943719506e53611dd7be34&page=1')
    .then((response) => {
        let recommend = response.data;
        let movies = ``;
        if (recommend.results.length != 0){
        for (let i = 0; i <= 5; i++) {
            if (recommend.results[i] !== undefined) {
                movies += `<li><a href="#" onclick="movieSelected(${recommend.results[i].id})">
                            <img src="${recommend.results[i].backdrop_path != null ? "https://image.tmdb.org/t/p/w300/" + recommend.results[i].backdrop_path : "img/blank_image.png"}" width="300">
                            <div>
                                <p>${recommend.results[i].title}</p>
                                <i class="fas fa-star recommend-star"></i>
                                <span class="recommend-rating">${recommend.results[i].vote_average}</span>
                                <span class="recommend-votes">(${recommend.results[i].vote_count} votes)</span>                                
                            </div></a></li>`;
            } else {
                break;
            }
        }
        let string = ``;
        string += `
            <h4 class="recommendations-header">Recommended</h4>
            <ul col-8>`
            string += movies;    
            string += `</ul>`;

        $(".recommendations").append(string);

    } else {
        let string = ``;

        string += `<h4 class="recommendations-header">Recommended</h4>
                    <p class="error-message">No recommendations available.</p>`;

        $(".recommendations").append(string);
    }
    })
    .catch((err) => {
        let string = ``;

        string += `<h4 class="recommendations-header">Recommended</h4>
                    <p class="error-message">No recommendations available.</p>`;

        $(".recommendations").append(string);
    });
}







/* CAST & CREW LIST */


function getMovieCredits() {

    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let movie = response.data;
        let string = `<div><a href="#" onclick="movieSelected(${movieId})"><img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" class="credits-poster"></a></div>
        <div><a href="#" onclick="movieSelected(${movieId})"><p class="credits-title">${movie.title}</p></a><span class="credits-date">(${movie.release_date.substring(0,4)})</span>
        <p class="credits-head">Full Cast & Crew</p></div>`;

        $(".credits-header").append(string);

    });

    axios.get("https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=4f3fdbd8c5943719506e53611dd7be34")
    .then((response) => {
        let results = response.data;
        
        let crew = `<ul class="credits-director"><p class="credits-name">Directed by</p>`;

        function insertCredits(job_title) {
            if (results.crew.length != 0) {
                for (let i = 0; i <= results.crew.length-1; i++) {
                    if (results.crew[i].job == job_title) {
                        crew_more += `<li class="credits-crew-person"><a class="credits-person-name" href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                        <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                    }
                }
            }
        }

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].job == "Director") {
                    crew += `<li class="credits-crew-person"><a class="credits-person-name" href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a></li>`;
                }
            }
        }

        crew += `</ul><ul class="credits-writers"><p class="credits-name">Writing Credits</p>`


        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].department == "Writing") {
                    crew += `<li class="credits-crew-person"><a class="credits-person-name" href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        let cast = `<ul class="credits-cast"><p class="credits-name">Cast</p>`;

        if (results.cast.length != 0) {
            for (let i = 0; i <= results.cast.length-1; i++) {
                cast += `<li class="credits-person">
                <a href="#" onclick="personSelected(${results.cast[i].id})"><img src=${results.cast[i].profile_path != null ? "https://image.tmdb.org/t/p/w300/" + results.cast[i].profile_path : "img/avatar.jpg"}></a>
                <div>
                    <a href="#" onclick="personSelected(${results.cast[i].id})" class="top-crew-name">${results.cast[i].name}</a>
                    <p class="character-name">${results.cast[i].character}</p>
                </div>
                </li>`
            }
        }

        cast += `</ul>`;

        let crew_more = `<ul class="credits-section"><p class="credits-name">Producers</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].job == "Executive Producer" || results.crew[i].job == "Producer") {
                    crew_more += `<li class="credits-crew-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
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
                    crew_more += `<li class="credits-crew-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
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

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Costume & Make-Up</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].department == "Costume & Make-Up") {
                    crew_more += `<li class="credits-crew-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
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
                    crew_more += `<li class="credits-crew-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Art Department</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].department == "Art") {
                    crew_more += `<li class="credits-crew-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Sound Department</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].department == "Sound") {
                    crew_more += `<li class="credits-crew-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        crew_more += `</ul><ul class="credits-section"><p class="credits-name">Visual Effects</p>`;

        if (results.crew.length != 0) {
            for (let i = 0; i <= results.crew.length-1; i++) {
                if (results.crew[i].department == "Visual Effects") {
                    crew_more += `<li class="credits-crew-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
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
                    crew_more += `<li class="credits-crew-person"><a href="#" onclick="personSelected(${results.crew[i].id})">${results.crew[i].name}</a>
                    <span class="credits-job-title">(${results.crew[i].job})</span></li>`;
                }
            }
        }

        $(".cast-and-crew").append(crew);
        $(".cast-and-crew").append(cast);
        $(".cast-and-crew").append(crew_more);
    });

}