$(document).ready(function () {

    var topics = ["garfield", "hey arnold", "rugrats", "digimon", "pokemon", "teenage mutant ninja turtles", "thundercats", "scooby doo", "spongebob squarepants", "the fairly oddparents"];

    function displayButtons() {

        topics.forEach(function (topic) {
            console.log(topic);
            var capitalizedTopic = topic.toUpperCase();
            var button = $(`<button data-cartoon="${topic}">${capitalizedTopic}</button>`);
            $(button).appendTo(".buttons-go-here");
        })
    }

    displayButtons();

    $(".buttons-go-here").on("click", "button", function () {

        $(".gifs-here").empty();
        var cartoon = $(this).attr("data-cartoon");
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=kvK8vs2mXQoBjSkfJIbqh8FkNs1sex6s&q=${cartoon}&limit=10&offset=0&rating=G&lang=en`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            response.data.forEach(function (result) {

                imageRating = result.rating;
                imageAnimate = result.images.fixed_height_small.url;
                imageStill = result.images.fixed_height_small_still.url;

                var giphy = $(`<div id="imgs">
                                    <p>Rated: ${imageRating}<P>
                                    <img class="gif" src="${imageStill}" data-still="${imageStill}" data-animate ="${imageAnimate}">
                               </div>`);

                $(".gifs-here").append(giphy);
                giphy.on("click", function () {

                })
            })
        })
    })

    $("#add-cartoon").on("click", function () {
        event.preventDefault();

        console.log("this worked");

        var addedCartoon = $("#cartoon").val().toLowerCase().trim();
        $(".buttons-go-here").empty();
        topics.push(addedCartoon);
        displayButtons();

    })

    $(".gifs-here").on("click", ".gif", function () {
        
        var src = $(this).attr("src");
        var still = $(this).attr("data-still");
        var animation = $(this).attr("data-animate");
        if (src == still) {
            $(this).attr("src", animation);
        } else {
            $(this).attr("src", still);
        }

    })
})

