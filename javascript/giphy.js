var topics = ["angry", "amazed", "awkward", "baffled", "buzzed", "cool", "crazy", "cranky", 
			"eye roll", "flirty", "haha", "happy", "laughing", "lmao", "lol", "nervous", "pumped", 
			"sad", "sassy", "scared", "shocked", "speechless", "stunned", "surprised", "uhh", "wow"];

//Function for getting the GIFs and dumping the GIF in to the div
// for each button (api key from in-class activities = dc6zaTOxFJmzC)

// $("button").on("click", 
function getGifs() {

	var emotion = $(this).attr("data-emotion");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=xSDhFRSUFMLwXYh9s1mgak8bSwErhWBJ&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		console.log(queryURL);
		console.log(response);
		renderButtons();
		var results = response.data;

		for (var i = 0; i < results.length; i++) {
			if (results[i].rating !== "r") {

			var gifDiv = $("<div class='item'>");

			var p = $("<p>").text("Rating: " + rating);

			var rating = results[i].rating;

			var emotionImage = $("<img>");

			// testing if i can add class to gif
			emotionImage.addClass("gif");
			p.addClass("gif");

		// animated gif: emotionImage.attr("src", results[i].images.fixed_height.url);
		// still gif (fixed_height_still)
		emotionImage.attr("src", results[i].images.fixed_height_still.url);

		gifDiv.append(p);
		gifDiv.append(emotionImage);
		
		$("#emotions").prepend(gifDiv);
		

		}
	}
});
	
};

//starting and stopping gif
//_s = still 

$('body').on('click', '.gif', function() {
    	var src = $(this).attr("src");
      if($(this).hasClass('playing')){
         //stop
         $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
         $(this).removeClass('playing');
      } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
    });


	
function renderButtons(){
	$("#emotionButtons").empty();

	for (var i = 0 ; i < topics.length; i++) {

		var a = $("<button>");
			a.addClass("emotion");
			a.attr("data-emotion", topics[i]);
			a.text(topics[i]);
			a.addClass("btn btn-info");
			$("#emotionButtons").append(a);
			
		}	
	}

$("#addEmotion").on("click", function(event){
	event.preventDefault();

	var emotion = $("#emotion-input").val().trim();

	topics.push(emotion);

	renderButtons();

});

$(document).on("click", ".emotion", getGifs);

renderButtons();