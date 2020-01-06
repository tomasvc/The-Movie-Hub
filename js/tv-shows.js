$(document).ready(() => {
    getTVs();
});

function getTVs() {
    axios.get('https://api.themoviedb.org/3/tv/popular?&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34&language=en-US&page=1')
    .then((response) => {

        var trending = '<ul>';
                    
        for (i = 0; i <= 4; i++) {
            
            trending += `<li><a onclick="TVSelected(${response.data.results[i].id})" href='#'><img src='https://image.tmdb.org/t/p/w200${response.data.results[i].poster_path}' height='170'></a>`;
            trending += `<a onclick="TVSelected(${response.data.results[i].id})" href='#'>${response.data.results[i].name}</a>`;
            trending += `<div><i class="fas fa-star chart-star"></i>${response.data.results[i].vote_average}<span>(${response.data.results[i].vote_count} votes)</span></div></li>`;
                        
        }
                    
        trending += '</ul>';
                    
        $(".trending").append(trending);

        $(".posters-list").append(string);

    })
    .catch((err) => {
        console.log(err);
    });

    axios.get('https://api.themoviedb.org/3/tv/on_the_air?page=1&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {

        var now_playing = `<ul>`;
                    
        for (i = 0; i <= 4; i++) {
            
            now_playing += `<li><a onclick="TVSelected(${response.data.results[i].id})" href='#'><img src='https://image.tmdb.org/t/p/w200${response.data.results[i].poster_path}' height='170'></a>`;
            now_playing += `<a onclick="TVSelected(${response.data.results[i].id})" href='#'>${response.data.results[i].name}</a>`;
            now_playing += `<div><i class="fas fa-star chart-star"></i>${response.data.results[i].vote_average}<span>(${response.data.results[i].vote_count} votes)</span></div></li>`;
                        
        }
                    
        now_playing += `</ul>`;
                    
        $(".now-playing").append(now_playing);

    })
    .catch((err) => {
        console.log(err);
    });

    axios.get('https://api.themoviedb.org/3/tv/airing_today?page=1&language=en-US&region=US&api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {

        var upcoming = `<ul>`;
                    
        for (i = 0; i <= 4; i++) {
            
            upcoming += `<li><a onclick="TVSelected(${response.data.results[i].id})" href='#'><img src='https://image.tmdb.org/t/p/w200${response.data.results[i].poster_path}' height='170'></a>`;
            upcoming += `<a onclick="TVSelected(${response.data.results[i].id})" href='#'>${response.data.results[i].name}</a>`;
            upcoming += `<div><i class="fas fa-star chart-star"></i>${response.data.results[i].vote_average}<span>(${response.data.results[i].vote_count} votes)</span></div></li>`;
                        
        }
                    
        upcoming += `</ul>`;
                    
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

function getTV() {
    let TVId = sessionStorage.getItem('TVId');

    axios.get('https://api.themoviedb.org/3/tv/' + TVId + '?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        console.log(response);
        let tv = response.data;
        let genres = `<ul class="genres">`;
        for (let i = 0; i <= tv.genres.length-1; i++) {
            genres += `<li>${tv.genres[i].name}</li>`;
        }
        genres += `</ul>`;
        let string = ``;
        let date = tv.first_air_date.substring(0,4);
            string += `
                    <div class="backdrop col-lg-12" style="background-image:url('https://image.tmdb.org/t/p/original${tv.backdrop_path}');">
                        <div class="backdrop-film col-lg-12"></div>
                        <div class="top-details container">
                            <div class="details-left col-lg-4">
                                <img src="https://image.tmdb.org/t/p/w400${tv.poster_path}" height="250">
                            </div>
                            <div class="details-right col-lg-8">
                                <h3 class="title">${tv.name}<span class="date">(${date})</span></h3>
                                <select class="seasons">
                                    <option value="placeholder">Select a season</option>
                                    <option value="${tv.seasons[0].name}">${tv.seasons[0].name}</option>
                                </select>
                                <div class="score-circle">
                                    <h3 class="score">${tv.vote_average}</h3>
                                </div>
                                <span class="vote-count">${tv.vote_count} votes</span>
                                ${genres}
                                <p class="overview">${tv.overview}</p>
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

    axios.get('https://api.themoviedb.org/3/tv/' + TVId + '/credits?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let tv = response.data;
        let crew = ``;
        let count = 0;
        let writers = `</ul class="writers">`;

        for (let i = 0; i <= tv.crew.length-1; i++) {
            if (tv.crew[i].job == "Writer" || tv.crew[i].job == "Screenplay" || tv.crew[i].job == "Novel" || tv.crew[i].job == "Author") {
                writers += `<li class="crew-name">${tv.crew[i].name}</li>`;
                count++;
            }
        }

        writers += `</ul>`;

        crew += `<div class="crew">
            <div>`;
            if (count != 0) {
                crew += `<p class="crew-title">Writing</p><br>`;
                crew += writers;
            }
            crew += `</div>`;
        crew += `</div>`;

        $(".details-right").append(crew);

    })
    .catch((err) => {
        console.log(err);
    });

    axios.get('https://api.themoviedb.org/3/tv/' + TVId + '/images?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let images = response.data;
        let string = ``;
        string += `
                        <h4 class="images-header">Images</h4>
                        <ul>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[0].file_path}"></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[1].file_path}"></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[2].file_path}"></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[3].file_path}"></a></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[4].file_path}"></a></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.backdrops[5].file_path}"></a></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.posters[0].file_path}" height="173"></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.posters[1].file_path}" height="173"></li>
                            <li><img src="https://image.tmdb.org/t/p/w300/${images.posters[2].file_path}" height="173"></li>
                        </ul>
                    `;

        $(".images").append(string);

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

    $(".cast").append(string);

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