$(document).ready(() => {
    $("#searchbox").keypress(function (e) {
        if (e.keyCode == 13) {
            getValue($("#searchbox").val());
        }
    });
});

function getValue(val) {
    sessionStorage.setItem("query", val);
    window.location = "results.html";
    return false;
}

function getResults(x) {
    $(".results").html("");

    let query = sessionStorage.getItem("query");
    axios
        .get(
            "https://api.themoviedb.org/3/search/multi?api_key=4f3fdbd8c5943719506e53611dd7be34&language=en-US&query=" +
                query +
                "&page=" +
                x +
                "&include_adult=false"
        )

        .then((results) => {
            data = results.data;
            console.log(data.results)

            let string = ``;
            let query_string = `<p class="query">Search results for '${query}'</p>`;
            string += `<ul>`;
            data.results.forEach((el) => {
                // Change name of function to call based on result type
                let select = "";
                let date = "";

                if (el.title == undefined || el.title == null) {
                    return;
                }

                // Identify type of result
                if (el.media_type == "movie") {
                    select = "movieSelected";

                    string += `
                    <li class="results-item">
                        <div class="left">
                            <a onclick="${select}(${
                    el.id
                })" href="#"><img class="results-poster" src="${
                    el.poster_path != undefined
                        ? "https://image.tmdb.org/t/p/w200" + el.poster_path
                        : "img/poster-blank.jpg"
                }" width="200" alt="${
                    el.title || el.original_title
                }"></a>
                        </div>
                        <div class="right">
                            <a class="item-title" onclick="${select}(${
                    el.id
                })" href="#">${
                    el.title || el.original_title
                }</a><span class="item-date">(${date})</span>
                            <p class="item-overview">${el.overview || ""}</p>
                        </div>
                    </li>
                `;

                } else if (el.media_type == "tv") {
                    select = "TVSelected";

                    string += `
                    <li class="results-item">
                        <div class="left">
                            <a onclick="${select}(${
                    el.id
                })" href="#"><img class="results-poster" src="${
                    el.poster_path != undefined
                        ? "https://image.tmdb.org/t/p/w200" + el.poster_path
                        : "img/poster-blank.jpg"
                }" width="200" alt="${
                    el.title || el.original_title
                }"></a>
                        </div>
                        <div class="right">
                            <a class="item-title" onclick="${select}(${
                    el.id
                })" href="#">${
                    el.title || el.original_title
                }</a><span class="item-date">(${date})</span>
                            <p class="item-overview">${el.overview || ""}</p>
                        </div>
                    </li>
                `;

                } else if (el.media_type == "person") {

                    select = "personSelected";

                    string += `
                    <li class="results-item">
                        <div class="left">
                            <a onclick="${select}(${
                    el.id
                })" href="#"><img class="results-poster" src="${
                    el.profile_path != undefined
                        ? "https://image.tmdb.org/t/p/w200" + el.profile_path
                        : "img/poster-blank.jpg"
                }" width="200" alt="${
                    el.name
                }"></a>
                        </div>
                        <div class="right">
                            <a class="item-title" onclick="${select}(${
                    el.id
                })" href="#">${
                    el.name
                }</a>
                    </li>
                `;

                }

                if (
                    el.release_date == undefined ||
                    el.first_air_date == undefined
                ) {
                    $(".item-date").innerHTML = "";
                }
            });

            string += `</ul>`;
            string += `<div class="page-nav">`;
            string += `<p>Page ${data.page} out of ${data.total_pages}</p>`;

            if (x == 1 && data.total_pages > 1) {
                string += `<a href="#" onclick="getResults(${
                    x + 1
                })">Next page</a>`;
            } else if (x > 1 && data.total_pages > 1) {
                string += `<a href="#" onclick="getResults(${
                    x - 1
                })">Previous page</a>`;
                string += `<a href="#" onclick="getResults(${
                    x + 1
                })">Next page</a>`;
            } else {
                string += `<a href="#" onclick="getResults(${
                    x - 1
                })">Previous page</a>`;
            }

            string += `</div>`;

            $(".results").append(query_string);
            $(".results").append(string);
        })
        .catch((err) => {
            console.log(err);
        });
}
