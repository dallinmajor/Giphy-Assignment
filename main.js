$(document).ready(function () {
    var topics = ["garfield", "hey arnold", "rugrats", "digimon", "pokemon", "teenage mutant ninja turtles", "thundercats", "scooby doo", "spongebob squarepants", "the fairly oddparents"];

    topics.forEach(function (topic) {
        console.log(topic);
        var capitalizedTopic = topic.toUpperCase();
        var button = $(`<button data-cartoon="${topic}">${capitalizedTopic}</button>`);
        $(button).appendTo(".buttons-go-here");
    })

    $("button").on("click", function () {
        $(".gifs-here").empty();
        var cartoon = $(this).attr("data-cartoon");
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=kvK8vs2mXQoBjSkfJIbqh8FkNs1sex6s&q=${cartoon}&limit=10&offset=0&rating=G&lang=en`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            response.data.forEach(function (result) {
                console.log(result);
                imageRating = result.rating;
                imageAnimate = result.images.fixed_height_small.url;
                imageStill = result.images.fixed_height_small_still.url;

                var giphy = $(`<div id="imgs">
                                    <p>Rated: ${imageRating}<P>
                                    <img src="${imageStill}" data-still="${imageStill}" data-animate ="${imageAnimate}" class="gif>"
                               </div>`);

                $(".gifs-here").append(giphy);
            })
        })
    })
})

