var topics = ["angry", "amazed", "awkward", "baffled", "buzzed", "cool", "crazy", "cranky", 
			"eye roll", "flirty", "happy", "laughing", "lol", "nervous", "pumped", 
			"sad", "savage", "shocked", "speechless", "stunned", "surprised", "uhh"];

//Function for getting the GIFs and dumping the GIF in to the div
// for each button

// $("button").on("click", 
function getGifs() {

	var emotion = $(this).attr("data-emotion");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=dc6zaTOxFJmzC&limit=10";

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

		emotionImage.attr("src", results[i].images.fixed_height.url);

		gifDiv.append(p);
		gifDiv.append(emotionImage);
		
		$("#emotions").prepend(gifDiv);
		

		}
	}
});
	
};
	
function renderButtons(){
	$("#emotionButtons").empty();

	for (var i = 0 ; i < topics.length; i++) {

		var a = $("<button>");
			a.addClass("emotion");
			a.attr("data-emotion", topics[i]);
			a.text(topics[i]);
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