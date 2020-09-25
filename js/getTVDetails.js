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
                    <div class="backdrop">
                        <img class="backdrop-image" alt='backdrop' src="https://image.tmdb.org/t/p/original${tv.backdrop_path}"></img>
                        <div class="backdrop-film"></div>
                    <div class="top-details container">
                        <div class="details-left">
                            <img id="poster" class="img-responsive" src="${tv.poster_path != undefined ? 'https://image.tmdb.org/t/p/w400' + tv.poster_path : 'img/poster-blank.jpg'}" height="250">
                        </div>
                        <div class="details-right">
                            <h3 class="title">${tv.name}<span class="date">(${date})</span></h3>
                            <select id="seasons" class="seasons" onChange="changeSeason()">
                                <option value="placeholder">Select a season</option>
                                ${seasons}
                            </select><span id="air-date"></span>
                            <h3 class="score"><i class="fas fa-star"></i><span id="score-number">${tv.vote_average}</span></h3>
                            <span class="vote-count selected-vote-count">${tv.vote_count + " " + word}</span>
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

                                <span class="prev" onclick="plusSlides(-1)">&#10094;</span>
                                <span class="next" onclick="plusSlides(1)">&#10095;</span>
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