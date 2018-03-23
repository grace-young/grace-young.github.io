/*
  Creates and returns audio element with ID, filename, and audio type specified
  audioType - something like "audio/wav"
*/
function createAudioElement(audioID, audioFileName, audioType){
  
  var audioElem = document.createElement("AUDIO");
  audioElem.id = audioID;

  var audioSource = document.createElement("SOURCE");
  audioSource.src =  audioFileName;
  audioSource.type = audioType;

  audioElem.appendChild(audioSource);
  return audioElem;
}

/*
  Creates popup that will go over word element
*/
function createPopup(innerElements, wordButtonUnderneath){
  var popoutWidth = innerElements.offsetWidth;
  console.log(wordButtonUnderneath);

  var wordHeight = wordButtonUnderneath.offsetHeight;
  var wordWidth = wordButtonUnderneath.offsetWidth;
  var wordOffsetLeft = wordButtonUnderneath.wordOffsetLeft;

  var calloutDiv =  document.createElement("div");
  calloutDiv.classList.add("callout", "popup");
  calloutDiv.style.marginTop = (wordHeight * 2.8 * -1) + "px";

  // fix margin if we know what the div width is, unsure. 
    //calloutDiv.style.marginLeft = (wordOffsetLeft - wordWidth *1.5) + "px";


  calloutDiv.appendChild(innerElements);

  return calloutDiv;
}

/*
  Returns div with all word buttons to translate/play attached
*/
function createWordDiv(wordNum, cherokeeWord){
  var wordButtonButActuallyDiv = document.createElement("div");
  wordButtonButActuallyDiv.classList.add("test-word-button");

  var wordSpan = document.createElement("span");
  wordSpan.classList.add("btn-text", "word-text-span");
  wordSpan.id = "word-" + wordNum; 
  wordSpan.innerHTML = cherokeeWord;

  wordButtonButActuallyDiv.appendChild(wordSpan);

  return wordButtonButActuallyDiv;
}
