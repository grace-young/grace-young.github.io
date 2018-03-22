/*
	Specific javascript for the "other_page.html"
	- loads specific clickable elements defined in 'clickableElements' map
	- loads translations for words in the story
*/

// map from translate button id to string array,
// 		where string array has Tsalagi word then 
//		english translation.
// or from imageLabelID -> [syllabary, phonetic, showingSyllb, audioFileName]
var wordData = {
	"translate-0" : ["cherokee1", "one"],
	"translate-1" : ["cherokee2", "second"],
}

var wordDataList = [["cherokee1", "one"],["cherokee2", "second"]];

// ID of element group in SVG --> [syllabary, phonetic, audioFileName]
var clickableElements = {
	'cat-group' : ["ᏪᏌ", "wesa", "cat-group-audio"],
	'fish' : ["ᎠᏣᏗ", "atsadi", "fish-audio"]	
}

var s = Snap("#interactive-area");
s.attr({ viewBox: "0 0 600 600" });
Snap.load("images/dining_table_scene.svg", onSVGLoaded ) ;

// Add the story text
var textDiv = document.getElementById('story-text-div')
console.log(textDiv);
for (var i = 0; i < wordDataList.length; i++){
	var wordDiv = createWordDiv(i, wordDataList[i][0]);
	textDiv.appendChild(wordDiv);
}


// for each elem:





function onSVGLoaded( f ){ 
   // add whole fragment to the SVG
   s.append( f );

   // add the correct class to SVG elements that should be clickable
   for(var clickableElem in clickableElements){
	// find element in SVG
	var svgElem = s.select("#" + clickableElem);   	
	// make element clickable
	svgElem.attr({'class': 'clickable-g'});
   }
}

/*
	Returns div with all word buttons to translate/play attached
*/
function createWordDiv(wordNum, cherokeeWord){
	var wordDiv = document.createElement("div");
	wordDiv.classList.add("word-unit", "d-flex", "flex-column")	;

	var buttonsDiv = document.createElement("div");
	buttonsDiv.classList.add("div-mini-button", "d-flex", "flex-row", "justify-content-center");

	var hearButton = document.createElement("BUTTON");
	hearButton.id = "hear-" + wordNum; 
	hearButton.classList.add("mini-button", "hear-button");
	hearButton.innerHTML = "gawoniha";

	var translateButton = document.createElement("BUTTON");
	translateButton.id = "translate-" + wordNum;
	translateButton.classList.add("mini-button", "translate-button");
	translateButton.innerHTML = "english gv'ti";

	var wordButton = document.createElement("BUTTON");
	wordButton.id = "word-" + wordNum;
	wordButton.classList.add("btn", "btn-default", "word-button");
	wordButton.type = "button";
	wordButton.innerHTML = cherokeeWord; // change to be word in list

	// add buttons to button div
	buttonsDiv.appendChild(hearButton);
	buttonsDiv.appendChild(translateButton);
	// add buttonsDiv to the wordDiv
	wordDiv.appendChild(buttonsDiv);

	wordDiv.appendChild(wordButton);
	return wordDiv;
}