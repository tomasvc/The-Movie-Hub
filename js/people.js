function personSelected(id) {
    sessionStorage.setItem('personId', id);
    window.location = 'person.html';
    return false;
}

function getPerson() {

    let personId = sessionStorage.getItem('personId');

    axios.get('https://api.themoviedb.org/3/person/' + personId + '?api_key=4f3fdbd8c5943719506e53611dd7be34')
    .then((response) => {
        let person = response.data;
        let string = ``;

        string += `
        <div class="person-details container">
            <div class="details-left col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <img src="https://image.tmdb.org/t/p/original${person.profile_path}" height="400">
            </div>
            <div class="details-right col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <h3 class="name">${person.name}</h3>
                <i class="fas fa-fire"></i><span class="popularity">${person.popularity}</span>
                <p class="birthday">Born: ${person.birthday}</p><span class="deathday">${person.deathday != null ? 'Died: ' + person.deathday : ''}</span>
                <p class="biography">${person.biography}</p>
            </div>
        </div>
        `;

        $(".details").append(string);
        $("title").html(person.name + " &ndash; The Movie Hub");

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
                    if (el.popularity >= popularity && !titles.includes(el.title)) {
                        popularity = el.popularity;
                        obj.popularity = el.popularity;
                        obj.title = el.title;
                        obj.backdrop = 'https://image.tmdb.org/t/p/w300' + el.backdrop_path;
                        obj.media_type = el.media_type;
                        obj.rating = el.vote_average;
                        obj.votes = el.vote_count; 
                        obj.id = el.id;        
                    }
                });
                    
                titles.push(obj.title);
                
                string += `
                <li class="featured-object">
                    <a href="#" onclick="${obj.media_type == "movie" ? "movieSelected(" + obj.id + ")" : "TVSelected(" + obj.id + ")"}">
                    <img src='${obj.backdrop || "img/blank_image.png"}' width="300" height="170">
                    <div>
                        <p class="object-title">${obj.media_type = "movie" ? obj.title : obj.name}</p>
                        <i class="fas fa-star featured-star"></i>
                        <span class="object-rating">${obj.rating}</span>
                        <span class="object-votes">(${obj.votes} votes)</span>
                    </div></a>
                </li>
                `;

                $(".featured ul").append(string);
                string = ``;

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