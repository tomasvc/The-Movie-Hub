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