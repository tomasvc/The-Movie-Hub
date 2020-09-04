$(document).ready(() => {
    $("#searchbox").keypress(function(e) {
        if(e.keyCode == 13) {
            getValue($("#searchbox").val());
        }
    })
});

function getValue(val) {
    sessionStorage.setItem('query', val);
    window.location = 'results.html';
    return false;
}

function getResults(x) {
    $(".results").html("");
    let query = sessionStorage.getItem('query');
    axios.get('https://api.themoviedb.org/3/search/multi?api_key=4f3fdbd8c5943719506e53611dd7be34&language=en-US&query=' + query + '&page=' + x + '&include_adult=false')
    .then((response) => {
        let string = ``;
        let query_string = `<p class="query">Search results for '${query}'</p>`;
        console.log(response);
        $.each(response.data.results, (index, el) => {

            // Change name of function to call based on result type
            let select = "";
            let date = "";

            if (el.title == undefined || el.title == null) {
                return;
            }

            // Show release date if move, first air date if tv show
            if (el.release_date != undefined) {
                date = el.release_date.substring(0,4);
            } else if (el.first_air_date != undefined) {
                date = el.first_air_date.substring(0,4);
            } else {
                date = "";
            }

            // Identify type of result
            if (el.media_type == "movie") {
                select = "movieSelected";
            } else if (el.media_type == "tv") {
                select = "TVSelected";
            } else if (el.media_type == "person") {
                select = "personSelected";
            }      

            string += `
                <li class="results-item">
                    <a onclick="${select}(${el.id})" href="#"><img class="results-poster" src="${el.poster_path != undefined ? 'https://image.tmdb.org/t/p/w200' + el.poster_path : 'img/poster-blank.jpg'}" width="200" alt="${el.name || el.title || el.original_title}"></a>
                    <a class="item-title" onclick="${select}(${el.id})" href="#">${el.name || el.title || el.original_title}</a><span class="item-date">${date}</span>
                    <h3 class="item-score">${el.vote_average != undefined ? el.vote_average : ''}</h3>
                    <p class="item-overview">${el.overview || ''}</p>
                </li>
            `

            if (el.release_date == undefined || el.first_air_date == undefined) {
                $(".item-date").css({"display": "none"});
            }

        });
        string += `</ul>`;
        string += `<div class="page-nav">`
        string += `<p>Page ${response.data.page} out of ${response.data.total_pages}</p>`;

        if (x == 1 && response.data.total_pages > 1) {
            string += `<a href="#" onclick="getResults(${x+1})">Next page</a>`;
        } else if (x > 1 && response.data.total_pages > 1) {
            string += `<a href="#" onclick="getResults(${x-1})">Previous page</a>`;
            string += `<a href="#" onclick="getResults(${x+1})">Next page</a>`;
        } else {
            string += `<a href="#" onclick="getResults(${x-1})">Previous page</a>`;
        }

        string += `</div>`

        $(".results").append(query_string);
        $(".results").append(string);
    })
    .catch((err) => {
        console.log(err);
    });
}