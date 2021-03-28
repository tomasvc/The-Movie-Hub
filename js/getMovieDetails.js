function getMovie() {
    let movieId = sessionStorage.getItem("movieId");

    /* TOP */

    axios
        .get(
            "https://api.themoviedb.org/3/movie/" +
                movieId +
                "?api_key=4f3fdbd8c5943719506e53611dd7be34"
        )
        .then((response) => {
            let movie = response.data;
            let genres = `<ul class="genres">`;
            for (let i = 0; i <= movie.genres.length - 1; i++) {
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

            let date = movie.release_date.substring(0, 4);

            let img = `<div class="img" onLoad="fadeIn(this)"></div>`;

            $(".backdrop").append(img);

            $(".img").css(
                "background-image",
                "url(https://image.tmdb.org/t/p/original" + movie.backdrop_path
            );

            string += `
                    <div class="details-left">
                        <img class="img-responsive" src="${
                            movie.poster_path != undefined
                                ? "https://image.tmdb.org/t/p/w400" +
                                  movie.poster_path
                                : "img/poster-blank.jpg"
                        }" height="250">
                    </div>
                    <div class="details-right">
                        <h3 class="title">${
                            movie.title
                        }<span class="date">(${date})</span></h3>
                        <div class="score"><i class="fas fa-star"></i><span id="score-number">${
                            movie.vote_average
                        }</span>
                        <span class="vote-count selected-vote-count">${
                            movie.vote_count + " " + word
                        }</span></div>
                        ${genres}
                        <div class="overview"><p>${movie.overview}</p></div>
                    </div>
            `;

            $(document).ready(() => {
                $(".top-details").append(string);
                $("title").html(movie.title + " &ndash; The Movie Hub");
            });
        })
        .catch((err) => {
            console.log(err);
        });

    /* DIRECTOR AND SCREENWRITER */

    axios
        .get(
            "https://api.themoviedb.org/3/movie/" +
                movieId +
                "/credits?api_key=4f3fdbd8c5943719506e53611dd7be34"
        )
        .then((response) => {
            let movie = response.data;
            let crew = ``;
            let directors = `<ul class="directors">`;
            let writers = `</ul class="writers">`;

            for (let i = 0; i <= movie.crew.length - 1; i++) {
                if (movie.crew[i].job == "Director") {
                    directors += `<li class="top-crew-name"><a href="#" onclick="personSelected(${movie.crew[i].id})">${movie.crew[i].name}</a></li>`;
                }
            }

            directors += `</ul>`;

            for (let i = 0; i <= movie.crew.length - 1; i++) {
                if (
                    movie.crew[i].job == "Writer" ||
                    movie.crew[i].job == "Screenplay" ||
                    movie.crew[i].job == "Novel" ||
                    movie.crew[i].job == "Author"
                ) {
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
            </div>`;

            setTimeout(function () {
                $(".overview").append(crew);
            }, 200)
            
        })
        .catch((err) => {
            console.log(err);
        });

    /* IMAGES */

    axios
        .get(
            "https://api.themoviedb.org/3/movie/" +
                movieId +
                "/images?api_key=4f3fdbd8c5943719506e53611dd7be34"
        )
        .then((response) => {
            let images = response.data;
            let string = ``;
            let modalString = ``;

            // get at most 9 images from database if present

            string += `
                        <h4 class="images-header">Images</h4>
                        <span class="arrow arrow-left" onclick="getElementById('imageSlider').scrollBy(-520, 0)"><</span>
                            <ul id="imageSlider">`;

            for (let i = 0; i <= 5; i++) {
                string += `<li><img src="https://image.tmdb.org/t/p/w300/${
                    images.backdrops[i].file_path
                }" onclick="openModal();currentSlide(${i + 1})"></li>`;
            }
            string += `
                                <li><img src="https://image.tmdb.org/t/p/w300/${images.posters[0].file_path}" onclick="openModal();currentSlide(7)" height="173"></li>
                                <li><img src="https://image.tmdb.org/t/p/w300/${images.posters[1].file_path}" onclick="openModal();currentSlide(8)" height="173"></li>
                                <li><img src="https://image.tmdb.org/t/p/w300/${images.posters[2].file_path}" onclick="openModal();currentSlide(9)" height="173"></li>
                            </ul><span class="arrow arrow-right" onclick="getElementById('imageSlider').scrollBy(520, 0)">></span>
                        `;

            // create an image gallery

            modalString += `
                            <span class="close cursor" onclick="closeModal()">&times;</span>
                            <div class="modal-content">`;
            for (let i = 0; i <= 5; i++) {
                modalString += `<div class="slides">
                                                    <img src="https://image.tmdb.org/t/p/original/${images.backdrops[i].file_path}" style="width: 100%">
                                                </div>`;
            }

            modalString += `
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

            $(document).ready(() => {
                $(".images").append(string);
                $(".modal").append(modalString);
            });
        })
        .catch((err) => {
            let string = ``;
            string += `<h4 class="images-header">Images</h4>
                    <p class="error-message">No images available.</p>`;
            $(".images").append(string);
        });

    /* VIDEOS */

    axios
        .get(
            "https://api.themoviedb.org/3/movie/" +
                movieId +
                "/videos?api_key=4f3fdbd8c5943719506e53611dd7be34"
        )
        .then((response) => {
            let video = response.data;
            let string = ``;
            let videos = ``;

            // get at most 6 videos from database if present
            if (video.results.length != 0) {
                for (let i = 0; i <= 6; i++) {
                    if (video.results[i] !== undefined) {
                        videos += `<li><iframe height="173" frameborder="0" allowfullscreen src="https://www.youtube.com/embed/${video.results[i].key}"></iframe></li>`;
                    } else {
                        break;
                    }
                }
                string += `
                <h4 class="videos-header">Videos</h4>
                <span class="arrow arrow-left" onclick="getElementById('videoSlider').scrollBy(-520, 0)"><</span>
                <ul id="videoSlider">`;
                string += videos;
                string += `</ul><span class="arrow arrow-right" onclick="getElementById('videoSlider').scrollBy(520, 0)">></span>`;

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

    axios
        .get(
            "https://api.themoviedb.org/3/movie/" +
                movieId +
                "/credits?api_key=4f3fdbd8c5943719506e53611dd7be34"
        )
        .then((response) => {
            data = response.data;

            let string = ``;
            let cast = ``;

            if (data.cast.length == 0) {
                cast += `<p class="error-message">No cast information available</p>`;
            }

            // get top 8 cast members from database
            for (let i = 0; i <= 7; i++) {
                if (data.cast[i] !== undefined) {
                    cast += `<li>
                                <div>  
                                <a href="#" onclick="personSelected(${
                                    data.cast[i].id
                                })">
                                    <img src="${
                                        data.cast[i].profile_path != null
                                            ? "https://image.tmdb.org/t/p/w138_and_h175_face/" +
                                              data.cast[i].profile_path
                                            : "img/avatar.jpg"
                                    }">
                                </a>
                                </div>
                                <div>
                                <a href="#" onclick="personSelected(${
                                    data.cast[i].id
                                })">
                                    <p class="actor">${data.cast[i].name}</p>
                                </a>
                                <p class="character">${
                                    data.cast[i].character
                                }</p>
                                </div>
                            </li>`;
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
            let string = `
                <h4 class="cast-header">Top Cast</h4>
                <p class="error-message black-text">No cast information available.</p>
            `;
            $(".cast-list").append(string);
            console.log("Error fetching cast: " + err);
        });

    /* REVIEWS */

    axios
        .get(
            "https://api.themoviedb.org/3/movie/" +
                movieId +
                "/reviews?api_key=4f3fdbd8c5943719506e53611dd7be34&language=en-US&page=1"
        )
        .then((response) => {
            data = response.data;
            let string = `<h4 class="reviews-header">Reviews</h4>`;
            let reviewers = ``;

            // get full list of reviews from database
            if (data.results.length != 0) {
                string += `<h6 class="reviews-source">From The Movie Database</h6>`;

                reviewers += `<ul>`;

                for (let i = 0; i <= data.results.length - 1; i++) {
                    reviewers += `<li><div><a class="author" href="${data.results[i].url}">${data.results[i].author}</a></div><p class="content">${data.results[i].content}</p></li>`;
                }

                reviewers += `</ul>`;
            } else {
                reviewers += `<p class="error-message black-text">No reviews available.</p>`;
            }

            string += reviewers;

            $(".reviews").append(string);
        })
        .catch((err) => {
            let string = `<h4 class="reviews-header">Reviews</h4>
                        <p class="error-message black-text">No reviews available.</p>`;

            $(".reviews").append(string);
            console.log("Error fetching reviews: " + err);
        });

    /* RECOMMENDATIONS */

    axios
        .get(
            "https://api.themoviedb.org/3/movie/" +
                movieId +
                "/recommendations?api_key=4f3fdbd8c5943719506e53611dd7be34&page=1"
        )

        .then((response) => {
            data = response.data;

            // get 5 recommended movies from database
            let movies = ``;

            if (data.results.length != 0) {
                for (let i = 0; i <= 5; i++) {
                    if (data.results[i] !== undefined) {
                        movies += `<li><a href="#" onclick="movieSelected(${
                            data.results[i].id
                        })">
                                    <img src="${
                                        data.results[i].backdrop_path != null
                                            ? "https://image.tmdb.org/t/p/w300/" +
                                              data.results[i].backdrop_path
                                            : "img/blank_image.png"
                                    }" width="300">
                                    <div>
                                        <p>${data.results[i].title}</p>
                                        <i class="fas fa-star slider-star"></i>
                                        <span class="slider-rating">${
                                            data.results[i].vote_average
                                        }</span>
                                        <span class="slider-votes">(${
                                            data.results[i].vote_count
                                        } votes)</span>                                
                                    </div></a></li>`;
                    } else {
                        break;
                    }
                }

                let string = ``;

                string += `
                    <h4 class="slider-header">Recommended</h4>
                    <span class="white-arrow arrow-left" onclick="getElementById('recommendedSlider').scrollBy(-520, 0)"><</span>
                    <ul id="recommendedSlider">`;
                string += movies;
                string += `</ul><span class="white-arrow arrow-right" onclick="getElementById('recommendedSlider').scrollBy(520, 0)">></span>`;

                $(".recommendations").append(string);
            } else {
                let string = ``;

                string += `<h4 class="slider-header">Recommended</h4>
                            <p class="error-message black-text">No recommendations available.</p>`;

                $(".recommendations").append(string);
            }
        })
        .catch((err) => {
            let string = `<h4 class="slider-header">Recommended</h4>
                        <p class="error-message black-text">No recommendations available.</p>`;

            $(".recommendations").append(string);
            console.log("Error fetching recommendations: " + err);
        });
}
