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
            <div class="backdrop">
                <img class="backdrop-image" alt='backdrop' src="https://image.tmdb.org/t/p/original${movie.backdrop_path}"></img>
                <div class="backdrop-film"></div>
                <div class="top-details container">
                    <div class="details-left">
                        <img class="img-responsive" src="${movie.poster_path != undefined ? 'https://image.tmdb.org/t/p/w400' + movie.poster_path : 'img/poster-blank.jpg'}" height="250">
                    </div>
                    <div class="details-right">
                        <h3 class="title">${movie.title}<span class="date">(${date})</span></h3>
                        <h3 class="score"><i class="fas fa-star"></i><span id="score-number">${movie.vote_average}</span></h3>
                        <span class="vote-count selected-vote-count">${movie.vote_count + " " + word}</span>
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

                                <span class="prev" onclick="plusSlides(-1)">&#10094;</span>
                                <span class="next" onclick="plusSlides(1)">&#10095;</span>
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