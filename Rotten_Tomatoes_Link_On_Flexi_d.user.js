﻿// ==UserScript==
// @name        Rotten Tomatoes Link On IMDb
// @namespace   https://github.com/Ede123/userscripts
// @version     1.2.1
// @description Adds a direct link to the corresponding Rotten Tomatoes movie description page for every IMDb movie
// @icon        https://raw.githubusercontent.com/Ede123/userscripts/master/icons/Rotten_Tomatoes.png
// @author      Eduard Braun <eduard.braun2@gmx.de>
// @license     GPL-3.0+; http://www.gnu.org/copyleft/gpl.html
// @include     http://www.imdb.com/title/tt*
// @include     https://www.imdb.com/title/tt*
// @noframes
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// get IMDb movie ID
var IMDbID_RegEx = /\/title\/(tt\d{8})\//;
var IMDbID = IMDbID_RegEx.exec(window.location.href)[1];


// function to add the Rotten Tomatoes button
var addButton = function(link) {
	// icon
	var RT_icon = document.createElement('img');
	// RT_icon.src = "http://www.rottentomatoes.com/favicon.ico";
	// RT_icon.src = "https://staticv2.rottentomatoes.com/static/images/icons/favicon.ico";
	RT_icon.src = "https://raw.githubusercontent.com/Ede123/userscripts/master/icons/Rotten_Tomatoes.png";
	RT_icon.width = RT_icon.height = 16;
	RT_icon.style.verticalAlign = "bottom";

	// link
	var RT_link = document.createElement('a');
	RT_link.target = "_blank";
	RT_link.href = link;

	RT_link.appendChild(RT_icon);

	// spacer
	var spacer = document.createElement('span');
	spacer.classList.add("ghost");
	spacer.textContent = "|";

	//add link to IMDb movie page
	var subtext = document.getElementsByClassName("subtext")[0];
	if (subtext) {
		subtext.appendChild(spacer);
		subtext.appendChild(RT_link);
	}
};


// get Rotten Tomatoes movie alias from Rotten Tomatoes API
GM_xmlhttpRequest({
	method: "GET",
	url: "https://d12y6y9b7x77t.cloudfront.net/" + IMDbID,
	onload: function(response) {
		var flexi = response.status
		if (flexi != 403) {
			addButton("https://d12y6y9b7x77t.cloudfront.net/" + IMDbID);
		}
		else if (flexi) {
			console.log("Error: " + flexi);
		}
	}
});

