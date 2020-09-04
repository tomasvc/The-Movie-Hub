function personSelected(id) {
    sessionStorage.setItem('personId', id);
    window.location = 'person.html';
    return false;
}

function getPeople(x) {

    axios.get('https://api.themoviedb.org/3/person/popular?api_key=4f3fdbd8c5943719506e53611dd7be34&language=en-US&page=' + x)
    .then((response) => {
        document.getElementById("people-list").innerHTML = "";

        let data = response.data;
        let string = ``;
        let navString = ``;

        for(let i = 0; i <= data.results.length-1; i++) {
            string += `
            <a href="#" onclick="personSelected(${data.results[i].id})"><div class="person">
                <img src="${data.results[i].profile_path != null ? "https://image.tmdb.org/t/p/w200" + data.results[i].profile_path : "img/avatar.jpg"}" width="200">
                <p>${data.results[i].name}</p>
            </div></a>
            `
            $(".people-list").append(string);
            string = ``;
            
        }

        navString += `<div class="page-nav">`
        navString += `<p>Page ${response.data.page} out of ${response.data.total_pages}</p>`;

        if (x == 1 && response.data.total_pages > 1) {
            navString += `<a href="#" onclick="getPeople(${x+1})">Next page</a>`;
        } else if (x > 1 && response.data.total_pages > 1) {
            navString += `<a href="#" onclick="getPeople(${x-1})">Previous page</a>`;
            navString += `<a href="#" onclick="getPeople(${x+1})">Next page</a>`;
        } else {
            navString += `<a href="#" onclick="getPeople(${x-1})">Previous page</a>`;
        }

        navString += `</div>`
        $(".people-list").append(navString);
    })
    .catch((err) => {
        console.log(err);
    });

}

function getPerson() {

    let personId = sessionStorage.getItem('personId');

    axios.get('https://api.themoviedb.org/3/person/' + personId + '?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let person = response.data;
        let string = ``;

        string += `
            <div class="info-left">
                <img id="person-profile" src=${person.profile_path != null ? "https://image.tmdb.org/t/p/original" + person.profile_path : "img/avatar.jpg"} height="400">
            </div>
            <div class="info-right">
                <h3 class="name">${person.name}</h3>
                <p class="birthday">${person.birthday != null ? 'Born: ' + person.birthday : ''}</p><p class="deathday">${person.deathday != null ? 'Died: ' + person.deathday : ''}</p>
                <p class="biography">${person.biography != null ? person.biography : 'No information available'}</p>
            </div>
        `;

        $(".person-details").append(string);
        $("title").html(person.name + " &ndash; The Movie Hub");

    })
    .catch((err) => {
        console.log(err);
    });

    axios.get("https://api.themoviedb.org/3/person/" + personId + "/external_ids?api_key=4f3fdbd8c5943719506e53611dd7be34")
    .then((response) => {
        let id = response.data;
        let string = ``;

        string += `
        <ul class="external-ids">
            ${id.facebook_id != null ? "<li class=\"id\"><a href=\"https://www.facebook.com/" + id.facebook_id + "\" target=\"_blank\"><i class=\"fab fa-facebook\"></i></a></li>" : ""}
            ${id.twitter_id != null ? "<li class=\"id\"><a href=\"https://www.twitter.com/" + id.twitter_id + "\" target=\"_blank\"><i class=\"fab fa-twitter\"></i></a></li>" : ""}
            ${id.instagram_id != null ? "<li class=\"id\"><a href=\"https://www.instagram.com/" + id.instagram_id + "\" target=\"_blank\"><i class=\"fab fa-instagram\"></i></a></li>" : ""}
            ${id.imdb_id != null ? "<li class=\"id\"><a href=\"https://www.imdb.com/name/" + id.imdb_id + "\" target=\"_blank\"><i class=\"fab fa-imdb\"></i></a></li>" : ""}
        </ul>
        `;

        $(".info-left").append(string);

    })
    .catch((err) => {
        console.log(err);
    });

    axios.get('https://api.themoviedb.org/3/person/' + personId + '/combined_credits?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let person = response.data;
        let string = ``;

        if(person.length != 0) {

            var titles = [];

            var cast = [];
            var crew = [];

            var obj = {
                title: '',
                backdrop: '',
                media_type: '',
                popularity: 0,
                rating: 0,
                votes: 0,
                id: 0
            }

            var popularity = 0;

            for(let i = 0; i <= 7; i++) {
                person.cast.forEach(el => {                 
                    if (el.popularity >= popularity && !cast.includes(el.title) && !cast.includes(el.name)) {
                        popularity = el.popularity;
                        obj.popularity = el.popularity;
                        obj.backdrop != null ? obj.backdrop = 'https://image.tmdb.org/t/p/w300' + el.backdrop_path : obj.backdrop = 'img/blank_image.png';
                        obj.media_type = el.media_type;
                        obj.media_type == 'movie' ? obj.title = el.title : obj.title = el.name;
                        obj.rating = el.vote_average;
                        obj.votes = el.vote_count; 
                        obj.id = el.id;        
                    } else {
                        return;
                    }
                    
                    cast.push(obj.title);

                });

                person.crew.forEach(el => {                   
                    if (el.popularity >= popularity && !crew.includes(el.title) && !crew.includes(el.name)) {
                        popularity = el.popularity;
                        obj.popularity = el.popularity;
                        obj.backdrop != null ? obj.backdrop = 'https://image.tmdb.org/t/p/w300' + el.backdrop_path : obj.backdrop = 'img/blank_image.png';
                        obj.media_type = el.media_type;
                        obj.media_type == 'movie' ? obj.title = el.title : obj.title = el.name;
                        obj.rating = el.vote_average;
                        obj.votes = el.vote_count; 
                        obj.id = el.id;        
                    }

                    crew.push(obj.title);

                });
                
                string += `
                <li class="featured-object">
                    <a href="#" onclick="${obj.media_type == "movie" ? "movieSelected(" + obj.id + ")" : "TVSelected(" + obj.id + ")"}">
                    <img src='${obj.backdrop}' width="300" height="170">
                    <div>
                        <p class="object-title">${obj.title}</p>
                        <i class="fas fa-star featured-star"></i>
                        <span class="object-rating">${obj.rating}</span>
                        <span class="object-votes">(${obj.votes} votes)</span>
                    </div></a>
                </li>
                `;

                $(".featured ul").append(string);
                string = ``;
                
                // Reset

                obj = {
                    title: '',
                    backdrop: '',
                    media_type: '',
                    popularity: 0,
                    rating: 0,
                    votes: 0,
                    id: 0
                }
                popularity = 0;
            }               
        }
    })
    .catch((err) => {
        console.log(err);
    });

}