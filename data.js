var gameData = [];

// Helper function to generate HTML for thumbnail + hover functions
var createThumbnail = function(carousel, val, key, next) {
	if (!next) {
    // Add to left end
		carousel.prepend($('<li>', {"id" : key + "_item", "class" : "tooltip"}).append($('<span/>', { "class" : "tooltiptext"}).append(val.game_media.media[0].title)).append($('<img/>', {"src" : val.game_media.media[0].thumbnail, "class" : "thumbnail"})).append($('<div>', {"id" : key + "_tooltip", "class" : "hover_data", "style" : "display:none"})));
	} else {
    // Add to right end
		carousel.append($('<li>', {"id" : key + "_item", "class" : "tooltip"}).append($('<span/>', { "class" : "tooltiptext"}).append(val.game_media.media[0].title)).append($('<img/>', {"src" : val.game_media.media[0].thumbnail, "class" : "thumbnail"})).append($('<div>', {"id" : key + "_tooltip", "class" : "hover_data", "style" : "display:none"})));
	}
	
  // Save id to thumbnail for easy access to avoid repeated string concat.
	var tooltip = "#" + key + "_tooltip";

	// Create Mouseover table
  $(tooltip).append($('<p>', {"class" : "location"}).html(val.venue + " - " + val.location));
	var table = $('<table></table>', {"id" : key + "_box"}).append($("<tr>", {"class" : "box_info"})).append($("<tr>", {"class" : "away"})).append($("<tr>", {"class" : "home"}));

	// Add the teams' name and records
	$(tooltip).append(table);
	$("#" + key + "_tooltip .box_info").append($("<td>").html(""));
	$("#" + key + "_tooltip .home").append($("<td>").html(val.away_name_abbrev).append($("<p>", {"class" : "record"}).html(" (" + val.away_win + "-" + val.away_loss +")")));
	$("#" + key + "_tooltip .away").append($("<td>").html(val.home_name_abbrev).append($("<p>", {"class" : "record"}).html(" (" + val.home_win + "-" + val.home_loss +")")));

	// Populate the innings data
	$.each(val.linescore.inning, function(i, inn) {
		$(tooltip + " .box_info").append($("<td>").html(i + 1));
		$(tooltip + " .home").append($("<td>").html(inn.home));
		$(tooltip + " .away").append($("<td>").html(inn.away));
	});

	// Add H/R/E lines to box score
	$(tooltip + " .box_info").append($("<td>").html("R"));
	$(tooltip + " .home").append($("<td>").html(val.linescore.r.home));
	$(tooltip + " .away").append($("<td>").html(val.linescore.r.away));
	$(tooltip + " .box_info").append($("<td>").html("H"));
	$(tooltip + " .home").append($("<td>").html(val.linescore.h.home));
	$(tooltip + " .away").append($("<td>").html(val.linescore.h.away));
	$(tooltip + " .box_info").append($("<td>").html("E"));
	$(tooltip + " .home").append($("<td>").html(val.linescore.e.home));
	$(tooltip + " .away").append($("<td>").html(val.linescore.e.away));

	// Create links for telecast
	$(tooltip).append($("<img>", {"src" : "mlbtv.png","class" : "mlbtv"}).on('click', function() {
		alert(val.links.mlbtv);
	}));

  // Add Winning, Losing, and Save Pitcher Information
  $(tooltip).append($("<p>", {"class" : "pitcher_data"}).html("W: " + val.winning_pitcher.last + " (" + val.winning_pitcher.wins + "-" + val.winning_pitcher.losses + ")"));
  $(tooltip).append($("<p>", {"class" : "pitcher_data"}).html("L: " + val.losing_pitcher.last + " (" + val.losing_pitcher.wins + "-" + val.losing_pitcher.losses + ")"));
  if(val.save_pitcher.last != "") $(tooltip).append($("<p>", {"class" : "pitcher_data"}).html("S: " + val.save_pitcher.last + " ("+ val.save_pitcher.saves +")"));

	// Mouseover/mouseleave event handlers
	$("#carousel ul").on('mouseover', "#" + key + "_item", function(event) {
		$(this).find('div').css('display', 'block');
	});

	$("#carousel ul").on('mouseleave', "#" + key + "_item", function(event) {
		$(this).find('div').css('display', 'none');
	});
}

// Load JSON Data from provided file
$.getJSON( "data.json", function( data ) {
	let carousel = $('#carousel ul');
    $.each(data.data.games.game, function( key, val ) {
    	// Grab Game Data from JSON file
    	gameData.push(val);

    	// Add the first 7 games to the carousel
    	if (key < 7) {
    		// Generate the list item, along with the tooltip/hover data
    		createThumbnail(carousel, val, key, true);
    	}
    });
});

// Function that handles carousel functions
$(function() {
  // Initialize necessary pointers and jQuery objects
  var carousel = $('#carousel ul'),
      items   = carousel.find('li'),
      len     = items.length,
      left = 0,
      right = 6,
      triggers = $('button');

  // Prev/Next-handling trigger function
  triggers.on('click', function() {

  	// Keep track of if we are going next or prev
    var delta = (this.id === "prev")? -1 : 1;

        if (delta == -1) {
        	// Handling prev case
        	// Remove out-of-sight element
    		$('#' + right + "_item").remove();

    		// Advance the left and right trackers
        	if (left == 0) left = gameData.length - 1;
    		else left -= 1;
    		if (right == 0) right = gameData.length - 1;
    		else right -= 1;

    		// Create new element for carousel on left
    		createThumbnail(carousel, gameData[left], left, false);
        } else {
        	// Handling next case
        	// Remove out-of-sight element
    		$('#' + left + "_item").remove();

    		// Advance the left and right trackers
        	if (right == gameData.length - 1) right = 0;
        	else right += 1;
        	if (left == gameData.length - 1) left = 0;
        	else left += 1;

        	// Create new element for carousel on right
        	createThumbnail(carousel, gameData[right], right, true);
        }  
  });
});