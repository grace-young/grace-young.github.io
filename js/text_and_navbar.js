
// Called when the document has been loaded
$(document).ready(function(){
	// Create audio elements for buttons
	setUpButtonAudio();
	console.log(window.location.hostname);

	if (window.innerHeight > window.innerWidth) {
	   window.confirm("Rotate your device! This website should be used in landscape mode ");
	   console.log("Rotate your device! This website should be used in landscape mode ");
	} else {
	  console.log("landscape");
	}

	$('.story-title').click(function () {
		// hide any popups if click out
		hideAllPopups();
		document.getElementById("audio-button_story-title").play();
	})

	$('#home-btn').click(function(){
		// home button clicked
		window.location.assign("index.html");
	});

	$('#play-page').click(function(){
		// hide any popups if click out
		hideAllPopups();
		document.getElementById("audio-main").play();
	});

	$('.playbtn').click(function(){
		// hide any popups if click out
		hideAllPopups();
		document.getElementById("audio-main").play();
	});


   	$('.word-text-span').click(function(event){
		console.log("in word-text-span clcikced");
		event.stopImmediatePropagation();
		testWordButtonClicked($(this)[0], $(this).attr('id').split("-")[1]);
	})

	$('#phonetics-toggle-btn').click(function(){
		// hide any popups if click out
		hideAllPopups();
		phoneticsSyllbaryToggleClicked($(this)[0]);
	});
	$('.page-text').click(function(){
		// hide any popups if click out
		hideAllPopups();
	});

});

function playMainAudio(){
	// play audio when the page loads.
	document.getElementById("audio-main").play();
}

var usingSyllabary = true;

function setUpButtonAudio(){
	// Create main audio
	var audioElem = createAudioElement("audio-button_story-title",
                 "audio/" + "selu_uhwisvnvi.wav",
                 "audio/" + "wav");
      document.getElementById('audio-elements').appendChild(audioElem);

    // show in phonetics
	var audioElem = createAudioElement("audio-button_phonetics",
                 "audio/" + "buttons/yuwanega_gvdi.wav",
                 "audio/" + "wav");
      document.getElementById('audio-elements').appendChild(audioElem);
    // show in syllabary
	var audioElem = createAudioElement("audio-button_syllabary",
                 "audio/" + "buttons/tsalagi_gvdi.wav",
                 "audio/" + "wav");
      document.getElementById('audio-elements').appendChild(audioElem);
}

function translateButtonClicked(buttonID){
	var wordIndex = buttonID.split("-")[1];
	// get current text of button
	var wordButtonElem = document.getElementById("word-" + wordIndex).childNodes[0];
	var currentText = wordButtonElem.textContent;
	
	if(currentText == wordDataList[wordIndex][WORD_DATA_ENG_INDEX]){
		// currently in english, replace with tsalagi in syllabary
		// TODO: make this switch to syllbary if in that mode
		if(usingSyllabary){
			wordButtonElem.innerHTML = getTextOfButtonHTML(wordDataList[wordIndex][WORD_DATA_SYLLABARY_INDEX]);
		} else {
			wordButtonElem.innerHTML = getTextOfButtonHTML(wordDataList[wordIndex][WORD_DATA_PHONETICS_INDEX]);
		}
	} else {
		// in tsalagi, put in english
		wordButtonElem.innerHTML = getTextOfButtonHTML(wordDataList[wordIndex][WORD_DATA_ENG_INDEX]);
	}
}

function phoneticsSyllbaryToggleClicked(buttonElem){
	console.log( buttonElem);
	if(buttonElem.textContent === "Yuwanega digohweli gv’di"){
		// don't play audio for now because it is a little distracting

		//document.getElementById("audio-button_phonetics").play();
		
		// change word to be in phonetics
		changeWordsToSyllabaryPhonetics(WORD_DATA_PHONETICS_INDEX);
		toggleToPhonetics(true);
		
		usingSyllabary = false;
		buttonElem.innerHTML = "Tsalagi digohweli gv’di";
	} else {
		//document.getElementById("audio-button_syllabary").play();

		// change word to be in phonetics
		changeWordsToSyllabaryPhonetics(WORD_DATA_SYLLABARY_INDEX);
		toggleToPhonetics(false); // want to toggle to syllbary, pass false

		usingSyllabary = true;
		buttonElem.innerHTML = "Yuwanega digohweli gv’di";
	}
	// if in phonetics, change to syllbary --> have to change all label texts
	// if in syllbary, change to phonetics
}

/* Loops through each word and changes to phonetics or syllabary based on index in wordDataList passed in */
function changeWordsToSyllabaryPhonetics(indexInWordDataList){
	var allWords = $('.test-word-button');
	for(var i = 0; i < allWords.length; i++){
		var wordNum = allWords[i].firstChild.id.split("-")[1];
		allWords[i].firstChild.innerHTML = wordDataList[wordNum][indexInWordDataList];
	}
}

function getTextOfButtonHTML(cherokeeWord){
	return "<span class='btn-text'>" + cherokeeWord + "</span>";
}

// make hear button that has id conected to it
function makeBasicPopupHTML(wordNum){
	var theSpan = document.createElement("span");
	theSpan.id="inner-popup-" + wordNum;

	var hearButton = document.createElement("button");
	hearButton.id = "hear-" + wordNum;
	hearButton.classList.add('hear-button', 'popup-button');
	hearButton.innerHTML = "<img src='images/icons/play_small.svg'/>";
	hearButton.addEventListener('click',hearWordClicked,false);

	theSpan.appendChild(hearButton);

	var translateButton = document.createElement("button");
	translateButton.id = "translate-" + wordNum;
	translateButton.classList.add('translate-button', 'popup-button');
	translateButton.innerHTML = "<img src='images/icons/translate_button.svg'>";
	translateButton.addEventListener('click', translateWordClicked, false);

	theSpan.appendChild(translateButton);

	return theSpan;
}


function makeShowWordPopupHTML(wordNum){
	var theSpan = document.createElement("span");

	var backButton = document.createElement("button");
	backButton.id = "back-" + wordNum;
	backButton.classList.add('back-button', 'popup-button');
	backButton.innerHTML = "<img src='images/icons/back_small.svg'/>";
	backButton.addEventListener('click', backButtonClicked, false);

	theSpan.appendChild(backButton);

	var wordTranslationSpan = document.createElement("span");
	wordTranslationSpan.innerHTML  = wordDataList[wordNum][WORD_DATA_ENG_INDEX];
	wordTranslationSpan.classList.add('english-translation');

	theSpan.appendChild(wordTranslationSpan);

	return theSpan;
}

function backButtonClicked(){
	console.log("back button clicked ");
}

function translateWordClicked(event){
	event.stopImmediatePropagation();
	console.log("TRANSLATE WORD CLICKED");
	var wordNum = $(this).attr('id').split("-")[1];

	// make other HTML go away
	var popup = document.getElementById("inner-popup-" + wordNum);
	popup.innerHTML= "";
	popup.appendChild(makeShowWordPopupHTML(wordNum));

	var parentEl = popup.parentElement;

	var backButtonHeight = $("#back-" + wordNum)[0].clientHeight;

	var loopCtr = 0;
	parentEl.style.marginLeft = "-30px";
	while(popup.offsetHeight > backButtonHeight){
		if(loopCtr > 10){
			break;
		}
		parentEl.style.marginLeft = (getLeftMargin(parentEl) *1.3) + "px"; //(getLeftMargin(parentEl) - 50) + "px";
		loopCtr +=1;
	}
}

function getLeftMargin(marginElem){
	return parseInt(marginElem.style.marginLeft.split("px")[0]);
}

/* called when a hear button is clicked in popup */
function hearWordClicked(){
	playWordSound($(this).attr('id').split("-")[1]);
}

function testWordButtonClicked(wordButtonElem, wordNum){
	// clear any other popup's
	hideAllPopups();
	console.log('hid all popups');

	// highlight the word
	wordButtonElem.classList.add('word-highlighted');

	//console.log(wordButtonElem);
	// show this popup
	if(wordButtonElem.childNodes.length < 2){
		// doesn't have the popup yet
		var newPopup = createPopup(makeBasicPopupHTML(wordNum),wordButtonElem);
		wordButtonElem.appendChild(newPopup);
		// center popup over element
		if(newPopup.offsetWidth >  wordButtonElem.offsetWidth){
			newPopup.style.marginLeft =  -1*(newPopup.offsetWidth/2 - wordButtonElem.offsetWidth/2) + "px";
			console.log(newPopup);
		}
	} 
}

function hideAllPopups(){
	var allPopups = $('.popup');
	for(var i = 0; i < allPopups.length; i++){
		var aPopup = allPopups[i];
		aPopup.style.visibility = "hidden";
		aPopup.outerHTML = "";

		var wordNum = getWordNumFromInnerPopupID(aPopup.firstChild.id);
		$('#word-' + wordNum)[0].classList.remove('word-highlighted');
	}
}

function getWordNumFromInnerPopupID(innerPopupID){
	return innerPopupID.split("-")[2];
}

/* Responds to a click of a word button. */
function wordButtonClicked(wordNum){
	// not clicked yet
	console.log(document.getElementById("hear-" + wordNum).style.visibility);
	if (document.getElementById("hear-" + wordNum).style.visibility === "visible"){
		// clicked already
		document.getElementById("hear-" + wordNum).style.visibility = "hidden";
		document.getElementById("translate-" + wordNum).style.visibility = "hidden";
	} else {
		// show the mini buttons for this word
		document.getElementById("hear-" + wordNum).style.visibility = "visible";
		document.getElementById("translate-" + wordNum).style.visibility = "visible";
	}
}

function playWordSound(wordNum){
	document.getElementById("audio-" + wordNum).play();
}

function hearTappedImageName(imageID){
	document.getElementById(imageID + "-audio").play();	
}



